import { Routes, Route, Navigate } from 'react-router-dom';
import { useGameEngine } from './hooks/useGameEngine.js';
import { useTimer } from './hooks/useTimer.js';
import HomeScreen from './screens/HomeScreen.jsx';
import GameScreen from './screens/GameScreen.jsx';

export default function App() {
  const engine = useGameEngine();
  const timer = useTimer();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeScreen
            difficulty={engine.difficulty}
            setDifficulty={engine.setDifficulty}
            startGame={engine.startGame}
          />
        }
      />
      <Route
        path="/game"
        element={
          <GameScreen engine={engine} timer={timer} />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
