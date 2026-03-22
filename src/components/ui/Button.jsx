import { motion } from 'framer-motion';

/**
 * Reusable Button component with primary and outline variants.
 * @param {{ variant?: 'primary' | 'outline', size?: 'sm' | 'md' | 'lg', icon?: React.ReactNode, children: React.ReactNode, className?: string, [key: string]: any }} props
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-dark-900';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary-600 to-accent-500 text-white hover:from-primary-500 hover:to-accent-400 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5',
    outline:
      'border-2 border-primary-600/30 dark:border-primary-400/30 text-primary-600 dark:text-primary-400 hover:bg-primary-600/10 dark:hover:bg-primary-400/10 hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
