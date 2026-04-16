const STORAGE_KEY = 'architect_memory_scores';

/**
 * Save a completed game score
 * @param {{ difficulty: string, time: number, moves: number, pairs: number }} score
 */
export function saveScore(score) {
  try {
    const scores = getScores();
    scores.push({ ...score, date: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // localStorage unavailable — fail silently
  }
}

/**
 * Get all saved scores
 * @returns {{ difficulty: string, time: number, moves: number, pairs: number, date: string }[]}
 */
export function getScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
