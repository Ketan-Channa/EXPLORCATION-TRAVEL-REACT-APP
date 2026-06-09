import React from 'react';
import { ArrowLeft, Info, BadgeCheck } from 'lucide-react';

function About({ onBack }) {
  const advantages = [
    "Delivers accurate up-to-date travel information",
    "Simplifies database records and manual desk tasks",
    "Minimizes paper-based documentation and logs",
    "Provides prompt warnings and security checks",
    "Maintains detailed customer profiles and phone records",
    "Logs booking confirmations and stays dynamically"
  ];

  return (
    <div style={{ maxWidth: '750px', margin: '40px auto' }}>
      <div className="modern-card animate-fade-in" style={{ padding: '40px', border: '1px solid var(--border-color)' }}>
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
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
            <Info size={28} />
          </span>
          <h3 style={{ fontSize: '24px', fontWeight: 800 }}>About Travel Platform</h3>
          <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
            Central administration suite for holiday tour operations
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div style={{
          maxHeight: '380px',
          overflowY: 'auto',
          padding: '24px',
          border: '1.5px solid var(--slate-200)',
          borderRadius: '8px',
          backgroundColor: 'var(--slate-50)',
          lineHeight: '1.6',
          color: 'var(--slate-600)',
          fontSize: '14px',
          textAlign: 'left',
          marginBottom: '32px'
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--slate-800)', marginBottom: '10px' }}>
            System Objective
          </h4>
          <p style={{ marginBottom: '20px', fontWeight: 500 }}>
            The primary objective of the Travel and Tourism Management System is to automate the core operations of a travel desk. This application enables operators to register customer profiles, review vacation packages, schedule check-ins, record hotel reservations, and process sandbox checkout gateways with ease.
          </p>
          
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--slate-800)', marginBottom: '12px' }}>
            Core Advantages
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {advantages.map((adv, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontWeight: 600 }}>
                <BadgeCheck size={18} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                <span>{adv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Navigation Footer */}
        <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '24px' }}>
          <button 
            onClick={onBack} 
            className="btn btn-secondary"
            style={{ width: '100%', gap: '6px' }}
          >
            <ArrowLeft size={16} />
            BACK TO DASHBOARD
          </button>
        </div>

      </div>
    </div>
  );
}

export default About;