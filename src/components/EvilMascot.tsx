import { Bot } from 'lucide-react';

interface EvilMascotProps {
  message?: string;
  variant?: 'evil' | 'success' | 'winner';
}

export function EvilMascot({ message, variant = 'evil' }: EvilMascotProps) {
  const getColors = () => {
    if (variant === 'winner') {
      return { 
        border: 'border-neon-gold', 
        text: 'text-neon-gold', 
        bg: 'bg-neon-gold', 
        glow: 'neon-gold-glow' 
      };
    }
    if (variant === 'success') {
      return { 
        border: 'border-neon-green', 
        text: 'text-neon-green', 
        bg: 'bg-neon-green', 
        glow: 'neon-green-glow' 
      };
    }
    return { 
      border: 'border-neon-red', 
      text: 'text-neon-red animate-pulse-evil', 
      bg: 'bg-neon-red', 
      glow: 'neon-red-glow' 
    };
  };

  const colors = getColors();
  
  return (
    <div className="flex flex-col items-center gap-4">
      {/* AI Mascot */}
      <div className="relative">
        <div className={`w-24 h-24 bg-secondary border-2 flex items-center justify-center ${colors.border}`}>
          <Bot className={`w-12 h-12 ${colors.text}`} />
        </div>
        {/* Glowing eyes effect */}
        <div className={`absolute top-6 left-5 w-3 h-3 rounded-full ${colors.bg} ${colors.glow}`} />
        <div className={`absolute top-6 right-5 w-3 h-3 rounded-full ${colors.bg} ${colors.glow}`} />
      </div>
      
      {/* Speech bubble */}
      {message && (
        <div className="evil-card p-4 max-w-md relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l-2 border-t-2 border-border rotate-45" />
          <p className="text-evil-text text-sm font-mono italic">
            "{message}"
          </p>
        </div>
      )}
    </div>
  );
}
