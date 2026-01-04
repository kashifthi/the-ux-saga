import { Bot } from 'lucide-react';

interface EvilMascotProps {
  message?: string;
}

export function EvilMascot({ message }: EvilMascotProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Evil AI Mascot Placeholder */}
      <div className="relative">
        <div className="w-24 h-24 bg-secondary border-2 border-neon-red flex items-center justify-center">
          <Bot className="w-12 h-12 text-neon-red animate-pulse-evil" />
        </div>
        {/* Glowing eyes effect */}
        <div className="absolute top-6 left-5 w-3 h-3 bg-neon-red rounded-full neon-red-glow" />
        <div className="absolute top-6 right-5 w-3 h-3 bg-neon-red rounded-full neon-red-glow" />
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
