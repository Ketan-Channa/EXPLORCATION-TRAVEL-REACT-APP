import React from 'react';
import { Check, ArrowLeft, ShieldCheck } from 'lucide-react';
import pkgGold from '../assets/package1.jpg';
import pkgSilver from '../assets/package2.jpg';
import pkgBronze from '../assets/package3.jpg';

function CheckPackage({ onBack }) {
  const tiers = [
    {
      title: "GOLD PACKAGE",
      cost: "Rs. 32000/-",
      color: "#d4af37",
      image: pkgGold,
      badge: "Best Value",
      features: [
        "6 DAYS AND 7 NIGHTS",
        "AIRPORT ASSISTANCE",
        "HALF DAY CITY TOUR",
        "DAILY BUFFET MEALS",
        "WELCOME DRINK ON ARRIVAL",
        "FULL DAY CRUISE INCLUDED",
        "ENGLISH SPEAKING GUIDE"
      ]
    },
    {
      title: "SILVER PACKAGE",
      cost: "Rs. 24000/-",
      color: "#94a3b8",
      image: pkgSilver,
      badge: "Most Popular",
      features: [
        "5 DAYS AND 6 NIGHTS",
        "TOLL TICKETS INCLUDED",
        "MEET AND GREET AT AIRPORT",
        "FREE ENTRANCE TICKETS",
        "DAILY BREAKFAST SPREAD",
        "NIGHT SAFARI ADVENTURE",
        "CRUISE DINNER PASS"
      ]
    },
    {
      title: "BRONZE PACKAGE",
      cost: "Rs. 12000/-",
      color: "#cd7f32",
      image: pkgBronze,
      badge: "Budget Choice",
      features: [
        "4 DAYS AND 5 NIGHTS",
        "RETURN AIRFARE PORTAL",
        "FREE BARBEQUE DINNER",
        "HOTEL STAY ACCOMMODATIONS",
        "HALF DAY SIGHTSEEING EXPEDITION",
        "COMPLIMENTARY WELCOME KIT",
        "PERSONAL TRANSPORT CAR"
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header Panel */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px'
      }}>
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 800 }}>Explore Vacation Packages</h3>
          <p style={{ color: 'var(--slate-400)', fontSize: '14px', marginTop: '4px', fontWeight: 600 }}>
            Compare specifications and features between gold, silver, and bronze holiday tiers
          </p>
        </div>
        <button 
          onClick={onBack} 
          className="btn btn-secondary"
          style={{ gap: '6px' }}
        >
          <ArrowLeft size={16} />
          BACK
        </button>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px',
        marginBottom: '40px'
      }}>
        {tiers.map((pkg, index) => (
          <div 
            key={index}
            className="modern-card animate-fade-in"
            style={{
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: `1.5px solid var(--slate-200)`,
              borderTop: `6px solid ${pkg.color}`,
              position: 'relative'
            }}
          >
            {/* Header Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: pkg.color,
              color: index === 1 ? 'var(--slate-800)' : '#fff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '20px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
              zIndex: 2
            }}>
              {pkg.badge}
            </div>

            {/* Package Thumbnail Header */}
            <div style={{
              height: '180px',
              backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.7)), url(${pkg.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px',
              color: '#fff'
            }}>
              <h4 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {pkg.title}
              </h4>
            </div>

            {/* Features List */}
            <div style={{ 
              padding: '24px 20px', 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              backgroundColor: '#fff',
              textAlign: 'left'
            }}>
              {pkg.features.map((feat, fIdx) => (
                <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--slate-600)', fontWeight: 600 }}>
                  <Check size={16} strokeWidth={3} style={{ color: pkg.color }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Pricing Section */}
            <div style={{ 
              padding: '20px', 
              backgroundColor: 'var(--slate-50)', 
              borderTop: '1px solid var(--slate-200)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--slate-400)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Total Bundle Cost
              </span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--success)' }}>
                {pkg.cost}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default CheckPackage;