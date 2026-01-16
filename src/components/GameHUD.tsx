import { useGame } from '@/contexts/GameContext';
import { DollarSign, Target, AlertTriangle } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export function GameHUD() {
  const { points, moneyLost, mistakesCount } = useGame();
  const [moneyAnimation, setMoneyAnimation] = useState(false);
  const prevMoneyLost = useRef(moneyLost);

  // Trigger animation when moneyLost increases
  useEffect(() => {
    if (moneyLost > prevMoneyLost.current) {
      setMoneyAnimation(true);
      const timer = setTimeout(() => setMoneyAnimation(false), 600);
      prevMoneyLost.current = moneyLost;
      return () => clearTimeout(timer);
    }
  }, [moneyLost]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b-2 border-border backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="text-sm font-mono text-muted-foreground">
            THE DARK UX SAGA
          </div>
          
          <div className="flex items-center gap-6">
            {/* Points */}
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-neon-green" />
              <span className="font-mono text-neon-green neon-green-glow">
                {points} pts
              </span>
            </div>
            
            {/* Money Lost */}
            <div className={`flex items-center gap-2 transition-all ${
              moneyAnimation ? 'animate-shake scale-110' : ''
            }`}>
              <DollarSign className="w-4 h-4 text-neon-red" />
              <span className="font-mono text-neon-red neon-red-glow">
                -${moneyLost}
              </span>
            </div>
            
            {/* Mistakes */}
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono text-muted-foreground">
                {mistakesCount} mistakes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
