import { useReducer, useCallback, useEffect, useRef } from 'react';
import { generateBoard, DIFFICULTY_CONFIG } from '../lib/cards.js';

const initialState = {
  cards: [],
  flipped: [],
  matched: [],
  moves: 0,
  pairs: { found: 0, total: 0 },
  status: 'idle', // 'idle' | 'playing' | 'paused' | 'completed'
  difficulty: 'easy',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };

    case 'START_GAME': {
      const config = DIFFICULTY_CONFIG[state.difficulty];
      const cards = generateBoard(state.difficulty);
      return {
        ...state,
        cards,
        flipped: [],
        matched: [],
        moves: 0,
        pairs: { found: 0, total: config.cards / 2 },
        status: 'playing',
      };
    }

    case 'FLIP_CARD': {
      if (state.status !== 'playing') return state;
      if (state.flipped.length >= 2) return state;
      if (state.flipped.includes(action.payload)) return state;
      if (state.matched.includes(action.payload)) return state;
      return {
        ...state,
        flipped: [...state.flipped, action.payload],
      };
    }

    case 'CHECK_MATCH': {
      const [firstId, secondId] = state.flipped;
      const card1 = state.cards.find(c => c.id === firstId);
      const card2 = state.cards.find(c => c.id === secondId);
      const isMatch = card1 && card2 && card1.symbolId === card2.symbolId;

      const newMatched = isMatch
        ? [...state.matched, firstId, secondId]
        : state.matched;
      const found = newMatched.length / 2;
      const allMatched = found === state.pairs.total;

      return {
        ...state,
        flipped: [],
        matched: newMatched,
        moves: state.moves + 1,
        pairs: { ...state.pairs, found },
        status: allMatched ? 'completed' : 'playing',
      };
    }

    case 'PAUSE':
      return state.status === 'playing'
        ? { ...state, status: 'paused' }
        : state;

    case 'RESUME':
      return state.status === 'paused'
        ? { ...state, status: 'playing' }
        : state;

    case 'RESTART': {
      const config = DIFFICULTY_CONFIG[state.difficulty];
      return {
        ...state,
        cards: generateBoard(state.difficulty),
        flipped: [],
        matched: [],
        moves: 0,
        pairs: { found: 0, total: config.cards / 2 },
        status: 'playing',
      };
    }

    case 'CHANGE_DIFFICULTY': {
      const config = DIFFICULTY_CONFIG[action.payload];
      return {
        ...state,
        difficulty: action.payload,
        cards: generateBoard(action.payload),
        flipped: [],
        matched: [],
        moves: 0,
        pairs: { found: 0, total: config.cards / 2 },
        status: 'playing',
      };
    }

    case 'GO_HOME':
      return { ...initialState, difficulty: state.difficulty };

    default:
      return state;
  }
}

/**
 * Core game engine hook
 */
export function useGameEngine() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const checkTimeoutRef = useRef(null);

  // Auto-check match when 2 cards are flipped
  useEffect(() => {
    if (state.flipped.length === 2) {
      checkTimeoutRef.current = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
      }, 800);
    }
    return () => clearTimeout(checkTimeoutRef.current);
  }, [state.flipped]);

  const setDifficulty = useCallback((d) => dispatch({ type: 'SET_DIFFICULTY', payload: d }), []);
  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const flipCard = useCallback((id) => dispatch({ type: 'FLIP_CARD', payload: id }), []);
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);
  const changeDifficulty = useCallback((d) => dispatch({ type: 'CHANGE_DIFFICULTY', payload: d }), []);
  const goHome = useCallback(() => dispatch({ type: 'GO_HOME' }), []);

  return {
    ...state,
    setDifficulty,
    startGame,
    flipCard,
    pause,
    resume,
    restart,
    changeDifficulty,
    goHome,
  };
}
