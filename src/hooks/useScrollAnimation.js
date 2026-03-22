import { useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * Custom hook that triggers a Framer Motion animation when
 * the referenced element scrolls into view.
 * @param {number} [threshold=0.15] — fraction of element visible to trigger
 * @returns {{ ref: React.RefObject, controls: import('framer-motion').AnimationControls, variants: object }}
 */
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: threshold });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return { ref, controls, variants };
}

/**
 * Stagger container variant for parent elements.
 * @param {number} [staggerDelay=0.1]
 * @returns {object}
 */
export function staggerContainer(staggerDelay = 0.1) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
}

/**
 * Fade-in-up variant for child elements.
 */
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
