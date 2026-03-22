/**
 * Small colored Badge component (e.g. for language pills).
 * @param {{ children: React.ReactNode, variant?: 'default' | 'primary' | 'accent', className?: string }} props
 */
export default function Badge({
  children,
  variant = 'default',
  className = '',
}) {
  const variants = {
    default:
      'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-300 border-gray-200/60 dark:border-dark-600/50',
    primary:
      'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-200/60 dark:border-primary-700/50',
    accent:
      'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 border-accent-200/60 dark:border-accent-700/50',
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        border transition-colors duration-200
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
