import { useGame } from '@/contexts/GameContext';
import { GameHUD } from '@/components/GameHUD';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function Level1Placeholder() {
  const { goToLevel } = useGame();

  return (
    <div className="min-h-screen bg-background">
      <GameHUD />
      
      <div className="pt-20 p-8 flex flex-col items-center justify-center min-h-screen">
        <div className="evil-card p-8 text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-mono font-bold text-foreground">
            LEVEL 1: ROACH MOTEL
          </h2>
          <p className="text-muted-foreground">
            [ Level not yet implemented ]
          </p>
          <p className="text-sm text-evil-text font-mono italic">
            "Coming soon... if you dare."
          </p>
          
          <Button
            onClick={() => goToLevel(0)}
            variant="outline"
            className="border-border hover:border-neon-red hover:text-neon-red"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Landing
          </Button>
        </div>
      </div>
    </div>
  );
}
