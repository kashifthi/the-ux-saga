import { ReactNode } from 'react';
import { GameHUD } from '@/components/GameHUD';
import { EvilMascot } from '@/components/EvilMascot';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface LevelInfo {
  levelNumber: number;
  levelName: string;
  tagline: string;
}

interface FeedbackProps {
  state: 'success' | 'fail';
  successMessage: string;
  failMessage: string;
  evilMessage: string;
  patternName: string;
  patternDescription: string;
  onRetry: () => void;
  onNextLevel: () => void;
  extraFailInfo?: string;
}

interface GameShellProps {
  level: LevelInfo;
  children?: ReactNode;
  feedback?: FeedbackProps;
}

export function GameShell({ level, children, feedback }: GameShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <GameHUD />
      
      <div className="pt-20 p-8 flex flex-col items-center justify-center min-h-screen">
        {/* Level indicator - always shown */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-mono text-muted-foreground">LEVEL {level.levelNumber}</h2>
          <h1 className="text-3xl font-mono font-bold text-foreground">{level.levelName}</h1>
          {!feedback && (
            <p className="text-sm text-evil-text mt-2 italic">"{level.tagline}"</p>
          )}
        </div>

        {/* Pattern Card Container - Isolated from game theme */}
        {!feedback && (
          <div className="w-full max-w-lg">
            {children}
          </div>
        )}

        {/* Feedback - shown after interaction */}
        {feedback && (
          <div className="evil-card p-8 max-w-lg w-full text-center space-y-6">
            <div className="text-6xl">
              {feedback.state === 'fail' ? '💸' : '🎉'}
            </div>
            <h3 className={`text-2xl font-mono font-bold ${
              feedback.state === 'fail' ? 'text-neon-red' : 'text-neon-green'
            }`}>
              {feedback.state === 'fail' ? 'FAIL!' : 'SUCCESS!'}
            </h3>
            <p className="text-muted-foreground">
              {feedback.state === 'fail' ? feedback.failMessage : feedback.successMessage}
            </p>
            
            <EvilMascot message={feedback.evilMessage} variant={feedback.state === 'success' ? 'success' : 'evil'} />
            
            {/* Educational content */}
            <div className={`bg-secondary/30 border p-4 text-left space-y-2 ${
              feedback.state === 'fail' ? 'border-neon-red/30' : 'border-neon-green/30'
            }`}>
              <p className={`text-sm font-mono ${
                feedback.state === 'fail' ? 'text-neon-red' : 'text-neon-green'
              }`}>🔍 LEARN MORE:</p>
              <p className="text-sm font-bold text-foreground">PATTERN: {feedback.patternName}</p>
              <p className="text-sm text-muted-foreground">
                {feedback.patternDescription}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              {feedback.state === 'fail' && (
                <Button
                  onClick={feedback.onRetry}
                  variant="outline"
                  className="border-border hover:border-neon-red hover:text-neon-red h-10"
                >
                  Try Again
                </Button>
              )}
              <Button
                onClick={feedback.onNextLevel}
                className="bg-neon-green text-background hover:bg-neon-green/90 h-10"
              >
                Next Level <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
