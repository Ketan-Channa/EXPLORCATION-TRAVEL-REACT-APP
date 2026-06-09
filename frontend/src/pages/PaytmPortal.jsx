import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

function PaytmPortal({ onBack }) {
  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
      <div className="modern-card animate-fade-in" style={{ padding: '24px', border: '1px solid var(--border-color)' }}>
        
        {/* Header Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid var(--slate-200)',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(16, 185, 129, 0.1)', 
              color: 'var(--success)' 
            }}>
              <ShieldCheck size={18} />
            </span>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--slate-800)', margin: 0 }}>
                SECURE TRANSACTION CHECKOUT
              </h3>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--slate-400)', fontWeight: 600 }}>
                Encrypted external sandbox checkout gateway
              </p>
            </div>
          </div>
          
          <button
            onClick={onBack}
            className="btn btn-secondary"
            style={{ padding: '8px 18px', gap: '6px', fontSize: '12px' }}
          >
            <ArrowLeft size={14} />
            BACK
          </button>
        </div>

        {/* Sandbox IFrame Container */}
        <div style={{
          width: '100%',
          height: '580px',
          border: '1.5px solid var(--slate-200)',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: 'var(--slate-50)',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <iframe
            src="https://paytm.com/rent-payment"
            title="Paytm Payment Gateway View"
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              alert("COULD NOT LOAD THIS PAGE.... ERROR-404");
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default PaytmPortal;