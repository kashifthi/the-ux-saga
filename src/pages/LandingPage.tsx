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
        <EvilMascot message="I've designed 5 perfect traps. No one escapes my dark patterns..." />

        {/* Welcome Text */}
        <div className="evil-card p-6 space-y-4 max-w-lg w-full">
          <p className="text-lg md:text-xl text-foreground font-mono">
            Welcome, brave user.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-neon-red font-semibold">"Dark patterns"</span> are sneaky design tricks that websites use to manipulate you 
            into doing things you didn't intend — like subscribing, paying, or giving away your data.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">This is a simulation.</span> We'll show you 5 real manipulation tactics, and track 
            what they would cost you in real life.
          </p>
          <div className="border-t border-border pt-3 mt-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">How it works:</p>
            <div className="flex flex-col gap-1 text-sm font-mono">
              <p className="text-neon-green">✓ Spot the hidden trick → You escape unharmed (+100 pts)</p>
              <p className="text-neon-red">✗ Fall for the trap → See what it would have cost you ($$$)</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pt-2">
            At the end, we'll reveal your <span className="text-foreground">"Gullibility Score"</span> and how much 
            you would have "donated" to shady companies.
          </p>
          <p className="text-base text-foreground font-mono pt-2">
            Ready to test your defenses?
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
