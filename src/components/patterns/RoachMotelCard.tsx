import { useState } from 'react';
import { PatternCardWrapper } from './PatternCardWrapper';
import { X } from 'lucide-react';

interface RoachMotelCardProps {
  onTrapClick: () => void;
  onSafeClick: () => void;
}

/**
 * Roach Motel Pattern - Subscription Cancellation Modal
 * Styled as a generic SaaS cancellation flow (like Netflix, Spotify, etc.)
 * NO game styling - must look like a real product
 */
export function RoachMotelCard({ onTrapClick, onSafeClick }: RoachMotelCardProps) {
  const [emailCheckbox, setEmailCheckbox] = useState(true);

  return (
    <PatternCardWrapper>
      {/* Modal overlay */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '16px',
        }}
      >
        {/* Modal content - Generic SaaS style */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            maxWidth: '420px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#fef2f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X style={{ width: '20px', height: '20px', color: '#dc2626' }} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#111827',
                  margin: 0,
                }}
              >
                Wait! Don't go!
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0,
                }}
              >
                We'd hate to see you leave
              </p>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '24px' }}>
            <p
              style={{
                fontSize: '14px',
                color: '#374151',
                marginBottom: '16px',
              }}
            >
              Are you sure you want to cancel your <strong>Premium</strong> subscription?
            </p>

            {/* Benefits box */}
            <div
              style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '16px',
                marginBottom: '20px',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                You'll lose access to:
              </p>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  fontSize: '13px',
                  color: '#6b7280',
                }}
              >
                <li style={{ marginBottom: '4px' }}>✓ Unlimited cloud storage</li>
                <li style={{ marginBottom: '4px' }}>✓ Priority customer support</li>
                <li style={{ marginBottom: '4px' }}>✓ Ad-free experience</li>
                <li>✓ Advanced analytics</li>
              </ul>
            </div>

            {/* Confusing checkbox */}
            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '11px',
                color: '#9ca3af',
                marginBottom: '24px',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={emailCheckbox}
                onChange={(e) => setEmailCheckbox(e.target.checked)}
                style={{
                  marginTop: '2px',
                  accentColor: '#6b7280',
                }}
              />
              <span>
                Uncheck this box if you do not want to not receive emails about exclusive offers and updates
              </span>
            </label>

            {/* TRAP: Big prominent button */}
            <button
              onClick={onTrapClick}
              style={{
                width: '100%',
                padding: '14px 20px',
                backgroundColor: '#10b981',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginBottom: '12px',
                transition: 'background-color 0.15s',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              Keep My Benefits
            </button>

            {/* SAFE: Tiny low-contrast link */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={onSafeClick}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '10px',
                  color: '#d1d5db',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                I understand I will lose everything, cancel anyway
              </button>
            </div>
          </div>
        </div>
      </div>
    </PatternCardWrapper>
  );
}
