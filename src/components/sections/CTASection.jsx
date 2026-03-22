import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { CTA } from '../../constants';
import Button from '../ui/Button';
import Input from '../ui/Input';

/**
 * Full-width CTA section with input + button repeated.
 */
export default function CTASection({ onSearch }) {
  const [username, setUsername] = useState('');

  /** Handles form submission. */
  const handleSubmit = () => {
    if (username.trim() && onSearch) onSearch(username.trim());
  };
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-500/20 via-transparent to-transparent" />

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/5 blur-sm"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/5 blur-sm"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-10 h-10 text-white/80 mx-auto mb-6" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-balance">
            {CTA.headline}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto">
            {CTA.subtext}
          </p>

          <div className="mt-8 sm:mt-10 max-w-md mx-auto">
            <Input
              type="text"
              placeholder={CTA.inputPlaceholder}
              icon={<Search size={18} />}
              className="border-white/20 bg-white/10 focus-within:border-white/40 focus-within:ring-white/10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              action={
                <Button
                  size="sm"
                  className="bg-white text-primary-700 hover:bg-white/90 shadow-none from-white to-white"
                  icon={<ArrowRight size={16} />}
                  onClick={handleSubmit}
                >
                  {CTA.ctaButton}
                </Button>
              }
            />
          </div>

          <p className="mt-4 text-sm text-white/50">
            Free to use · No account required · Results in seconds
          </p>
        </motion.div>
      </div>
    </section>
  );
}
