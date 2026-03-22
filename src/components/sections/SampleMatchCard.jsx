import { motion } from 'framer-motion';
import { GitFork, Users, Code2, CheckCircle2 } from 'lucide-react';
import { SAMPLE_MATCH } from '../../constants';
import SectionWrapper from '../ui/SectionWrapper';
import Badge from '../ui/Badge';

/**
 * Individual developer profile card used in the match demo.
 */
function ProfileCard({ user }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="glass rounded-2xl p-5 sm:p-6 text-center">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-primary-500/30 ring-offset-2 ring-offset-white dark:ring-offset-dark-900">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <h4 className="font-semibold text-gray-900 dark:text-white">{user.name}</h4>
        <p className="text-sm text-gray-500 dark:text-dark-400 mb-3">@{user.username}</p>

        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {user.topLanguages.map((lang) => (
            <Badge key={lang} variant="primary">{lang}</Badge>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{user.repos}</p>
            <p className="text-xs text-gray-500 dark:text-dark-400">Repos</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{user.followers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-dark-400">Followers</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{user.contributions.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-dark-400">Commits</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Shared language bar visualization.
 */
function LanguageBar({ languages }) {
  const colors = [
    'bg-primary-500',
    'bg-accent-500',
    'bg-pink-500',
    'bg-amber-500',
  ];

  return (
    <div className="space-y-3">
      <div className="flex rounded-full overflow-hidden h-3">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{ width: 0 }}
            whileInView={{ width: `${lang.percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
            className={`${colors[i]} first:rounded-l-full last:rounded-r-full`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
        {languages.map((lang, i) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${colors[i]}`} />
            <span className="text-xs text-gray-600 dark:text-dark-300">
              {lang.name} ({lang.percent}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Sample Match Card demo section — showcases match UI.
 */
export default function SampleMatchCard() {
  return (
    <SectionWrapper id="demo" className="bg-gray-50/50 dark:bg-dark-800/30">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          See a <span className="gradient-text">Match</span> in Action
        </h2>
        <p className="mt-4 text-gray-600 dark:text-dark-300 max-w-xl mx-auto">
          Here's what a real Ditto match looks like — two developers with remarkably similar coding DNA.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-8">
          {/* Similarity score */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 text-white font-bold text-lg shadow-lg shadow-primary-600/25"
            >
              <span>{SAMPLE_MATCH.similarityScore}% Match</span>
            </motion.div>
          </div>

          {/* Two profile cards */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <ProfileCard user={SAMPLE_MATCH.user1} />
            <ProfileCard user={SAMPLE_MATCH.user2} />
          </div>

          {/* Shared languages bar */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-dark-200 mb-3 text-center">
              Shared Language Breakdown
            </h4>
            <LanguageBar languages={SAMPLE_MATCH.sharedLanguages} />
          </div>

          {/* Match reasons */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-dark-200 mb-3">
              Why They Match
            </h4>
            <div className="space-y-2">
              {SAMPLE_MATCH.matchReasons.map((reason) => (
                <div key={reason} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600 dark:text-dark-300">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
