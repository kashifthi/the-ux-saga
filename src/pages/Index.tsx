import { useGame } from '@/contexts/GameContext';
import { LandingPage } from './LandingPage';
import { Level1RoachMotel } from './Level1RoachMotel';
import { Level2SneakIntoBasket } from './Level2SneakIntoBasket';
import { Level3Confirmshaming } from './Level3Confirmshaming';
import { Level4VisualInterference } from './Level4VisualInterference';
import { Level5ForcedContinuity } from './Level5ForcedContinuity';
import { FinalScoreboard } from './FinalScoreboard';

const Index = () => {
  const { currentLevel } = useGame();

  if (currentLevel === 0) return <LandingPage />;
  if (currentLevel === 1) return <Level1RoachMotel />;
  if (currentLevel === 2) return <Level2SneakIntoBasket />;
  if (currentLevel === 3) return <Level3Confirmshaming />;
  if (currentLevel === 4) return <Level4VisualInterference />;
  if (currentLevel === 5) return <Level5ForcedContinuity />;
  if (currentLevel >= 6) return <FinalScoreboard />;

  return <LandingPage />;
};

export default Index;
