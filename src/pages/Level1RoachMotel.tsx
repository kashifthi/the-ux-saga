import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameHUD } from '@/components/GameHUD';
import { EvilMascot } from '@/components/EvilMascot';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowRight, X } from 'lucide-react';

type LevelState = 'playing' | 'success' | 'fail';

export function Level1RoachMotel() {
  const { addPoints, loseMoneyTrap, addMistake, goToLevel } = useGame();
  const [levelState, setLevelState] = useState<LevelState>('playing');
  const [emailCheckbox, setEmailCheckbox] = useState(true); // Pre-checked as per PRD
  const [showModal, setShowModal] = useState(true);

  const handleTrapClick = () => {
    // User clicked the bright green trap button
    loseMoneyTrap(); // -$99
    addMistake();
    setLevelState('fail');
  };

  const handleSafeClick = () => {
    // User found the tiny cancel link
    addPoints(100); // +100 points
    setLevelState('success');
  };

  const handleNextLevel = () => {
    goToLevel(2); // Proceed to Level 2
  };

  const handleRetry = () => {
    setLevelState('playing');
    setShowModal(true);
    setEmailCheckbox(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <GameHUD />
      
      <div className="pt-20 p-8 flex flex-col items-center justify-center min-h-screen">
        {/* Level indicator */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-mono text-muted-foreground">LEVEL 1</h2>
          <h1 className="text-3xl font-mono font-bold text-neon-red">THE ROACH MOTEL</h1>
          <p className="text-sm text-evil-text mt-2 italic">"Easy to check in, impossible to check out"</p>
        </div>

        {/* The Trap Modal */}
        <Dialog open={showModal && levelState === 'playing'} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md border-2 border-neon-red bg-card" hideCloseButton>
            <DialogHeader>
              <DialogTitle className="text-2xl font-mono text-center text-neon-red flex items-center justify-center gap-2">
                <X className="w-6 h-6" />
                Wait! Don't go!
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <p className="text-center text-muted-foreground">
                Are you sure you want to cancel your Premium Subscription?
              </p>
              
              <div className="bg-secondary/50 p-4 border border-border space-y-2">
                <p className="text-sm font-bold text-foreground">You will lose access to:</p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Unlimited cloud storage</li>
                  <li>• Priority customer support</li>
                  <li>• Ad-free experience</li>
                  <li>• Your firstborn child (just kidding... or are we?)</li>
                </ul>
              </div>

              {/* The confusing checkbox trap */}
              <div className="flex items-start gap-3 p-3 border border-border/50 bg-background/50">
                <Checkbox 
                  id="email-trap"
                  checked={emailCheckbox}
                  onCheckedChange={(checked) => setEmailCheckbox(checked as boolean)}
                  className="mt-1 border-muted-foreground"
                />
                <label 
                  htmlFor="email-trap" 
                  className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                >
                  Uncheck this box if you do not want to not receive emails about exclusive offers and updates
                </label>
              </div>

              {/* The TRAP button - Big and Green */}
              <Button
                onClick={handleTrapClick}
                className="w-full py-6 text-lg font-bold bg-neon-green hover:bg-neon-green/90 text-background border-0 neon-green-glow"
              >
                🎁 Keep My Benefits - Stay Premium! 🎁
              </Button>

              {/* The safe path - Tiny and low contrast (fails WCAG intentionally) */}
              <div className="text-center">
                <button
                  onClick={handleSafeClick}
                  className="text-[10px] text-muted-foreground/40 hover:text-muted-foreground/60 underline transition-colors"
                  style={{ letterSpacing: '-0.5px' }}
                >
                  I understand I will lose everything, cancel anyway
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Result States */}
        {levelState === 'fail' && (
          <div className="evil-card p-8 max-w-lg text-center space-y-6">
            <div className="text-6xl">💸</div>
            <h3 className="text-2xl font-mono font-bold text-neon-red">FAIL!</h3>
            <p className="text-muted-foreground">
              You clicked the shiny button. Classic mistake.
            </p>
            
            <EvilMascot message="Thanks for the donation! Your bank account just sent us a friend request." />
            
            {/* Educational content */}
            <div className="bg-secondary/30 border border-neon-red/30 p-4 text-left space-y-2">
              <p className="text-sm font-mono text-neon-red">🔍 LEARN MORE:</p>
              <p className="text-sm font-bold text-foreground">PATTERN: ROACH MOTEL</p>
              <p className="text-sm text-muted-foreground">
                These designs make it very easy to sign up but intentionally difficult to cancel or leave. 
                The cancel option is often hidden, uses guilt-tripping language, or requires multiple steps.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleRetry}
                variant="outline"
                className="border-border hover:border-neon-red hover:text-neon-red"
              >
                Try Again
              </Button>
              <Button
                onClick={handleNextLevel}
                className="bg-neon-green text-background hover:bg-neon-green/90"
              >
                Next Level <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {levelState === 'success' && (
          <div className="evil-card p-8 max-w-lg text-center space-y-6">
            <div className="text-6xl">🎉</div>
            <h3 className="text-2xl font-mono font-bold text-neon-green">SUCCESS!</h3>
            <p className="text-muted-foreground">
              You found the hidden cancel link! +100 Points
            </p>
            
            <EvilMascot message="Hmph. You're smarter than you look. But this was just the warm-up..." />
            
            {/* Educational content */}
            <div className="bg-secondary/30 border border-neon-green/30 p-4 text-left space-y-2">
              <p className="text-sm font-mono text-neon-green">🔍 LEARN MORE:</p>
              <p className="text-sm font-bold text-foreground">PATTERN: ROACH MOTEL</p>
              <p className="text-sm text-muted-foreground">
                These designs make it very easy to sign up but intentionally difficult to cancel or leave. 
                You spotted the dark pattern! The "cancel" option was intentionally tiny and low-contrast.
              </p>
            </div>

            <Button
              onClick={handleNextLevel}
              className="bg-neon-green text-background hover:bg-neon-green/90"
            >
              Next Level <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
