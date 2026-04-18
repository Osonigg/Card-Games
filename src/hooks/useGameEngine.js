import { useReducer, useCallback, useEffect } from 'react';
import { SYMBOL_POOL, CARDS_SPANISH, DIFFICULTY_CONFIG } from '../constants';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(difficulty) {
  const { pairs } = DIFFICULTY_CONFIG[difficulty];
  const pool = 
    difficulty === 'EXTREME' ? CARDS_SPANISH : 
    difficulty === 'VERYHARD' ? CARDS_SPANISH : SYMBOL_POOL;
  const selectedSymbols = shuffle(pool).slice(0, pairs);
  
   // Duplicamos y creamos los objetos de las cartas
  return shuffle([...selectedSymbols, ...selectedSymbols].map((s, i) => ({
    uid: `${s.id}-${i}`,
    symbolId: s.id,
    img: s.img,      // Usará './01-oro.png', etc.
    state: 'hidden',
  })));
}

const initialState = {
  cards: [],
  flipped: [],
  matched: [],
  moves: 0,
  pairsFound: 0,
  status: 'idle',
  difficulty: 'MEDIUM',
  locked: false,
};

function reducer(state, action) {
  switch (action.type) {

    case 'START': {
      return {
        ...initialState,
        difficulty: action.difficulty,
        cards: buildDeck(action.difficulty),
        status: 'playing',
      };
    }

    case 'FLIP': {
      if (state.locked || state.status !== 'playing') return state;
      const { uid } = action;
      const card = state.cards.find(c => c.uid === uid);
      if (!card || card.state !== 'hidden') return state;

      const newFlipped = [...state.flipped, uid];
      const newCards = state.cards.map(c =>
        c.uid === uid ? { ...c, state: 'flipped' } : c
      );

      if (newFlipped.length < 2) {
        return { ...state, cards: newCards, flipped: newFlipped };
      }

      const [a, b] = newFlipped;
      const cardA = newCards.find(c => c.uid === a);
      const cardB = newCards.find(c => c.uid === b);
      const isMatch = cardA.symbolId === cardB.symbolId;

      if (isMatch) {
        const matched = newCards.map(c =>
          c.uid === a || c.uid === b ? { ...c, state: 'matched' } : c
        );
        const newPairs = state.pairsFound + 1;
        const total = DIFFICULTY_CONFIG[state.difficulty].pairs;
        return {
          ...state,
          cards: matched,
          flipped: [],
          moves: state.moves + 1,
          pairsFound: newPairs,
          status: newPairs === total ? 'completed' : 'playing',
          locked: false,
        };
      }

      const incorrect = newCards.map(c =>
        c.uid === a || c.uid === b ? { ...c, state: 'incorrect' } : c
      );
      return {
        ...state,
        cards: incorrect,
        flipped: newFlipped,
        moves: state.moves + 1,
        locked: true,
      };
    }

    case 'UNFLIP': {
      const newCards = state.cards.map(c =>
        state.flipped.includes(c.uid) ? { ...c, state: 'hidden' } : c
      );
      return { ...state, cards: newCards, flipped: [], locked: false };
    }

    case 'PAUSE':  return { ...state, status: 'paused' };
    case 'RESUME': return { ...state, status: 'playing' };

    default: return state;
  }
}

export function useGameEngine() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Only unflip after a mismatch (when the board is locked with 2 cards flipped)
  useEffect(() => {
    if (state.locked && state.flipped.length === 2) {
      const id = setTimeout(() => dispatch({ type: 'UNFLIP' }), 1000);
      return () => clearTimeout(id);
    }
  }, [state.locked, state.flipped]);

  const startGame = useCallback((difficulty) => {
    dispatch({ type: 'START', difficulty });
  }, []);

  const flipCard = useCallback((uid) => {
    dispatch({ type: 'FLIP', uid });
  }, []);

  const pause  = useCallback(() => dispatch({ type: 'PAUSE' }),  []);
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), []);

  return { state, startGame, flipCard, pause, resume };
}
