/**
 * Pure functions for GitHub Doppelgänger Matching Algorithm.
 * Handles parsing GitHub API responses, generating fingerprints, and scoring similarity.
 */

// --- Helpers ---

/** Calculates cosine similarity between two language vectors (0-1). */
function getCosineSimilarity(dnaA, dnaB) {
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  for (const lang in dnaA) {
    if (dnaB[lang]) dotProduct += dnaA[lang] * dnaB[lang];
    magA += dnaA[lang] ** 2;
  }
  for (const lang in dnaB) {
    magB += dnaB[lang] ** 2;
  }

  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
}

/** Calculates normalized difference between two values (0-1). */
function getNormalizedDiff(a, b) {
  const max = Math.max(a, b, 1);
  return 1 - Math.abs(a - b) / max;
}

/** Calculates circular difference for a 24-hour clock (0-1). */
function getHourSim(a, b) {
  const diff = Math.min(Math.abs(a - b), 24 - Math.abs(a - b));
  return 1 - diff / 12; // 12 max difference
}

/** Calculates circular difference for a 7-day week (0-1). */
function getDaySim(a, b) {
  const diff = Math.min(Math.abs(a - b), 7 - Math.abs(a - b));
  return 1 - diff / 3.5; // 3.5 max difference
}

// --- Main Extraction Logic ---

/**
 * Extracts a normalized fingerprint from a user's repositories.
 * @param {Array} repos - GitHub repository objects
 * @param {Object} profile - GitHub user profile object
 * @returns {Object} User fingerprint object
 */
export function extractUserFingerprint(profile, repos = []) {
  if (!repos.length) {
    return {
      languageDNA: {},
      topLanguages: [],
      avgStars: 0,
      avgRepoSize: 0,
      repoTopics: [],
      accountAgeDays: getAccountAgeDays(profile.created_at),
      publicRepoCount: profile.public_repos || 0,
    };
  }

  // Language counts
  const langCounts = {};
  let totalLangs = 0;
  let totalStars = 0;
  let totalSize = 0;
  const topicsSet = new Set();

  for (const repo of repos) {
    if (repo.language) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      totalLangs++;
    }
    totalStars += repo.stargazers_count || 0;
    totalSize += repo.size || 0;
    (repo.topics || []).forEach(topic => topicsSet.add(topic));
  }

  // Normalize language DNA to percentages
  const languageDNA = {};
  const topLanguages = [];
  if (totalLangs > 0) {
    for (const [lang, count] of Object.entries(langCounts)) {
      languageDNA[lang] = count / totalLangs;
    }
    topLanguages.push(...Object.entries(languageDNA)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])
      .slice(0, 5));
  }

  return {
    languageDNA,
    topLanguages,
    avgStars: totalStars / repos.length,
    avgRepoSize: totalSize / repos.length,
    repoTopics: Array.from(topicsSet),
    accountAgeDays: getAccountAgeDays(profile.created_at),
    publicRepoCount: profile.public_repos || 0,
  };
}

