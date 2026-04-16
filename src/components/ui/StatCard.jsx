/**
 * @param {object} props
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {boolean} [props.highlighted] - black bg variant
 * @param {React.ComponentType} [props.Icon] - lucide-react icon
 * @param {string} [props.className]
 */
export default function StatCard({ label, value, highlighted = false, Icon, className = '' }) {
  return (
    <div
      className={`
        relative flex flex-col items-center justify-center rounded-lg px-3 py-5 text-center
        ${highlighted
          ? 'bg-[var(--color-ink)] text-white'
          : 'bg-[var(--color-surface-muted)] text-[var(--color-ink)]'
        }
        ${className}
      `}
    >
      <span className={`text-[9px] font-bold uppercase tracking-widest mb-2 ${highlighted ? 'text-white/70' : 'text-[var(--color-ink-secondary)]'}`}>
        {label}
      </span>
      <span className="text-2xl font-light tracking-tight font-mono">
        {value}
      </span>
      <div className={`w-6 h-0.5 mt-2 ${highlighted ? 'bg-white/50' : 'bg-[var(--color-ink)]/20'}`} />
      {Icon && (
        <div className={`absolute top-2 right-2 ${highlighted ? 'text-white/20' : 'text-[var(--color-ink)]/10'}`}>
          <Icon size={14} />
        </div>
      )}
    </div>
  );
}
