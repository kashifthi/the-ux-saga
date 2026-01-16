import { useGame } from '@/contexts/GameContext';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { EvilMascot } from '@/components/EvilMascot';
import { Confetti } from '@/components/Confetti';
import { Trophy, Skull, DollarSign, Target, RotateCcw } from 'lucide-react';

const TOTAL_LEVELS = 5;
const HIGH_SCORE_KEY = 'dark-patterns-high-score';

interface HighScore {
  gullibilityScore: number;
  moneyLost: number;
  points: number;
  date: string;
}

export function FinalScoreboard() {
  const { points, moneyLost, mistakesCount, resetGame, goToLevel } = useGame();
  const [highScore, setHighScore] = useState<HighScore | null>(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const gullibilityScore = Math.round((mistakesCount / TOTAL_LEVELS) * 100);

  const getRanking = () => {
    if (gullibilityScore === 0) return { title: 'Pattern Master', emoji: '🏆', color: 'text-yellow-400' };
    if (gullibilityScore <= 40) return { title: 'Cautious Surfer', emoji: '🛡️', color: 'text-blue-400' };
    return { title: 'Corporate Dream', emoji: '💸', color: 'text-red-400' };
  };

  const ranking = getRanking();

  useEffect(() => {
    // Load existing high score
    const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    const existingHighScore: HighScore | null = savedHighScore ? JSON.parse(savedHighScore) : null;
    setHighScore(existingHighScore);

    // Check if current score is a new high score (lower gullibility is better)
    const currentScore: HighScore = {
      gullibilityScore,
      moneyLost,
      points,
      date: new Date().toISOString(),
    };

    if (!existingHighScore || gullibilityScore < existingHighScore.gullibilityScore) {
      localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(currentScore));
      setHighScore(currentScore);
      setIsNewHighScore(true);
    }
  }, [gullibilityScore, moneyLost, points]);

  const handleTryAgain = () => {
    resetGame();
    goToLevel(0);
  };

  const getEvilMessage = () => {
    if (gullibilityScore === 0) {
      return "Impossible! You saw through ALL my tricks? Fine. You win this round, human. But I'll be back with darker patterns...";
    }
    if (gullibilityScore <= 40) {
      return "Not bad, not bad. You only fell for a few traps. But imagine how much data we harvested from you in that short time...";
    }
    return "MAGNIFICENT! You clicked on everything! You're every product manager's dream user. We've already sold your data to 47 advertisers!";
  };

  const isPatternMaster = gullibilityScore === 0;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Gold confetti for Pattern Master */}
      <Confetti active={isPatternMaster} color="gold" />
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative z-10 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2 flex items-center justify-center gap-3">
            <Skull className="w-10 h-10 text-destructive" />
            GAME OVER
            <Skull className="w-10 h-10 text-destructive" />
          </h1>
          {isNewHighScore && (
            <div className="inline-block bg-yellow-500/20 border border-yellow-500/50 rounded-full px-4 py-1 mt-2">
              <span className="text-yellow-400 font-bold animate-pulse">🎉 NEW HIGH SCORE!</span>
            </div>
          )}
        </div>

        {/* Main Score Card */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 mb-6 shadow-2xl">
          {/* Ranking */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-2">{ranking.emoji}</div>
            <h2 className={`text-3xl md:text-4xl font-black ${ranking.color}`}>
              {ranking.title}
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Gullibility Score */}
            <div className="bg-background/50 rounded-xl p-4 text-center border border-border">
              <Target className="w-8 h-8 mx-auto mb-2 text-destructive" />
              <div className="text-3xl font-black text-foreground">{gullibilityScore}%</div>
              <div className="text-sm text-muted-foreground">Gullibility Score</div>
            </div>

            {/* Money Lost */}
            <div className="bg-background/50 rounded-xl p-4 text-center border border-border">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-3xl font-black text-red-500">${moneyLost}</div>
              <div className="text-sm text-muted-foreground">Donated to Evil AI</div>
            </div>

            {/* Points */}
            <div className="bg-background/50 rounded-xl p-4 text-center border border-border">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-3xl font-black text-yellow-500">{points}</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
          </div>

          {/* Mistakes Summary */}
          <div className="text-center mb-6 p-4 bg-background/30 rounded-lg border border-border">
            <p className="text-muted-foreground">
              You fell for <span className="text-destructive font-bold">{mistakesCount}</span> out of <span className="font-bold">{TOTAL_LEVELS}</span> dark patterns
            </p>
          </div>

          {/* Previous High Score */}
          {highScore && !isNewHighScore && (
            <div className="text-center mb-6 text-sm text-muted-foreground">
              <p>Your best: {highScore.gullibilityScore}% gullibility (${highScore.moneyLost} lost)</p>
            </div>
          )}

          {/* Try Again Button */}
          <Button
            onClick={handleTryAgain}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 group"
          >
            <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Try to Do Better
          </Button>
        </div>

        {/* Evil AI Message */}
        <div className="flex items-start gap-4">
          <EvilMascot variant={isPatternMaster ? 'winner' : 'evil'} />
          <div className={`flex-1 rounded-lg p-4 ${
            isPatternMaster 
              ? 'bg-neon-gold/10 border border-neon-gold/30' 
              : 'bg-destructive/10 border border-destructive/30'
          }`}>
            <p className={`font-medium italic ${
              isPatternMaster ? 'text-neon-gold' : 'text-destructive'
            }`}>
              "{getEvilMessage()}"
            </p>
          </div>
        </div>

        {/* Educational Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <strong>Remember:</strong> These patterns are used by real companies every day.
          </p>
          <p>
            Now that you can spot them, help others see through the tricks too! 🛡️
          </p>
        </div>
      </div>
    </div>
  );
}
