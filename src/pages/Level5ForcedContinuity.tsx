import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameShell } from '@/components/GameShell';
import { ForcedContinuityCard } from '@/components/patterns/ForcedContinuityCard';

type FeedbackState = 'playing' | 'success' | 'fail';

export function Level5ForcedContinuity() {
  const { addPoints, loseMoneyTrap, addMistake, goToLevel } = useGame();
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('playing');

  const handleStartTrial = (autoRenewDisabled: boolean) => {
    if (autoRenewDisabled) {
      // Success - user found and disabled auto-renew
      addPoints(100);
      setFeedbackState('success');
    } else {
      // Fail - clicked without disabling auto-renew
      loseMoneyTrap(199);
      addMistake();
      setFeedbackState('fail');
    }
  };

  const handleRetry = () => {
    setFeedbackState('playing');
  };

  const handleNextLevel = () => {
    goToLevel(6); // Will go to end screen or next level when implemented
  };

  const levelInfo = {
    levelNumber: 5,
    levelName: 'Forced Continuity',
    tagline: 'Find the hidden trap before it finds your wallet',
  };

  if (feedbackState === 'playing') {
    return (
      <GameShell level={levelInfo}>
        <ForcedContinuityCard onStartTrial={handleStartTrial} />
      </GameShell>
    );
  }

  const feedbackProps = {
    state: feedbackState,
    successMessage: "You found it! The auto-renew toggle was hiding in the Terms.",
    failMessage: "Gotcha! $199 charged. The trap was in the Terms & Conditions.",
    evilMessage: "A trial is just a subscription that hasn't started billing yet. Welcome to the family!",
    patternName: "FORCED CONTINUITY",
    patternDescription: "This trap starts with a free trial but makes it nearly impossible to stop the automatic transition into a paid subscription without prior notice.",
    onRetry: handleRetry,
    onNextLevel: handleNextLevel,
  };

  return <GameShell level={levelInfo} feedback={feedbackProps} />;
}
