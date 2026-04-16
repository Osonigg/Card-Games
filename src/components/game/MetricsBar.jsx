import { Clock, MousePointerClick, Trophy } from 'lucide-react';

/**
 * Mobile metrics row - 3 equal pill cards
 * @param {object} props
 * @param {string} props.time
 * @param {number} props.moves
 * @param {{ found: number, total: number }} props.pairs
 */
export default function MetricsBar({ time, moves, pairs }) {
  const items = [
    { label: 'TIME', value: time, Icon: Clock },
    { label: 'MOVES', value: moves, Icon: MousePointerClick },
    { label: 'PAIRS', value: `${pairs.found}/${pairs.total}`, Icon: Trophy },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5 w-full">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center bg-[var(--color-surface-muted)] rounded-lg py-3 px-2"
        >
          <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-ink-secondary)] mb-1">
            {item.label}
          </span>
          <span className="text-base font-semibold text-[var(--color-ink)]">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
