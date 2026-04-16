/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'default'|'dark'} [props.variant]
 * @param {string} [props.className]
 */
export default function Badge({ children, variant = 'default', className = '' }) {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest';
  const variantClass = variant === 'dark'
    ? 'bg-[var(--color-ink)] text-white'
    : 'bg-[var(--color-surface-muted)] text-[var(--color-ink-secondary)]';

  return (
    <span className={`${base} ${variantClass} ${className}`}>
      {children}
    </span>
  );
}
