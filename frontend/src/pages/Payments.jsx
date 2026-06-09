import React from 'react';
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import paytmLogo from '../assets/paytm.jpeg';

function Payments({ onBack, setView }) {
  const handlePayClick = () => {
    setView('paytmPortal');
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto' }}>
      <div className="modern-card animate-fade-in" style={{ padding: '40px', border: '1px solid var(--border-color)' }}>
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '56px', 
            height: '56px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(59, 130, 246, 0.1)', 
            color: 'var(--brand-primary)',
            marginBottom: '16px'
          }}>
            <CreditCard size={28} />
          </span>
          <h3 style={{ fontSize: '24px', fontWeight: 800 }}>Payment Gateway Portal</h3>
          <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
            Complete your lodging and vacation bookings securely using Paytm checkout
          </p>
        </div>

        {/* Paytm Brand Promo Banner */}
        <div style={{
          backgroundColor: '#f1f5f9',
          border: '1px solid var(--slate-200)',
          borderRadius: '12px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '32px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
        }}>
          <img 
            src={paytmLogo} 
            alt="Paytm logo" 
            style={{ 
              height: '48px', 
              objectFit: 'contain',
              borderRadius: '6px'
            }} 
          />
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--slate-700)', display: 'block' }}>
              Instant Mobile Payments Gateway
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--slate-400)', marginTop: '2px', display: 'block' }}>
              Pay securely via UPI, Wallet, Net Banking, or Cards
            </span>
          </div>
        </div>

        {/* Trust badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--success)',
          marginBottom: '32px'
        }}>
          <ShieldCheck size={16} />
          <span>SSL SECURED & 256-BIT ENCRYPTED checkout</span>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--slate-200)', paddingTop: '24px' }}>
          <button
            onClick={onBack}
            className="btn btn-secondary"
            style={{ flex: 1, gap: '6px' }}
          >
            <ArrowLeft size={16} />
            DASHBOARD
          </button>
          
          <button
            onClick={handlePayClick}
            className="btn btn-primary"
            style={{ 
              flex: 1.5, 
              backgroundColor: '#00baf2', 
              backgroundImage: 'none',
              boxShadow: '0 4px 12px rgba(0, 186, 242, 0.2)',
              gap: '6px' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0099c8';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#00baf2';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            PROCEED TO PAY
          </button>
        </div>

      </div>
    </div>
  );
}

export default Payments;