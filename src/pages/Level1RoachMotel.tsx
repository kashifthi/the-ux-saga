import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameShell } from '@/components/GameShell';
import { RoachMotelCard } from '@/components/patterns/RoachMotelCard';

type LevelState = 'playing' | 'success' | 'fail';

export function Level1RoachMotel() {
  const { addPoints, loseMoneyTrap, addMistake, goToLevel } = useGame();
  const [levelState, setLevelState] = useState<LevelState>('playing');

  const handleTrapClick = () => {
    loseMoneyTrap();
    addMistake();
    setLevelState('fail');
  };

  const handleSafeClick = () => {
    addPoints(100);
    setLevelState('success');
  };

  const handleNextLevel = () => {
    goToLevel(2);
  };

  const handleRetry = () => {
    setLevelState('playing');
  };

  const levelInfo = {
    levelNumber: 1,
    levelName: 'THE ROACH MOTEL',
    tagline: 'Easy to check in, impossible to check out',
  };

  const feedbackProps = levelState !== 'playing' ? {
    state: levelState as 'success' | 'fail',
    successMessage: 'You found the hidden cancel link! +100 Points',
    failMessage: 'You clicked the shiny button. Classic mistake.',
    evilMessage: levelState === 'fail' 
      ? "Thanks for the donation! Your bank account just sent us a friend request."
      : "Hmph. You're smarter than you look. But this was just the warm-up...",
    patternName: 'ROACH MOTEL',
    patternDescription: levelState === 'fail'
      ? 'These designs make it very easy to sign up but intentionally difficult to cancel or leave. The cancel option is often hidden, uses guilt-tripping language, or requires multiple steps.'
      : 'These designs make it very easy to sign up but intentionally difficult to cancel or leave. You spotted the dark pattern! The "cancel" option was intentionally tiny and low-contrast.',
    onRetry: handleRetry,
    onNextLevel: handleNextLevel,
  } : undefined;

  return (
    <GameShell level={levelInfo} feedback={feedbackProps}>
      {levelState === 'playing' && (
        <RoachMotelCard
          onTrapClick={handleTrapClick}
          onSafeClick={handleSafeClick}
        />
      )}
    </GameShell>
  );
}
