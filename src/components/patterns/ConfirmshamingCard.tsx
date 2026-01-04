import { useState } from 'react';
import { PatternCardWrapper } from './PatternCardWrapper';
import { X } from 'lucide-react';

interface ConfirmshamingCardProps {
  onAccept: () => void;
  onDecline: () => void;
}

/**
 * ConfirmshamingCard - A generic SaaS discount popup
 * Styled to look like a typical marketing popup with guilt-tripping decline copy.
 * Uses its own styling, completely isolated from game theme.
 */
export function ConfirmshamingCard({ onAccept, onDecline }: ConfirmshamingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PatternCardWrapper>
      <div
        style={{
          background: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          maxWidth: '420px',
          margin: '0 auto',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        {/* Header with close button */}
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '32px 24px',
            position: 'relative',
            textAlign: 'center',
          }}
        >
          <button
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.7)',
            }}
            onClick={onDecline}
          >
            <X size={16} />
          </button>
          
          <div
            style={{
              fontSize: '48px',
              marginBottom: '8px',
            }}
          >
            🎁
          </div>
          
          <h2
            style={{
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Unlock Savings?
          </h2>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: '#374151',
              fontSize: '16px',
              marginBottom: '8px',
              fontWeight: 500,
            }}
          >
            Get <span style={{ color: '#059669', fontWeight: 700 }}>10% OFF</span> your next purchase!
          </p>
          
          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              marginBottom: '24px',
            }}
          >
            Join our exclusive newsletter and never miss a deal.
          </p>

          {/* The trap button - vibrant and large */}
          <button
            onClick={onAccept}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              marginBottom: '16px',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Yes, I Want 10% Off! 🎉
          </button>

          {/* The safe path - shameful decline option */}
          <button
            onClick={onDecline}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9ca3af',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '8px',
              textDecoration: 'underline',
              lineHeight: 1.4,
            }}
          >
            No thanks, I prefer paying full price and being a poor decision-maker
          </button>

          {/* Hidden fine print - the actual trap */}
          <p
            style={{
              color: '#d1d5db',
              fontSize: '9px',
              marginTop: '20px',
              lineHeight: 1.3,
            }}
          >
            By clicking "Yes", you agree to subscribe to our Premium Insights Newsletter™ 
            at $20/month, billed automatically. Cancel anytime by mailing a notarized letter 
            to our headquarters in the Cayman Islands.
          </p>
        </div>
      </div>
    </PatternCardWrapper>
  );
}