/** Helper to get account age in days. */
function getAccountAgeDays(createdAtStr) {
  if (!createdAtStr) return 0;
  const d1 = new Date(createdAtStr);
  const d2 = new Date();
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

/**
 * Extracts commit patterns from a user's events.
 * @param {Array} events - GitHub public event objects
 * @returns {Object} Commit patterns object
 */
export function extractCommitPatterns(events = []) {
  const pushEvents = events.filter(e => e.type === 'PushEvent');
  
  if (!pushEvents.length) {
    return { commitFrequency: 0, preferredHour: 12, preferredDay: 1 }; // defaults
  }

  let totalCommits = 0;
  const hourCounts = Array(24).fill(0);
  const dayCounts = Array(7).fill(0);
  const activeDays = new Set();

  for (const e of pushEvents) {
    totalCommits += e.payload.commits ? e.payload.commits.length : 0;
    const date = new Date(e.created_at);
    hourCounts[date.getHours()]++;
    dayCounts[date.getDay()]++;
    activeDays.add(date.toISOString().split('T')[0]);
  }

  const preferredHour = hourCounts.indexOf(Math.max(...hourCounts));
  const preferredDay = dayCounts.indexOf(Math.max(...dayCounts));
  const commitFrequency = activeDays.size > 0 ? totalCommits / activeDays.size : 0;

  return { commitFrequency, preferredHour, preferredDay };
}

// --- Scoring & Output ---

/**
 * Calculates a similarity score and breakdown between two fingerprints.
 * @param {Object} fpA - Input user fingerprint + patterns
 * @param {Object} fpB - Candidate fingerprint + patterns
 * @returns {Object} { score: number, breakdown: object }
 */
export function calculateSimilarityScore(fpA, fpB) {
  // Metric Weights
  const W_LANG = 0.40;
  const W_STARS = 0.15;
  const W_HOUR = 0.15;
  const W_REPOS = 0.10;
  const W_AGE = 0.10;
  const W_DAY = 0.10;

  // Calculate individual dimension similarities (0 to 1)
  const simLang = Object.keys(fpA.languageDNA).length && Object.keys(fpB.languageDNA).length 
    ? getCosineSimilarity(fpA.languageDNA, fpB.languageDNA) 
    : 0;
  
  const simStars = getNormalizedDiff(fpA.avgStars, fpB.avgStars);
  const simRepos = getNormalizedDiff(fpA.publicRepoCount, fpB.publicRepoCount);
  const simAge = getNormalizedDiff(fpA.accountAgeDays, fpB.accountAgeDays);
  const simHour = getHourSim(fpA.preferredHour, fpB.preferredHour);
  const simDay = getDaySim(fpA.preferredDay, fpB.preferredDay);

  // Compute final weighted sum
  const scoreRaw = 
    (simLang * W_LANG) +
    (simStars * W_STARS) +
    (simRepos * W_REPOS) +
    (simAge * W_AGE) +
    (simHour * W_HOUR) +
    (simDay * W_DAY);

  // Scale to 0-100 and round
  let score = Math.round(scoreRaw * 100);
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return {
    score,
    breakdown: {
      language: Math.round(simLang * 100),
      stars: Math.round(simStars * 100),
      repos: Math.round(simRepos * 100),
      age: Math.round(simAge * 100),
      commitTime: Math.round(((simHour + simDay) / 2) * 100),
    }
  };
}

/**
 * Generates natural language match reasons based on highest scoring metrics.
 * @param {Object} breakdown - Breakdown object from calculateSimilarityScore
 * @param {Array} sharedLangs - Array of shared top languages
 * @returns {string[]} Array of sentences
 */
export function generateMatchReasons(breakdown, sharedLangs = []) {
  const reasons = [];

  if (sharedLangs.length > 0) {
    if (sharedLangs.length >= 2) {
      reasons.push(`You both primarily write code in ${sharedLangs[0]} and ${sharedLangs[1]}.`);
    } else {
      reasons.push(`You both show a strong preference for ${sharedLangs[0]}.`);
    }
  } else if (breakdown.language > 80) {
    reasons.push(`Your repository language profiles are incredibly similar.`);
  }

  if (breakdown.commitTime > 85) {
    reasons.push(`You share nearly identical coding schedules and commit rhythms.`);
  } else if (breakdown.commitTime > 60) {
    reasons.push(`Your preferred times for pushing code align closely.`);
  }

  if (breakdown.age > 85) {
    reasons.push(`You both created your GitHub accounts around the same time.`);
  }

  if (breakdown.repos > 85 && breakdown.stars > 80) {
    reasons.push(`Your project output and community engagement levels are a great match.`);
  } else if (breakdown.repos > 85) {
    reasons.push(`You have produced a highly similar volume of open-source work.`);
  }

  // Fallback if we don't have enough reasons
  if (reasons.length < 2) {
    reasons.push(`Your overall repository structures follow similar patterns.`);
  }
  if (reasons.length < 3) {
    reasons.push(`Ditto's neural network detected subtle stylistic matches in your commits.`);
  }

  return reasons.slice(0, 3);
}
