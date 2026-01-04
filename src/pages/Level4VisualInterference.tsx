import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameShell } from '@/components/GameShell';
import { VisualInterferenceCard } from '@/components/patterns/VisualInterferenceCard';

type LevelState = 'playing' | 'success' | 'fail';

export function Level4VisualInterference() {
  const { addPoints, addMistake, goToLevel } = useGame();
  const [levelState, setLevelState] = useState<LevelState>('playing');

  const handleAcceptAll = () => {
    // Trap: Clicking "Accept All" gives away all privacy
    addMistake();
    setLevelState('fail');
  };

  const handleDeclineAll = () => {
    // Success: Finding the hidden "Decline All" button
    addPoints(100);
    setLevelState('success');
  };

  const handleNextLevel = () => {
    goToLevel(5);
  };

  const handleRetry = () => {
    setLevelState('playing');
  };

  const levelInfo = {
    levelNumber: 4,
    levelName: 'VISUAL INTERFERENCE',
    tagline: 'Now you see it... actually, no you don\'t',
  };

  const feedbackProps = levelState !== 'playing' ? {
    state: levelState as 'success' | 'fail',
    successMessage: 'You found the invisible button! Your privacy is saved. +100 Points',
    failMessage: 'You just gave away all your browsing data to 847 "trusted partners"!',
    evilMessage: levelState === 'fail' 
      ? "You can't see it? That sounds like a 'you' problem. We see your data just fine!"
      : "How did you even find that?! We spent hours making it invisible. Curse your keen eyes!",
    patternName: 'VISUAL INTERFERENCE',
    patternDescription: levelState === 'fail'
      ? 'This is when the UI intentionally hides or disguises an option to steer the user toward a choice the company prefers. The "Decline" button was the same color as the background!'
      : 'This is when the UI intentionally hides or disguises an option to steer the user toward a choice the company prefers. You spotted the camouflaged button!',
    onRetry: handleRetry,
    onNextLevel: handleNextLevel,
  } : undefined;

  return (
    <GameShell level={levelInfo} feedback={feedbackProps}>
      {levelState === 'playing' && (
        <VisualInterferenceCard
          onAcceptAll={handleAcceptAll}
          onDeclineAll={handleDeclineAll}
        />
      )}
    </GameShell>
  );
}