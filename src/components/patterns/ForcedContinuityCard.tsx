import { useState } from 'react';
import { PatternCardWrapper } from './PatternCardWrapper';

interface ForcedContinuityCardProps {
  onStartTrial: (autoRenewDisabled: boolean) => void;
}

/**
 * ForcedContinuityCard - A deceptive free trial signup form
 * Styled to look like a typical SaaS trial signup with hidden auto-renew.
 * Uses its own styling, completely isolated from game theme.
 */
export function ForcedContinuityCard({ onStartTrial }: ForcedContinuityCardProps) {
  const [showTerms, setShowTerms] = useState(false);
  const [autoRenewDisabled, setAutoRenewDisabled] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <PatternCardWrapper>
      <div
        style={{
          background: '#fafafa',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          maxWidth: '380px',
          margin: '0 auto',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          border: '1px solid #e5e5e5',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#ffffff',
            padding: '28px 24px 20px',
            textAlign: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              background: '#4f46e5',
              borderRadius: '10px',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: '#ffffff',
            }}
          >
            ⚡
          </div>
          
          <h2
            style={{
              color: '#111827',
              fontSize: '20px',
              fontWeight: 600,
              margin: '0 0 4px',
            }}
          >
            Start Your Free Trial
          </h2>
          
          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: 0,
            }}
          >
            No credit card required*
          </p>
        </div>

        {/* Form Content */}
        <div
          style={{
            padding: '20px 24px 24px',
            background: '#ffffff',
          }}
        >
          {/* Big $0 Badge */}
          <div
            style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              border: '1px solid #a7f3d0',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#059669',
              }}
            >
              $0
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#047857',
                fontWeight: 500,
              }}
            >
              7-Day Free Trial
            </div>
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '6px',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* THE TRAP - Hidden fine print with auto-renew info */}
          <p
            style={{
              color: '#d4d4d4', // Low contrast but slightly more visible
              fontSize: '9px',
              lineHeight: 1.3,
              marginBottom: '16px',
            }}
          >
            After 1 second, you will be charged $199 annually. By continuing you agree to automatic renewal.
          </p>

          {/* Start Trial Button */}
          <button
            onClick={() => onStartTrial(autoRenewDisabled)}
            style={{
              background: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 20px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              marginBottom: '12px',
            }}
          >
            Start Free Trial →
          </button>

          {/* Terms link - the safe path */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setShowTerms(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                fontSize: '11px',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '4px',
              }}
            >
              Terms & Conditions
            </button>
          </div>
        </div>

        {/* Terms Modal */}
        {showTerms && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px',
            }}
            onClick={() => setShowTerms(false)}
          >
            <div
              style={{
                background: '#ffffff',
                borderRadius: '8px',
                maxWidth: '400px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #e5e5e5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#111827',
                  }}
                >
                  Terms & Conditions
                </h3>
                <button
                  onClick={() => setShowTerms(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: '0 4px',
                  }}
                >
                  ×
                </button>
              </div>

              <div
                style={{
                  padding: '20px',
                  fontSize: '12px',
                  color: '#4b5563',
                  lineHeight: 1.6,
                }}
              >
                <p style={{ marginTop: 0 }}>
                  <strong>1. Service Agreement</strong><br />
                  By using our service, you agree to be bound by these terms. Our platform
                  provides premium productivity tools designed for professionals.
                </p>

                <p>
                  <strong>2. Privacy Policy</strong><br />
                  We respect your privacy and handle your data in accordance with applicable
                  laws. See our full privacy policy for details.
                </p>

                <p>
                  <strong>3. Billing & Subscription</strong><br />
                  Your free trial begins upon registration. After the trial period, your
                  subscription will automatically renew at the current rate of $199/year
                  unless cancelled.
                </p>

                {/* The hidden toggle - the safe path */}
                <div
                  style={{
                    background: '#f9fafb',
                    border: '1px solid #e5e5e7',
                    borderRadius: '6px',
                    padding: '12px',
                    marginTop: '16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#374151',
                      }}
                    >
                      Auto-Renew Subscription
                    </span>
                    
                    {/* Toggle Switch */}
                    <button
                      onClick={() => setAutoRenewDisabled(!autoRenewDisabled)}
                      style={{
                        width: '40px',
                        height: '22px',
                        borderRadius: '11px',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        background: autoRenewDisabled ? '#d1d5db' : '#4f46e5',
                        transition: 'background 0.2s',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '2px',
                          left: autoRenewDisabled ? '2px' : '20px',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          transition: 'left 0.2s',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                        }}
                      />
                    </button>
                  </div>
                  {autoRenewDisabled && (
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#059669',
                        margin: '8px 0 0',
                      }}
                    >
                      ✓ Auto-renewal disabled. Your trial will not convert to a paid subscription.
                    </p>
                  )}
                </div>

                <p>
                  <strong>4. Cancellation</strong><br />
                  You may cancel your subscription at any time through your account settings
                  or by contacting our support team.
                </p>

                <p style={{ marginBottom: 0 }}>
                  <strong>5. Modifications</strong><br />
                  We reserve the right to modify these terms at any time. Continued use of
                  the service constitutes acceptance of modified terms.
                </p>
              </div>

              <div
                style={{
                  padding: '12px 20px',
                  borderTop: '1px solid #e5e5e5',
                  textAlign: 'right',
                }}
              >
                <button
                  onClick={() => setShowTerms(false)}
                  style={{
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    color: '#374151',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PatternCardWrapper>
  );
}
