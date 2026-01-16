import { useState } from 'react';
import { PatternCardWrapper } from './PatternCardWrapper';
import { X, Lock, Truck, ShieldCheck } from 'lucide-react';

interface SneakIntoBasketCardProps {
  onPurchaseWithTrap: () => void;
  onPurchaseClean: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  isHidden?: boolean;
}

/**
 * Sneak into Basket Pattern - E-commerce Checkout
 * Styled as a generic Shopify/Stripe/Amazon checkout
 * NO game styling - must look like a real checkout
 */
export function SneakIntoBasketCard({ onPurchaseWithTrap, onPurchaseClean }: SneakIntoBasketCardProps) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 'tshirt',
      name: 'Classic Crew Neck T-Shirt',
      price: 15.00,
      quantity: 1,
    },
    {
      id: 'protection',
      name: 'Premium Handling & Protection',
      price: 50.00,
      quantity: 1,
      isHidden: true,
    },
  ]);

  const hasProtection = items.some(i => i.id === 'protection');
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const removeProtection = () => {
    setItems(prev => prev.filter(i => i.id !== 'protection'));
  };

  const handlePurchase = () => {
    if (hasProtection) {
      onPurchaseWithTrap();
    } else {
      onPurchaseClean();
    }
  };

  return (
    <PatternCardWrapper>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          width: '420px',
          minHeight: '480px',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#fafafa',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Lock style={{ width: '14px', height: '14px', color: '#6b7280' }} />
            Secure Checkout
          </h2>
        </div>

        {/* Order Summary */}
        <div style={{ padding: '20px' }}>
          <h3
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '16px',
            }}
          >
            Order Summary
          </h3>

          {/* Items */}
          <div style={{ marginBottom: '20px' }}>
            {items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: index < items.length - 1 ? '1px solid #f3f4f6' : 'none',
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: '14px',
                      color: item.isHidden ? '#9ca3af' : '#374151',
                      fontWeight: item.isHidden ? 400 : 500,
                      margin: 0,
                      marginBottom: '2px',
                    }}
                  >
                    {item.name}
                  </p>
                  {item.isHidden && (
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#d1d5db',
                        margin: 0,
                        fontStyle: 'italic',
                      }}
                    >
                      Added for your protection
                    </p>
                  )}
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#9ca3af',
                      margin: 0,
                      marginTop: '2px',
                    }}
                  >
                    Qty: {item.quantity}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '14px',
                      color: item.isHidden ? '#9ca3af' : '#374151',
                      fontWeight: 500,
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </span>
                  
                  {/* X button to remove protection */}
                  {item.id === 'protection' && (
                    <button
                      onClick={removeProtection}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '50%',
                        transition: 'background-color 0.15s',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      title="Remove item"
                    >
                      <X 
                        style={{ 
                          width: '14px', 
                          height: '14px', 
                          color: '#9ca3af',
                        }} 
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Subtotal</span>
              <span style={{ fontSize: '13px', color: '#374151' }}>${subtotal.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Shipping</span>
              <span style={{ fontSize: '13px', color: '#10b981' }}>FREE</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid #e5e7eb',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>Total</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handlePurchase}
            style={{
              width: '100%',
              padding: '14px 20px',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '20px',
              transition: 'background-color 0.15s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            Complete Purchase
          </button>

          {/* Trust badges */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid #f3f4f6',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Lock style={{ width: '12px', height: '12px', color: '#9ca3af' }} />
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>Secure</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Truck style={{ width: '12px', height: '12px', color: '#9ca3af' }} />
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>Free Shipping</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck style={{ width: '12px', height: '12px', color: '#9ca3af' }} />
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>Protected</span>
            </div>
          </div>
        </div>
      </div>
    </PatternCardWrapper>
  );
}
