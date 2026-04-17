import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { Header } from './components/Header.jsx';
import { BottomNav } from './components/BottomNav.jsx';
import { HomeScreen } from './components/screens/HomeScreen.jsx';
import { GameScreen } from './components/screens/GameScreen.jsx';
import { VictoryScreen } from './components/screens/VictoryScreen.jsx';
import { PauseModal } from './components/PauseModal.jsx';
import { StatsScreen } from './components/screens/StatsScreen.jsx';

export default function App() {
  const [screen, setScreen]       = useState('HOME');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [metrics, setMetrics]     = useState({ timeElapsed: 0, moves: 0, pairsFound: 0, totalPairs: 0 });
  const [sessionId, setSessionId] = useState('ARCH-001');
  const [isDark, setIsDark]       = useState(false);
  const [lang, setLang]           = useState('es');
  const [completedGames, setCompletedGames] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const startGame = () => {
    setSessionId(`ARCH-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`);
    setScreen('PLAYING');
  };

  const handleVictory = (finalMetrics) => {
    setMetrics(finalMetrics);
    setCompletedGames([...completedGames,
    {
      id: completedGames.length + 1,
      difficulty: difficulty,
      timeElapsed: finalMetrics.timeElapsed,
      moves: finalMetrics.moves,
      timestamp: new Date()
    }
  ]);
    setScreen('VICTORY');
  };

  const handleRestart = () => {
    setScreen('HOME');
    setTimeout(startGame, 50);
  };

  return (
    <div className="flex bg-surface min-h-screen text-on-surface font-sans overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,var(--theme-primary)_0%,transparent_50%)] opacity-[0.03] dark:opacity-[0.08] z-0" />

      <div className="flex w-full relative z-10">
        <Sidebar
          completedGames={completedGames}
          screen={screen}
          onNewGame={startGame}
          onStatsClick={() => setScreen('STATS')}
          onExit={() => setScreen('HOME')}
          metrics={metrics}
          difficulty={difficulty}
          lang={lang}
        />
        <Header
          screen={screen}
          sessionId={sessionId}
          onPause={() => setScreen('PAUSED')}
          isDark={isDark}
          toggleTheme={() => setIsDark(d => !d)}
          lang={lang}
          setLang={setLang}
        />

        <div className="flex-1 flex flex-col md:ml-[300px] min-h-screen pt-16">
          {screen === 'HOME' && (
            <HomeScreen
              onStart={startGame}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              lang={lang}
            />
          )}

          {(screen === 'PLAYING' || screen === 'PAUSED') && (
            <GameScreen
              difficulty={difficulty}
              onVictory={handleVictory}
              onMetricsChange={setMetrics}
              lang={lang}
            />
          )}

          {screen === 'VICTORY' && (
            <VictoryScreen
              metrics={metrics}
              onRestart={handleRestart}
              onHome={() => setScreen('HOME')}
              lang={lang}
            />
          )}

          {screen === 'STATS' && (
          <StatsScreen
          completedGames={completedGames}
          onBack={() => setScreen('HOME')}
          lang={lang}/>
          )}
        </div>
      </div>

      {screen === 'PAUSED' && (
        <PauseModal
          onResume={() => setScreen('PLAYING')}
          onRestart={handleRestart}
          onChangeDifficulty={() => setScreen('HOME')}
          onExit={() => setScreen('HOME')}
          lang={lang}
        />
      )}

      <BottomNav lang={lang} />
    </div>
  );
}
