import { useGame } from '@/contexts/GameContext';
import { LandingPage } from './LandingPage';
import { Level1RoachMotel } from './Level1RoachMotel';
import { Level2SneakIntoBasket } from './Level2SneakIntoBasket';
import { Level3Confirmshaming } from './Level3Confirmshaming';
import { Level4VisualInterference } from './Level4VisualInterference';

const Index = () => {
  const { currentLevel } = useGame();

  // Route based on current level
  if (currentLevel === 0) {
    return <LandingPage />;
  }

  if (currentLevel === 1) {
    return <Level1RoachMotel />;
  }

  if (currentLevel === 2) {
    return <Level2SneakIntoBasket />;
  }

  if (currentLevel === 3) {
    return <Level3Confirmshaming />;
  }

  if (currentLevel === 4) {
    return <Level4VisualInterference />;
  }

  // Fallback for other levels (not implemented yet)
  return <LandingPage />;
};

export default Index;
