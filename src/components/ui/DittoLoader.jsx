import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOADER_FACTS } from '../../constants';

/** Maps a loading step string to a 0-based index for progress. */
const STEP_KEYWORDS = [
  'profile',
  'repository',
  'commit',
  'Scanning',
  'matching',
  'similarity',
  'found',
];

/** Returns 0-6 index based on loadingStep text. */
function getStepIndex(step) {
  if (!step) return 0;
  const idx = STEP_KEYWORDS.findIndex((kw) =>
    step.toLowerCase().includes(kw.toLowerCase())
  );
  return idx >= 0 ? idx : 0;
}

/** Single DNA helix strand node. */
function HelixNode({ cx, cy, r, color, delay }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/** Animated DNA double-helix SVG. */
function DNAHelix() {
  const nodes = useMemo(() => {
    const items = [];
    const steps = 14;
    const w = 200;
    const h = 300;
    const cx = w / 2;
    const amplitude = 50;

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const y = 20 + t * (h - 40);
      const phase = t * Math.PI * 3;

      const x1 = cx + Math.sin(phase) * amplitude;
      const x2 = cx - Math.sin(phase) * amplitude;

      items.push(
        { id: `a${i}`, cx: x1, cy: y, r: 5, color: '#8b5cf6', delay: i * 0.12 },
        { id: `b${i}`, cx: x2, cy: y, r: 5, color: '#06b6d4', delay: i * 0.12 + 0.06 }
      );

      // Connecting rungs
      items.push({
        id: `r${i}`,
        type: 'line',
        x1,
        y1: y,
        x2,
        y2: y,
        delay: i * 0.12,
      });
    }
    return items;
  }, []);

  return (
    <motion.svg
      width="200"
      height="300"
      viewBox="0 0 200 300"
      className="mx-auto"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      {nodes.map((n) =>
        n.type === 'line' ? (
          <motion.line
            key={n.id}
            x1={n.x1}
            y1={n.y1}
            x2={n.x2}
            y2={n.y2}
            stroke="url(#helixGrad)"
            strokeWidth="1.5"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, strokeOpacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 2, repeat: Infinity, delay: n.delay, ease: 'easeInOut' }}
          />
        ) : (
          <HelixNode key={n.id} {...n} />
        )
      )}
      <defs>
        <linearGradient id="helixGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

/** Typewriter text animation component. */
function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    if (!text) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayText(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-0.5 h-5 bg-primary-400 ml-0.5 align-middle"
      />
    </span>
  );
}

/**
 * Full-page immersive loader with DNA helix animation, step progress, and fun facts.
 * @param {{ loadingStep: string }} props
 */
export default function DittoLoader({ loadingStep }) {
  const [factIndex, setFactIndex] = useState(0);
  const stepIndex = getStepIndex(loadingStep);
  const progress = Math.round((stepIndex / 6) * 100);

  // Rotate facts every 3 s
  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % LOADER_FACTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto px-6 text-center">
        {/* DNA Helix */}
        <div className="mb-8">
          <DNAHelix />
        </div>

        {/* Step text with typewriter */}
        <div className="h-8 flex items-center justify-center mb-6">
          <p className="text-lg font-semibold text-gray-800 dark:text-dark-100">
            <TypewriterText text={loadingStep} />
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-sm mb-6">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-dark-400 mb-2">
            <span>Step {stepIndex + 1} of 7</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-dark-700 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary-600 to-accent-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Fun facts */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={factIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-sm text-gray-500 dark:text-dark-400 italic max-w-md"
            >
              💡 {LOADER_FACTS[factIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
