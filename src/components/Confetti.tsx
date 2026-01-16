import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

interface ConfettiProps {
  active: boolean;
}

export function Confetti({ active }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random(),
        size: 4 + Math.random() * 8,
      }));
      setParticles(newParticles);
    }
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-neon-green animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 6px hsl(var(--neon-green)), 0 0 12px hsl(var(--neon-green))',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
