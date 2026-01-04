import { useGame } from '@/contexts/GameContext';
import { LandingPage } from './LandingPage';
import { Level1Placeholder } from './Level1Placeholder';

const Index = () => {
  const { currentLevel } = useGame();

  // Route based on current level
  if (currentLevel === 0) {
    return <LandingPage />;
  }

  if (currentLevel === 1) {
    return <Level1Placeholder />;
  }

  // Fallback for other levels (not implemented yet)
  return <LandingPage />;
};

export default Index;
