import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { FEATURES } from '../../constants';
import SectionWrapper from '../ui/SectionWrapper';
import Card from '../ui/Card';
import { staggerContainer, fadeInUp } from '../../hooks/useScrollAnimation';

/**
 * Features section — 6 cards showcasing Ditto's analysis capabilities.
 */
export default function FeaturesSection() {
  return (
    <SectionWrapper id="features">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Your Coding <span className="gradient-text">DNA</span>, Decoded
        </h2>
        <p className="mt-4 text-gray-600 dark:text-dark-300 max-w-xl mx-auto">
          Ditto goes deep into your GitHub profile to build a unique fingerprint of how you code.
        </p>
      </div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        {FEATURES.map((feature) => {
          const Icon = Icons[feature.icon];
          return (
            <motion.div key={feature.title} variants={fadeInUp}>
              <Card className="p-6 h-full" gradient={feature.gradient}>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                >
                  {Icon && <Icon size={22} className="text-white" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-300 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
