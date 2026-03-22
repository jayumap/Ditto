import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * Wraps a section with consistent padding and scroll-triggered animation.
 * @param {{ id?: string, children: React.ReactNode, className?: string, containerClass?: string }} props
 */
export default function SectionWrapper({
  id,
  children,
  className = '',
  containerClass = '',
}) {
  const { ref, controls, variants } = useScrollAnimation();

  return (
    <section id={id} className={`section-padding ${className}`}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className={`max-w-7xl mx-auto ${containerClass}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
