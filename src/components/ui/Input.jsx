import { forwardRef } from 'react';

/**
 * Styled text input with an optional icon and action button slot.
 * @param {{ icon?: React.ReactNode, action?: React.ReactNode, className?: string, [key: string]: any }} props
 */
const Input = forwardRef(function Input(
  { icon, action, className = '', ...props },
  ref
) {
  return (
    <div
      className={`
        relative flex items-center w-full
        bg-white dark:bg-dark-800
        border-2 border-gray-200 dark:border-dark-600
        rounded-xl overflow-hidden
        focus-within:border-primary-500 dark:focus-within:border-primary-400
        focus-within:ring-4 focus-within:ring-primary-500/10 dark:focus-within:ring-primary-400/10
        transition-all duration-300
        ${className}
      `}
    >
      {icon && (
        <span className="flex items-center pl-4 text-gray-400 dark:text-dark-400">
          {icon}
        </span>
      )}
      <input
        ref={ref}
        className="
          flex-1 w-full px-4 py-3 bg-transparent
          text-gray-900 dark:text-dark-100
          placeholder:text-gray-400 dark:placeholder:text-dark-500
          focus:outline-none text-sm
        "
        {...props}
      />
      {action && (
        <div className="flex-shrink-0 pr-2">{action}</div>
      )}
    </div>
  );
});

export default Input;
