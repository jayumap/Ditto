import { motion } from 'framer-motion';

/**
 * Glass-morphism styled Card component.
 * @param {{ children: React.ReactNode, className?: string, hover?: boolean, gradient?: string, [key: string]: any }} props
 */
export default function Card({
  children,
  className = '',
  hover = true,
  gradient,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl
        border border-gray-200/60 dark:border-dark-600/50
        shadow-lg shadow-gray-200/20 dark:shadow-black/20
        transition-all duration-300
        ${hover ? 'hover:shadow-xl hover:shadow-primary-600/10 dark:hover:shadow-primary-400/10 hover:border-primary-300/30 dark:hover:border-primary-500/30' : ''}
        ${className}
      `}
      {...props}
    >
      {gradient && (
        <div
          className={`absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-gradient-to-br ${gradient}`}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
