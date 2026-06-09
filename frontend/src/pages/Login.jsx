import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, User, Lock, ArrowRight, HelpCircle } from 'lucide-react';
import loginBg from '../assets/login.jpg';

function Login({ setView, setSessionUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    setLoading(true);
    axios.post('http://localhost:5000/api/auth/login', { username, password })
      .then((res) => {
        setSessionUser(res.data.username);
        setView('loading');
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.error || "INCORRECT USERNAME OR PASSWORD");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--slate-50)',
      padding: '24px',
      backgroundImage: 'radial-gradient(var(--slate-200) 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    }}>
      <div className="modern-card animate-fade-in" style={{
        maxWidth: '960px',
        width: '100%',
        padding: 0,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        minHeight: '520px',
        border: '1px solid var(--border-color)'
      }}>
        
        {/* Left Branding Panel using asset login.jpg */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%), url(${loginBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px',
          textAlign: 'left',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '48px',
            fontSize: '32px'
          }}>
            ✈️
          </div>
          
          <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
            Explore the <br />
            <span style={{ color: 'var(--brand-secondary)' }}>World with Us</span>
          </h2>
          <p style={{ color: 'var(--slate-300)', fontSize: '15px', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
            Log in to manage holiday lodging, tour itineraries, customer profiles, and transaction records through our travel desk.
          </p>
        </div>

        {/* Right Input Form Panel */}
        <div style={{
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--slate-900)' }}>Account Access</h3>
            <p style={{ color: 'var(--slate-400)', fontSize: '14px', marginTop: '4px', fontWeight: 500 }}>Enter your travel operator credentials</p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Username */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User size={18} style={{ position: 'absolute', left: '16px', color: 'var(--slate-400)' }} />
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                  placeholder="Enter username"
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-input-container">
                <Lock size={18} style={{ position: 'absolute', left: '16px', color: 'var(--slate-400)' }} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="Enter password"
                  className="form-input"
                  style={{ paddingLeft: '44px', paddingRight: '48px' }}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Actions Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', height: '46px' }}
              >
                {loading ? "AUTHENTICATING..." : "LOG IN"}
                {!loading && <ArrowRight size={16} />}
              </button>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px',
                marginTop: '12px'
              }}>
                <button 
                  type="button" 
                  onClick={() => setView('signup')}
                  className="btn btn-secondary"
                  style={{ fontSize: '12px', padding: '10px' }}
                >
                  CREATE ACCOUNT
                </button>
                <button 
                  type="button" 
                  onClick={() => setView('forgotPassword')}
                  className="btn btn-secondary"
                  style={{ fontSize: '12px', padding: '10px' }}
                >
                  FORGOT PASSWORD?
                </button>
              </div>

              <button 
                type="button" 
                onClick={() => alert("Please contact system administration support at support@traveltours.com")}
                style={{ 
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--slate-400)',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '16px'
                }}
              >
                <HelpCircle size={14} />
                Need help logging in?
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;