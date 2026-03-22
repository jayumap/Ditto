import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import { STATS } from '../../constants';

/**
 * Animated counter that counts up from 0 to the target value.
 */
function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let startTime;
    const duration = 2000;

    function animate(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * Social proof stats bar with animated counters.
 */
export default function StatsBar() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500 opacity-[0.03] dark:opacity-[0.06]" />
      <div className="absolute inset-0 border-y border-gray-200/50 dark:border-dark-600/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4"
        >
          {STATS.map((stat, index) => {
            const Icon = Icons[stat.icon];
            return (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-2">
                  {Icon && (
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <Icon size={20} className="text-primary-600 dark:text-primary-400" />
                    </div>
                  )}
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-dark-400">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
