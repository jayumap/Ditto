import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { HERO } from '../../constants';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Badge from '../ui/Badge';

/**
 * Floating code snippet for the animated background.
 */
function FloatingCode({ text, className }) {
  return (
    <motion.div
      className={`absolute font-mono text-xs text-primary-400/20 dark:text-primary-300/10 select-none pointer-events-none ${className}`}
      animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {text}
    </motion.div>
  );
}

/**
 * Mock GitHub avatar card for the hero visual.
 */
function AvatarCard({ name, username, avatarUrl, side }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.5 + (side === 'right' ? 0.2 : 0) }}
      className="flex-shrink-0"
    >
      <div className="glass rounded-2xl p-4 sm:p-5 text-center w-36 sm:w-44">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden mb-3 ring-2 ring-primary-500/30 ring-offset-2 ring-offset-white dark:ring-offset-dark-900">
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{name}</p>
        <p className="text-xs text-gray-500 dark:text-dark-400">@{username}</p>
      </div>
    </motion.div>
  );
}

/**
 * Hero section with headline, GitHub input, animated background, and avatar cards.
 */
export default function HeroSection({ onSearch }) {
  const [username, setUsername] = useState('');

  /** Handles form submission. */
  const handleSubmit = () => {
    if (username.trim() && onSearch) onSearch(username.trim());
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Gradient background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 dark:bg-primary-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 dark:bg-accent-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating code snippets */}
      <FloatingCode text="const match = await ditto.find(user);" className="top-[15%] left-[8%] hidden lg:block" />
      <FloatingCode text="git commit -m 'feat: add twin'" className="top-[25%] right-[10%] hidden lg:block" />
      <FloatingCode text="{ similarity: 0.94 }" className="bottom-[30%] left-[12%] hidden lg:block" />
      <FloatingCode text="export type CodingDNA = {...}" className="bottom-[20%] right-[8%] hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary">{HERO.badge}</Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance"
          >
            <span className="text-gray-900 dark:text-white">{HERO.headline} </span>
            <span className="gradient-text">{HERO.headlineAccent}</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto text-balance"
          >
            {HERO.subtext}
          </motion.p>

          {/* Input + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 sm:mt-10 max-w-md mx-auto"
          >
            <Input
              type="text"
              placeholder={HERO.inputPlaceholder}
              icon={<Search size={18} />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              action={
                <Button size="sm" icon={<ArrowRight size={16} />} onClick={handleSubmit}>
                  {HERO.ctaButton}
                </Button>
              }
            />
          </motion.div>

          {/* Avatar cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 sm:mt-16 flex items-center justify-center gap-4 sm:gap-8"
          >
            <AvatarCard
              name="You"
              username="your_handle"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=You&backgroundColor=b6e3f4"
              side="left"
            />

            {/* DNA / ≈ symbol */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex-shrink-0"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 flex items-center justify-center shadow-xl shadow-primary-600/25">
                <span className="text-white font-bold text-xl sm:text-2xl">≈</span>
              </div>
            </motion.div>

            <AvatarCard
              name="Your Twin"
              username="twin_dev"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Twin&backgroundColor=ffd5dc"
              side="right"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-dark-500 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-gray-400 dark:bg-dark-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
