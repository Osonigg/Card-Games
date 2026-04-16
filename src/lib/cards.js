import {
  Compass, Building2, Home, Triangle, LayoutGrid,
  Layers, Box, Circle, Hexagon, Ruler
} from 'lucide-react';

export const SYMBOL_POOL = [
  { id: 'compass', Icon: Compass },
  { id: 'building', Icon: Building2 },
  { id: 'home', Icon: Home },
  { id: 'triangle', Icon: Triangle },
  { id: 'grid', Icon: LayoutGrid },
  { id: 'layers', Icon: Layers },
  { id: 'box', Icon: Box },
  { id: 'circle', Icon: Circle },
  { id: 'hexagon', Icon: Hexagon },
  { id: 'ruler', Icon: Ruler },
];

export const DIFFICULTY_CONFIG = {
  easy: { cards: 6, cols: 3, rows: 2, label: 'Facil (3\u00d72)' },
  medium: { cards: 12, cols: 4, rows: 3, label: 'Medio (4\u00d73)' },
  hard: { cards: 16, cols: 4, rows: 4, label: 'Dificil (4\u00d74)' },
};

/**
 * Fisher-Yates shuffle
 * @param {any[]} array
 * @returns {any[]}
 */
function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generate a shuffled board of cards for the given difficulty
 * @param {'easy'|'medium'|'hard'} difficulty
 * @returns {{ id: string, symbolId: string, Icon: React.ComponentType }[]}
 */
export function generateBoard(difficulty) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const pairCount = config.cards / 2;
  const symbols = shuffle(SYMBOL_POOL).slice(0, pairCount);

  const cards = symbols.flatMap((symbol, index) => [
    { id: `${symbol.id}-a-${index}`, symbolId: symbol.id, Icon: symbol.Icon },
    { id: `${symbol.id}-b-${index}`, symbolId: symbol.id, Icon: symbol.Icon },
  ]);

  return shuffle(cards);
}
