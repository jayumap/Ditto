import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, GitFork, Star, Calendar, RotateCcw, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

/** GitHub-convention language colors (top 30). */
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  Shell: '#89e051',
  Lua: '#000080',
  R: '#198CE7',
  Perl: '#0298c3',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Vim: '#199f4b',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Jupyter: '#DA5B0B',
  Zig: '#ec915c',
  Nix: '#7e7eff',
};

/** Returns a hex color for a language name. */
function langColor(lang) {
  return LANG_COLORS[lang] || '#8b949e';
}

/** Returns the score tier label and emoji. */
function getTier(score) {
  if (score >= 90) return { label: 'Identical Twin', emoji: '🧬' };
  if (score >= 75) return { label: 'Code Sibling', emoji: '👾' };
  if (score >= 60) return { label: 'Distant Relative', emoji: '🔭' };
  return { label: 'Unlikely Twin', emoji: '🤔' };
}

/** Formats account age in a human-readable string. */
function formatAge(days) {
  if (days >= 365) return `${Math.floor(days / 365)}y ${Math.floor((days % 365) / 30)}m`;
  if (days >= 30) return `${Math.floor(days / 30)} months`;
  return `${days} days`;
}

/** Count-up animated number component. */
function AnimatedScore({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [value]);

  return <span>{display}</span>;
}

/** Single profile card for a user. */
function ProfileCard({ user, side }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: side === 'right' ? 0.2 : 0 }}
      className="glass rounded-2xl p-5 sm:p-6 w-full max-w-xs flex flex-col items-center text-center"
    >
      {/* Avatar */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-primary-500/30 ring-offset-2 ring-offset-white dark:ring-offset-dark-900 mb-3">
        <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
      </div>

      {/* Name + link */}
      <h3 className="font-bold text-gray-900 dark:text-white text-lg truncate w-full">{user.name}</h3>
      <a
        href={`https://github.com/${user.login}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary-500 hover:text-primary-400 flex items-center gap-1 mt-0.5"
      >
        @{user.login} <ExternalLink size={12} />
      </a>

      {/* Bio */}
      {user.bio && (
        <p className="text-xs text-gray-500 dark:text-dark-400 mt-2 line-clamp-2">{user.bio}</p>
      )}

      {/* Location */}
      {user.location && (
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-dark-400 mt-2">
          <MapPin size={12} /> {user.location}
        </div>
      )}

      {/* Followers / Following */}
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-600 dark:text-dark-300">
        <span className="flex items-center gap-1"><Users size={12} /> {user.followers} followers</span>
        <span>{user.following} following</span>
      </div>

      {/* Language pills */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-3">
        {(user.topLanguages || []).slice(0, 5).map((lang) => (
          <span
            key={lang}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-200"
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: langColor(lang) }} />
            {lang}
          </span>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mt-4 w-full text-center">
        <div>
          <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-dark-400">
            <GitFork size={12} />
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.public_repos}</p>
          <p className="text-[10px] text-gray-400 dark:text-dark-500">Repos</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-dark-400">
            <Star size={12} />
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">{user.totalStars}</p>
          <p className="text-[10px] text-gray-400 dark:text-dark-500">Stars</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-dark-400">
            <Calendar size={12} />
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">{formatAge(user.accountAgeDays)}</p>
          <p className="text-[10px] text-gray-400 dark:text-dark-500">Age</p>
        </div>
      </div>
    </motion.div>
  );
}

/** Metric breakdown bar with label and percentage. */
function BreakdownBar({ label, value, delay }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-gray-600 dark:text-dark-300">{label}</span>
        <span className="font-semibold text-gray-800 dark:text-dark-100">{value}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-dark-700 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-600 to-accent-500"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/**
 * Side-by-side match result comparing input user vs matched doppelgänger.
 * @param {{ inputUser, matchedUser, score, breakdown, matchReasons, onReset }} props
 */
export default function MatchResult({ inputUser, matchedUser, score, breakdown, matchReasons, onReset }) {
  const tier = useMemo(() => getTier(score), [score]);

  const bars = [
    { label: 'Language DNA', value: breakdown?.language ?? 0 },
    { label: 'Star Profile', value: breakdown?.stars ?? 0 },
    { label: 'Repo Count', value: breakdown?.repos ?? 0 },
    { label: 'Account Age', value: breakdown?.age ?? 0 },
    { label: 'Commit Schedule', value: breakdown?.commitTime ?? 0 },
  ];

  return (
    <section className="min-h-screen py-20 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Your GitHub <span className="gradient-text">Doppelgänger</span>
          </h2>
          <p className="mt-2 text-gray-500 dark:text-dark-400">
            We scanned thousands of developers to find your coding twin.
          </p>
        </motion.div>

        {/* Main grid: user card | score center | match card */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-8">
          {/* Input user */}
          <ProfileCard user={inputUser} side="left" />

          {/* Center panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-2xl p-6 sm:p-8 w-full max-w-sm flex flex-col items-center"
          >
            {/* Score circle */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-4">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6"
                  className="text-gray-200 dark:text-dark-700" />
                <motion.circle
                  cx="50" cy="50" r="44" fill="none" strokeWidth="6"
                  strokeLinecap="round"
                  stroke="url(#scoreGrad)"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - score / 100) }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                  <AnimatedScore value={score} />
                  <span className="text-lg">%</span>
                </p>
              </div>
            </div>

            {/* Tier label */}
            <p className="text-lg font-bold text-gray-800 dark:text-dark-100">
              {tier.emoji} {tier.label}
            </p>

            {/* Breakdown bars */}
            <div className="w-full mt-6 space-y-3">
              {bars.map((bar, i) => (
                <BreakdownBar key={bar.label} label={bar.label} value={bar.value} delay={0.4 + i * 0.1} />
              ))}
            </div>

            {/* Match reasons */}
            <div className="w-full mt-6 space-y-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-dark-400 uppercase tracking-wider">Match Reasons</p>
              {(matchReasons || []).map((reason, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-dark-300"
                >
                  <span className="text-primary-500 mt-0.5">•</span>
                  <span>{reason}</span>
                </motion.div>
              ))}
            </div>

            {/* Search Again */}
            <Button
              variant="outline"
              className="mt-8 w-full"
              icon={<RotateCcw size={16} />}
              onClick={onReset}
            >
              Search Again
            </Button>
          </motion.div>

          {/* Matched user */}
          <ProfileCard user={matchedUser} side="right" />
        </div>
      </div>
    </section>
  );
}
