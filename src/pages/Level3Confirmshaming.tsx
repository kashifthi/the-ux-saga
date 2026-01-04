import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameShell } from '@/components/GameShell';
import { ConfirmshamingCard } from '@/components/patterns/ConfirmshamingCard';

type LevelState = 'playing' | 'success' | 'fail';

export function Level3Confirmshaming() {
  const { addPoints, loseMoneyTrap, addMistake, goToLevel } = useGame();
  const [levelState, setLevelState] = useState<LevelState>('playing');

  const handleAccept = () => {
    // Trap: Clicking "Yes" signs user up for $20/month newsletter
    loseMoneyTrap(20);
    addMistake();
    setLevelState('fail');
  };

  const handleDecline = () => {
    // Success: Clicking the shameful "No" button despite the guilt
    addPoints(100);
    setLevelState('success');
  };

  const handleNextLevel = () => {
    goToLevel(4);
  };

  const handleRetry = () => {
    setLevelState('playing');
  };

  const levelInfo = {
    levelNumber: 3,
    levelName: 'CONFIRMSHAMING',
    tagline: 'Would you like to feel bad about yourself today?',
  };

  const feedbackProps = levelState !== 'playing' ? {
    state: levelState as 'success' | 'fail',
    successMessage: 'You resisted the emotional manipulation! +100 Points',
    failMessage: 'You just signed up for a $20/month newsletter hidden in the fine print!',
    evilMessage: levelState === 'fail' 
      ? "Did that hurt your feelings? Good. Emotional damage is our favorite currency."
      : "You clicked THAT button?! Most people can't handle the shame. Impressive...",
    patternName: 'CONFIRMSHAMING',
    patternDescription: levelState === 'fail'
      ? 'This involves using guilt-tripping language to steer users into a specific choice, often making the alternative sound shameful or stupid. Always read the fine print before clicking "Yes"!'
      : 'This involves using guilt-tripping language to steer users into a specific choice, often making the alternative sound shameful. You saw through the manipulation!',
    onRetry: handleRetry,
    onNextLevel: handleNextLevel,
  } : undefined;

  return (
    <GameShell level={levelInfo} feedback={feedbackProps}>
      {levelState === 'playing' && (
        <ConfirmshamingCard
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </GameShell>
  );
}