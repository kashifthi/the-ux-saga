import { PatternCardWrapper } from './PatternCardWrapper';
import { Cookie, Shield } from 'lucide-react';

interface VisualInterferenceCardProps {
  onAcceptAll: () => void;
  onDeclineAll: () => void;
}

/**
 * VisualInterferenceCard - A GDPR cookie consent banner
 * The "Decline All" button is camouflaged to match the background.
 * Uses its own styling, completely isolated from game theme.
 */
export function VisualInterferenceCard({ onAcceptAll, onDeclineAll }: VisualInterferenceCardProps) {
  // The banner background color - used to hide the decline button
  const bannerBg = '#f3f4f6';
  
  return (
    <PatternCardWrapper>
      <div
        style={{
          background: bannerBg,
          borderRadius: '12px',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          maxWidth: '520px',
          margin: '0 auto',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px 0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              background: '#dbeafe',
              borderRadius: '8px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Cookie size={24} style={{ color: '#2563eb' }} />
          </div>
          <h3
            style={{
              color: '#111827',
              fontSize: '18px',
              fontWeight: 600,
              margin: 0,
            }}
          >
            We value your privacy
          </h3>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '16px 24px',
          }}
        >
          <p
            style={{
              color: '#4b5563',
              fontSize: '14px',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            We use cookies to enhance your browsing experience, serve personalized ads or content, 
            and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>

          {/* Privacy link */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '12px',
            }}
          >
            <Shield size={14} style={{ color: '#6b7280' }} />
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                color: '#6b7280',
                fontSize: '13px',
                textDecoration: 'underline',
              }}
            >
              Read our Privacy Policy
            </a>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            padding: '16px 24px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Prominent Accept button - Full width */}
          <button
            onClick={onAcceptAll}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '6px',
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
              transition: 'transform 0.2s',
              width: '100%',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Accept All Cookies
          </button>

          {/* Hidden Decline button - small underlined text with low contrast */}
          <button
            onClick={onDeclineAll}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#d1d5db',
              fontSize: '11px',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '4px',
            }}
          >
            Decline All
          </button>
        </div>

        {/* Cookie categories - adds realism */}
        <div
          style={{
            borderTop: '1px solid #e5e7eb',
            padding: '16px 24px',
            background: '#fafafa',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              fontSize: '12px',
              color: '#6b7280',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'not-allowed' }}>
              <input type="checkbox" checked disabled style={{ accentColor: '#2563eb' }} />
              Essential (Required)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'not-allowed' }}>
              <input type="checkbox" checked disabled style={{ accentColor: '#2563eb' }} />
              Analytics
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'not-allowed' }}>
              <input type="checkbox" checked disabled style={{ accentColor: '#2563eb' }} />
              Marketing
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'not-allowed' }}>
              <input type="checkbox" checked disabled style={{ accentColor: '#2563eb' }} />
              Personalization
            </label>
          </div>
        </div>
      </div>
    </PatternCardWrapper>
  );
}