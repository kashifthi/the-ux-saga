import { useGame } from '@/contexts/GameContext';
import { LandingPage } from './LandingPage';
import { Level1RoachMotel } from './Level1RoachMotel';

const Index = () => {
  const { currentLevel } = useGame();

  // Route based on current level
  if (currentLevel === 0) {
    return <LandingPage />;
  }

  if (currentLevel === 1) {
    return <Level1RoachMotel />;
  }

  // Fallback for other levels (not implemented yet)
  return <LandingPage />;
};

export default Index;
