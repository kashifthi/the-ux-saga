import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameShell } from '@/components/GameShell';
import { SneakIntoBasketCard } from '@/components/patterns/SneakIntoBasketCard';

type LevelState = 'playing' | 'success' | 'fail';

export function Level2SneakIntoBasket() {
  const { addPoints, loseMoneyTrap, addMistake, goToLevel } = useGame();
  const [levelState, setLevelState] = useState<LevelState>('playing');
  const [moneyLostThisLevel, setMoneyLostThisLevel] = useState(0);

  const handlePurchaseWithTrap = () => {
    loseMoneyTrap(50);
    addMistake();
    setMoneyLostThisLevel(50);
    setLevelState('fail');
  };

  const handlePurchaseClean = () => {
    addPoints(100);
    setLevelState('success');
  };

  const handleNextLevel = () => {
    goToLevel(3);
  };

  const handleRetry = () => {
    setLevelState('playing');
    setMoneyLostThisLevel(0);
  };

  const levelInfo = {
    levelNumber: 2,
    levelName: 'SNEAK INTO BASKET',
    tagline: 'What you see is definitely not what you get',
  };

  const feedbackProps = levelState !== 'playing' ? {
    state: levelState as 'success' | 'fail',
    successMessage: 'You found and removed the sneaky add-on! +100 Points',
    failMessage: `You paid $${moneyLostThisLevel} extra for a hidden item you never wanted!`,
    evilMessage: levelState === 'fail' 
      ? "Oops! You just bought insurance for a T-shirt. How responsible of you!"
      : "You actually read the checkout? Who does that?! Fine, you win this round...",
    patternName: 'SNEAK INTO BASKET',
    patternDescription: levelState === 'fail'
      ? 'This occurs when a site adds an additional item to your cart, often through an opt-out checkbox or hidden toggle during checkout. The removal option is intentionally obscured or difficult to find.'
      : 'This occurs when a site adds an additional item to your cart, often through an opt-out checkbox or hidden toggle during checkout. You spotted the trick! Always review your cart before purchasing.',
    onRetry: handleRetry,
    onNextLevel: handleNextLevel,
  } : undefined;

  return (
    <GameShell level={levelInfo} feedback={feedbackProps}>
      {levelState === 'playing' && (
        <SneakIntoBasketCard
          onPurchaseWithTrap={handlePurchaseWithTrap}
          onPurchaseClean={handlePurchaseClean}
        />
      )}
    </GameShell>
  );
}
