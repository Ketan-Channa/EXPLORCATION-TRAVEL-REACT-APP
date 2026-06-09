import React, { useState, useEffect } from 'react';
import splashImg from '../assets/splash.jpg';

function Loading({ username, onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          if (onLoadingComplete) {
            onLoadingComplete();
          }
          return 100;
        }
        return prevProgress + 1;
      });
    }, 30); // 30ms for a slightly snappier load feel

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

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
      backgroundPosition: 'center'
    }}>
      <div className="modern-card animate-fade-in" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '48px 40px',
        textAlign: 'center',
        background: 'rgba(30, 41, 59, 0.65)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        
        {/* Animated Icon Glow */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'var(--brand-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          margin: '0 auto 24px auto',
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
          animation: 'spinGlow 8s linear infinite'
        }}>
          🌍
        </div>

        <h1 style={{ 
          color: '#fff', 
          fontSize: '24px', 
          fontWeight: 800, 
          marginBottom: '8px',
          letterSpacing: '0.5px'
        }}>
          ANTIGRAVITY TRAVELS
        </h1>
        <p style={{ color: 'var(--slate-300)', fontSize: '13px', fontWeight: 600, marginBottom: '40px' }}>
          Configuring workspace parameters, please wait...
        </p>

        {/* Custom Progress Bar */}
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '20px',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
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

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--brand-secondary)',
          marginBottom: '40px'
        }}>
          <span>LOADING COMPONENT SCHEMAS</span>
          <span>{progress}%</span>
        </div>

        {/* Footer Session Tag */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '20px',
          fontSize: '13px',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '1px'
        }}>
          WELCOME: <span style={{ color: 'var(--brand-secondary)' }}>{username ? username.toUpperCase() : 'USER'}</span>
        </div>

      </div>
    </div>
  );
}

export default Loading;