import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface GameState {
  points: number;
  moneyLost: number;
  mistakesCount: number;
  currentLevel: number;
  gameStarted: boolean;
}

interface GameContextType extends GameState {
  addPoints: (amount: number) => void;
  loseMoneyTrap: (amount?: number) => void;
  addMistake: () => void;
  startGame: () => void;
  goToLevel: (level: number) => void;
  resetGame: () => void;
  getGullibilityScore: () => number;
}

const initialState: GameState = {
  points: 0,
  moneyLost: 0,
  mistakesCount: 0,
  currentLevel: 0, // 0 = landing page, 1-5 = levels
  gameStarted: false,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState);

  const addPoints = useCallback((amount: number) => {
    setState(prev => ({ ...prev, points: prev.points + amount }));
  }, []);

  const loseMoneyTrap = useCallback((amount: number = 99) => {
    // Default -$99 per trap as per PRD, but allow custom amounts
    setState(prev => ({ ...prev, moneyLost: prev.moneyLost + amount }));
  }, []);

  const addMistake = useCallback(() => {
    setState(prev => ({ ...prev, mistakesCount: prev.mistakesCount + 1 }));
  }, []);

  const startGame = useCallback(() => {
    setState(prev => ({ ...prev, gameStarted: true, currentLevel: 1 }));
  }, []);

  const goToLevel = useCallback((level: number) => {
    setState(prev => ({ ...prev, currentLevel: level }));
  }, []);

  const resetGame = useCallback(() => {
    setState(initialState);
  }, []);

  const getGullibilityScore = useCallback(() => {
    const totalLevels = 5;
    return Math.round((state.mistakesCount / totalLevels) * 100);
  }, [state.mistakesCount]);

  return (
    <GameContext.Provider
      value={{
        ...state,
        addPoints,
        loseMoneyTrap,
        addMistake,
        startGame,
        goToLevel,
        resetGame,
        getGullibilityScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
