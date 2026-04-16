import React from 'react';

const variants = {
  primary: 'bg-[var(--color-accent)] text-white hover:bg-[#1a1a1a]',
  secondary: 'bg-[var(--color-surface-muted)] text-[var(--color-ink)] hover:bg-[#d8d8d8]',
  ghost: 'bg-transparent text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-muted)]',
  danger: 'bg-transparent text-[var(--color-danger)] hover:bg-red-50',
  outline: 'bg-transparent border border-[var(--color-border)] text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)]',
};

const sizes = {
  sm: 'h-10 px-4 text-sm gap-2',
  md: 'h-12 px-6 text-base gap-2.5',
  lg: 'h-14 px-8 text-lg gap-3',
};

/**
 * @param {object} props
 * @param {'primary'|'secondary'|'ghost'|'danger'|'outline'} [props.variant]
 * @param {'sm'|'md'|'lg'} [props.size]
 * @param {React.ReactNode} [props.icon]
 * @param {boolean} [props.fullWidth]
 * @param {React.ReactNode} props.children
 * @param {function} [props.onClick]
 * @param {string} [props.className]
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  children,
  className = '',
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-semibold rounded-md
        transition-colors duration-150 cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
