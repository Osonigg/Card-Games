import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Timer hook using Date.now() delta to avoid drift
 * @returns {{ seconds: number, formatted: string, start: () => void, pause: () => void, stop: () => void, reset: () => void, isRunning: boolean }}
 */
export function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const accumulatedRef = useRef(0);

  const tick = useCallback(() => {
    if (startTimeRef.current !== null) {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setSeconds(accumulatedRef.current + elapsed);
    }
  }, []);

  const start = useCallback(() => {
    if (isRunning) return;
    startTimeRef.current = Date.now();
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 250);
  }, [isRunning, tick]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    clearInterval(intervalRef.current);
    if (startTimeRef.current !== null) {
      accumulatedRef.current += Math.floor((Date.now() - startTimeRef.current) / 1000);
    }
    startTimeRef.current = null;
    setIsRunning(false);
  }, [isRunning]);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    if (startTimeRef.current !== null) {
      accumulatedRef.current += Math.floor((Date.now() - startTimeRef.current) / 1000);
      setSeconds(accumulatedRef.current);
    }
    startTimeRef.current = null;
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    startTimeRef.current = null;
    accumulatedRef.current = 0;
    setSeconds(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  const formatted = `${m}:${s}`;

  return { seconds, formatted, start, pause, stop, reset, isRunning };
}
