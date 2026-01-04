import { ReactNode } from 'react';

interface PatternCardWrapperProps {
  children: ReactNode;
}

/**
 * PatternCardWrapper provides complete style isolation for dark pattern UIs.
 * Content inside this wrapper should NOT inherit game theme styling.
 * Each pattern card defines its own realistic product styling.
 */
export function PatternCardWrapper({ children }: PatternCardWrapperProps) {
  return (
    <div 
      className="pattern-card-isolation"
      style={{
        // Reset all inherited styles
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1a1a1a',
        lineHeight: 1.5,
      }}
    >
      {children}
    </div>
  );
}
