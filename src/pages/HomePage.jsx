import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import useGitHubMatch from '../hooks/useGitHubMatch';
import LandingPage from './LandingPage';
import DittoLoader from '../components/ui/DittoLoader';
import MatchResult from '../components/sections/MatchResult';
import Button from '../components/ui/Button';

/**
 * HomePage orchestrates the idle → loading → success | error flow.
 */
export default function HomePage() {
  const {
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
  } = useGitHubMatch();

  return (
    <>
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage onSearch={findMatch} />
          </motion.div>
        )}

        {status === 'loading' && (
          <DittoLoader key="loader" loadingStep={loadingStep} />
        )}

        {status === 'success' && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MatchResult
              inputUser={inputUser}
              matchedUser={matchedUser}
              score={score}
              breakdown={breakdown}
              matchReasons={matchReasons}
              onReset={reset}
            />
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4"
          >
            <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-300 mb-6">{error}</p>
              <Button icon={<RotateCcw size={16} />} onClick={reset}>
                Try Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
