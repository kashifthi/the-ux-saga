import { useGame } from '@/contexts/GameContext';
import { EvilMascot } from '@/components/EvilMascot';
import { Button } from '@/components/ui/button';
import { Skull } from 'lucide-react';

export function LandingPage() {
  const { startGame } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      {/* Decorative grid lines */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl text-center">
        {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Skull className="w-8 h-8 text-neon-red" />
            <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-tight text-foreground">
              THE DARK UX SAGA
            </h1>
            <Skull className="w-8 h-8 text-neon-red" />
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-neon-red to-transparent" />
        </div>

        {/* Evil AI Mascot */}
        <EvilMascot message="Oh, you think you're smart? Let's see how long your wallet survives..." />

        {/* Welcome Text */}
        <div className="evil-card p-6 space-y-4">
          <p className="text-lg md:text-xl text-foreground font-mono">
            Welcome to the Dark UX Saga.
          </p>
          <p className="text-lg md:text-xl text-neon-red font-mono neon-red-glow">
            Can you survive without losing your money?
          </p>
          <p className="text-sm text-muted-foreground">
            Navigate through 5 levels of manipulative design patterns. 
            Spot the dark patterns to earn points. Fall for the traps and lose virtual cash.
          </p>
        </div>

        {/* Start Button */}
        <Button
          onClick={startGame}
          size="lg"
          className="bg-neon-green hover:bg-neon-green/80 text-background font-mono text-lg px-8 py-6 border-2 border-neon-green transition-all hover:shadow-[0_0_20px_hsl(var(--neon-green))]"
        >
          START GAME
        </Button>

        {/* Warning text */}
        <p className="text-xs text-muted-foreground font-mono animate-pulse-evil">
          [ Warning: This game contains extremely manipulative design patterns ]
        </p>
      </div>
    </div>
  );
}
