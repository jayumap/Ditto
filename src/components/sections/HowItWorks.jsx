import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { STEPS } from '../../constants';
import SectionWrapper from '../ui/SectionWrapper';
import { staggerContainer, fadeInUp } from '../../hooks/useScrollAnimation';

/**
 * "How It Works" section — 3-step horizontal timeline.
 */
export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" className="bg-gray-50/50 dark:bg-dark-800/30">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="mt-4 text-gray-600 dark:text-dark-300 max-w-xl mx-auto">
          Three simple steps to discover your coding doppelgänger
        </p>
      </div>

      <motion.div
        variants={staggerContainer(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative"
      >
        {/* Connector line (desktop) */}
        <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary-600/30 via-accent-500/30 to-primary-600/30" />

        {STEPS.map((step) => {
          const Icon = Icons[step.icon];
          return (
            <motion.div
              key={step.id}
              variants={fadeInUp}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number + icon circle */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-xl shadow-primary-600/20 mb-6">
                  {Icon && <Icon size={28} className="text-white" />}
                </div>
                {/* Step number badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-dark-900 border-2 border-primary-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                    {step.id}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-300 max-w-xs">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
