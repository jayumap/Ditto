import { useState, useCallback } from 'react';
import {
  extractUserFingerprint,
  extractCommitPatterns,
  calculateSimilarityScore,
  generateMatchReasons,
} from '../utils/matchAlgorithm';

/** GitHub API base URL. */
const API = 'https://api.github.com';

/** Common headers for all GitHub API requests. */
const HEADERS = { Accept: 'application/vnd.github.v3+json' };

/** Loading step messages displayed during the search flow. */
const STEPS = [
  'Fetching your GitHub profile...',
  'Analyzing your repository DNA...',
  'Decoding your commit patterns...',
  'Scanning the GitHub universe...',
  'Running doppelgänger matching algorithm...',
  'Calculating similarity scores...',
  'Your twin has been found!',
];

/** Fetches JSON from the GitHub API and handles HTTP errors. */
async function ghFetch(path) {
  const res = await fetch(`${API}${path}`, { headers: HEADERS });
  if (res.status === 404) throw new Error('USER_NOT_FOUND');
  if (res.status === 403) throw new Error('RATE_LIMITED');
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

/** Returns a user-friendly error message for known error codes. */
function friendlyError(err) {
  if (err.message === 'USER_NOT_FOUND')
    return 'User not found. Please check the username and try again.';
  if (err.message === 'RATE_LIMITED')
    return 'GitHub API rate limit reached (60 requests/hour for unauthenticated users). Please wait a few minutes and try again.';
  if (err.message === 'NO_CANDIDATES')
    return 'Could not find similar developers. The user may have too few public repos or use uncommon languages.';
  return `Something went wrong: ${err.message || 'Unknown error'}. Please try again.`;
}

/**
 * Custom hook that manages the full GitHub doppelgänger search lifecycle.
 * @returns {{ status, loadingStep, inputUser, matchedUser, score, breakdown, matchReasons, error, findMatch, reset }}
 */
export default function useGitHubMatch() {
  const [status, setStatus] = useState('idle');
  const [loadingStep, setLoadingStep] = useState('');
  const [inputUser, setInputUser] = useState(null);
  const [matchedUser, setMatchedUser] = useState(null);
  const [score, setScore] = useState(0);
  const [breakdown, setBreakdown] = useState(null);
  const [matchReasons, setMatchReasons] = useState([]);
  const [error, setError] = useState('');

  /** Resets state back to idle. */
  const reset = useCallback(() => {
    setStatus('idle');
    setLoadingStep('');
    setInputUser(null);
    setMatchedUser(null);
    setScore(0);
    setBreakdown(null);
    setMatchReasons([]);
    setError('');
  }, []);

  /** Kicks off the full matching flow for a given GitHub username. */
  const findMatch = useCallback(async (username) => {
    const trimmed = (username || '').trim();
    if (!trimmed) return;

    setStatus('loading');
    setError('');
    setInputUser(null);
    setMatchedUser(null);

    try {
      // Step 1 — Fetch profile
      setLoadingStep(STEPS[0]);
      const profile = await ghFetch(`/users/${trimmed}`);

      // Step 2 — Fetch repos
      setLoadingStep(STEPS[1]);
      const repos = await ghFetch(`/users/${trimmed}/repos?per_page=100&sort=pushed`);

      // Step 3 — Fetch events
      setLoadingStep(STEPS[2]);
      let events = [];
      try {
        events = await ghFetch(`/users/${trimmed}/events/public?per_page=100`);
      } catch {
        // Events may be empty or 404 for some users — non-fatal
      }

      // Build input fingerprint
      const fingerprint = extractUserFingerprint(profile, repos);
      const patterns = extractCommitPatterns(events);
      const inputFP = { ...fingerprint, ...patterns };

      // Compute total stars for input user
      const inputTotalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);

      setInputUser({
        login: profile.login,
        name: profile.name || profile.login,
        avatar_url: profile.avatar_url,
        bio: profile.bio || '',
        location: profile.location || '',
        followers: profile.followers || 0,
        following: profile.following || 0,
        public_repos: profile.public_repos || 0,
        created_at: profile.created_at,
        topLanguages: fingerprint.topLanguages,
        totalStars: inputTotalStars,
        accountAgeDays: fingerprint.accountAgeDays,
      });

      // Step 4 — Find candidates
      // Keep search small to conserve the 60 req/hr unauthenticated rate limit.
      setLoadingStep(STEPS[3]);
      const topLangs = fingerprint.topLanguages.slice(0, 2);
      const minRepos = Math.max(5, (profile.public_repos || 0) - 10);

      let query = '';
      if (topLangs.length >= 2) {
        query = `language:${encodeURIComponent(topLangs[0])}+language:${encodeURIComponent(topLangs[1])}+repos:>${minRepos}`;
      } else if (topLangs.length === 1) {
        query = `language:${encodeURIComponent(topLangs[0])}+repos:>${minRepos}`;
      } else {
        query = `repos:>${minRepos}`;
      }

      // Fetch only 10 candidates — keeps total API calls ≈ 3 + 1 + 10×2 = 24
      const searchResult = await ghFetch(`/search/users?q=${query}&per_page=10`);
      const candidateLogins = (searchResult.items || [])
        .map((u) => u.login)
        .filter((l) => l.toLowerCase() !== trimmed.toLowerCase())
        .slice(0, 10);

      if (candidateLogins.length === 0) throw new Error('NO_CANDIDATES');

      // Step 5 — Fetch candidate profile + repos (skip events to save calls)
      setLoadingStep(STEPS[4]);
      const candidatePromises = candidateLogins.map(async (login) => {
        const [cProfile, cRepos] = await Promise.all([
          ghFetch(`/users/${login}`),
          ghFetch(`/users/${login}/repos?per_page=50&sort=pushed`),
        ]);
        return { profile: cProfile, repos: cRepos };
      });

      const settled = await Promise.allSettled(candidatePromises);
      const validCandidates = settled
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value)
        .slice(0, 8);

      if (validCandidates.length === 0) throw new Error('NO_CANDIDATES');

      // Step 6 — Score each candidate
      setLoadingStep(STEPS[5]);
      let bestScore = -1;
      let bestCandidate = null;
      let bestBreakdown = null;
      let bestCandidateFP = null;

      for (const c of validCandidates) {
        const cFP = {
          ...extractUserFingerprint(c.profile, c.repos),
          ...extractCommitPatterns([]), // We skip events for candidates to save API calls
        };

        const result = calculateSimilarityScore(inputFP, cFP);
        if (result.score > bestScore) {
          bestScore = result.score;
          bestCandidate = c;
          bestBreakdown = result.breakdown;
          bestCandidateFP = cFP;
        }
      }

      // Step 7 — Done!
      setLoadingStep(STEPS[6]);

      const sharedLangs = fingerprint.topLanguages.filter((l) =>
        bestCandidateFP.topLanguages.includes(l)
      );

      const reasons = generateMatchReasons(bestBreakdown, sharedLangs);
      const matchTotalStars = bestCandidate.repos.reduce(
        (s, r) => s + (r.stargazers_count || 0),
        0
      );

      setMatchedUser({
        login: bestCandidate.profile.login,
        name: bestCandidate.profile.name || bestCandidate.profile.login,
        avatar_url: bestCandidate.profile.avatar_url,
        bio: bestCandidate.profile.bio || '',
        location: bestCandidate.profile.location || '',
        followers: bestCandidate.profile.followers || 0,
        following: bestCandidate.profile.following || 0,
        public_repos: bestCandidate.profile.public_repos || 0,
        created_at: bestCandidate.profile.created_at,
        topLanguages: bestCandidateFP.topLanguages,
        totalStars: matchTotalStars,
        accountAgeDays: bestCandidateFP.accountAgeDays,
      });

      setScore(bestScore);
      setBreakdown(bestBreakdown);
      setMatchReasons(reasons);

      // Small delay so user sees "Your twin has been found!" before transition
      await new Promise((r) => setTimeout(r, 1200));
      setStatus('success');
    } catch (err) {
      setError(friendlyError(err));
      setStatus('error');
    }
  }, []);

  return {
    status,
    loadingStep,
    inputUser,
    matchedUser,
    score,
    breakdown,
    matchReasons,
    error,
    findMatch,
    reset,
  };
}
