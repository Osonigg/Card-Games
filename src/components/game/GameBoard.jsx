import Card from './Card.jsx';
import { DIFFICULTY_CONFIG } from '../../lib/cards.js';

/**
 * @param {object} props
 * @param {Array} props.cards
 * @param {string[]} props.flipped
 * @param {string[]} props.matched
 * @param {string} props.difficulty
 * @param {function} props.onFlip
 * @param {boolean} props.disabled
 */
export default function GameBoard({ cards, flipped, matched, difficulty, onFlip, disabled }) {
  const config = DIFFICULTY_CONFIG[difficulty];

  const getCardState = (card) => {
    if (matched.includes(card.id)) return 'matched';
    if (flipped.includes(card.id)) return 'flipped';
    return 'hidden';
  };

  // Constrain board width based on difficulty so cards don't get too large
  const maxWidths = {
    easy: 'max-w-[320px] lg:max-w-[400px]',
    medium: 'max-w-[380px] lg:max-w-[520px]',
    hard: 'max-w-[380px] lg:max-w-[520px]',
  };

  return (
    <div
      className={`grid gap-2.5 lg:gap-3.5 w-full mx-auto ${maxWidths[difficulty] || maxWidths.medium}`}
      style={{ gridTemplateColumns: `repeat(${config.cols}, 1fr)` }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          Icon={card.Icon}
          cardState={getCardState(card)}
          onClick={onFlip}
          disabled={disabled || flipped.length >= 2}
          index={index}
        />
      ))}
    </div>
  );
}
