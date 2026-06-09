import React, { useState, useEffect } from 'react';
import splashImg from '../assets/splash.jpg';

function Splash({ onSplashComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          if (onSplashComplete) {
            onSplashComplete();
          }
          return 100;
        }
        return prevProgress + 1;
      });
    }, 25); // Approximately 2.5 seconds total load time

    return () => clearInterval(timer);
  }, [onSplashComplete]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--slate-950)',
      padding: '24px',
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(2, 6, 23, 0.95)), url(${splashImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      <div className="modern-card animate-fade-in" style={{
        maxWidth: '580px',
        width: '100%',
        padding: '56px 40px',
        textAlign: 'center',
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#fff',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        
        {/* Glowing Logo */}
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '22px',
          background: 'var(--brand-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '34px',
          margin: '0 auto 28px auto',
          boxShadow: '0 0 35px rgba(6, 182, 212, 0.45)',
          animation: 'spinGlow 10s linear infinite'
        }}>
          ✈️
        </div>

        <h1 style={{ 
          color: '#fff', 
          fontSize: '32px', 
          fontWeight: 800, 
          marginBottom: '8px',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          EXPLORCATION
        </h1>
        
        <p style={{ 
          color: 'var(--brand-secondary)', 
          fontSize: '14px', 
          fontWeight: 700, 
          marginBottom: '40px',
          letterSpacing: '0.5px'
        }}>
          DESIGNED BY KETAN CHANNA
        </p>

        {/* Loading track */}
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '16px'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--brand-gradient)',
            borderRadius: '20px',
            transition: 'width 0.05s linear',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
          }} />
        </div>

        {/* Loading details */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          fontWeight: 750,
          color: 'var(--slate-300)',
          letterSpacing: '0.5px'
        }}>
          <span>INITIALIZING SYSTEM...</span>
          <span style={{ color: 'var(--brand-secondary)', fontSize: '14px' }}>{progress}%</span>
        </div>

      </div>
    </div>
  );
}

export default Splash;
