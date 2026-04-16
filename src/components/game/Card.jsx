import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * @param {object} props
 * @param {string} props.id
 * @param {React.ComponentType} props.Icon - lucide-react icon component
 * @param {'hidden'|'flipped'|'matched'|'incorrect'} props.cardState
 * @param {function} props.onClick
 * @param {boolean} props.disabled
 * @param {number} [props.index] - for staggered animation
 */
function Card({ id, Icon, cardState, onClick, disabled, index = 0 }) {
  const isRevealed = cardState === 'flipped' || cardState === 'matched' || cardState === 'incorrect';

  const handleClick = () => {
    if (disabled || cardState !== 'hidden') return;
    onClick(id);
  };

  const frontContent = useMemo(() => {
    if (cardState === 'matched') {
      return (
        <div className="flex items-center justify-center w-full h-full bg-[var(--color-matched)] rounded-lg lg:rounded-xl">
          <Icon className="text-white w-6 h-6 lg:w-8 lg:h-8" strokeWidth={1.5} />
        </div>
      );
    }
    if (cardState === 'flipped') {
      return (
        <div className="flex items-center justify-center w-full h-full bg-white border-2 border-[var(--color-ink)] rounded-lg lg:rounded-xl">
          <Icon className="text-[var(--color-ink)] w-6 h-6 lg:w-8 lg:h-8" strokeWidth={1.5} />
        </div>
      );
    }
    if (cardState === 'incorrect') {
      return (
        <div className="flex items-center justify-center w-full h-full bg-white border-2 border-[var(--color-border)] rounded-lg lg:rounded-xl">
          <Icon className="text-[var(--color-ink-secondary)] w-6 h-6 lg:w-8 lg:h-8" strokeWidth={1.5} />
        </div>
      );
    }
    return null;
  }, [cardState, Icon]);

  const duration = prefersReducedMotion ? 0 : 0.35;

  return (
    <motion.div
      className="aspect-square cursor-pointer perspective-[800px]"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: prefersReducedMotion ? 0 : index * 0.03, duration: 0.3 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration, ease: 'easeInOut' }}
      >
        {/* Back face - hidden state */}
        <div
          className="absolute inset-0 rounded-lg lg:rounded-xl bg-[var(--color-surface-muted)] shadow-sm flex items-center justify-center hover:bg-[#D8D8D8] transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Circle size={6} className="text-[var(--color-ink-secondary)] opacity-40" />
        </div>

        {/* Front face - revealed state */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {frontContent}
        </div>
      </motion.div>

      {/* Match pulse animation */}
      {cardState === 'matched' && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-lg lg:rounded-xl bg-[var(--color-ink)]"
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.div>
  );
}

export default memo(Card);
