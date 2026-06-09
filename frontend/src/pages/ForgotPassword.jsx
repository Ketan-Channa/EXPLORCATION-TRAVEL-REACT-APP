import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, Search, Key, ShieldQuestion, User, Lock, ArrowLeft } from 'lucide-react';
import forgotBg from '../assets/forgotpassword.jpg';

function ForgotPassword({ setView }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [recoveredPassword, setRecoveredPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [searching, setSearching] = useState(false);
  const [retrieving, setRetrieving] = useState(false);

  const handleSearch = () => {
    if (!username) {
      alert("Please enter a username first.");
      return;
    }
    setSearching(true);
    axios.post('http://localhost:5000/api/auth/search', { username })
      .then((res) => {
        setName(res.data.name || '');
        setSecurityQuestion(res.data.security || '');
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.error || "Error finding account profile details.");
      })
      .finally(() => {
        setSearching(false);
      });
  };

  const handleRetrieve = () => {
    if (!username || !securityAnswer) {
      alert("Please enter your security answer.");
      return;
    }
    setRetrieving(true);
    axios.post('http://localhost:5000/api/auth/retrieve', { username, answer: securityAnswer })
      .then((res) => {
        setRecoveredPassword(res.data.password || '');
        setShowPassword(true); // Auto show once recovered
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.error || "Verification failed. Incorrect answer.");
      })
      .finally(() => {
        setRetrieving(false);
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
        maxWidth: '850px',
        width: '100%',
        padding: 0,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        minHeight: '480px',
        border: '1px solid var(--border-color)'
      }}>
        
        {/* Left Form Panel */}
        <div style={{
          padding: '40px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--slate-900)' }}>Recover Password</h3>
            <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>Follow the validation queries below</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Step 1: Search Username */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Enter username"
                    className="form-input"
                    style={{ paddingLeft: '38px', height: '42px' }}
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleSearch}
                  disabled={searching}
                  className="btn btn-secondary"
                  style={{ padding: '0 20px', height: '42px', gap: '6px', fontSize: '12px' }}
                >
                  <Search size={14} />
                  {searching ? "..." : "SEARCH"}
                </button>
              </div>
            </div>

            {/* Readonly Name */}
            {name && (
              <div className="form-group animate-fade-in">
                <label className="form-label">Registered Name</label>
                <input 
                  type="text" 
                  value={name} 
                  readOnly 
                  className="form-input"
                  style={{ height: '42px' }}
                />
              </div>
            )}

            {/* Readonly Security Question */}
            {securityQuestion && (
              <div className="form-group animate-fade-in">
                <label className="form-label">Security Question</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <ShieldQuestion size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-500)' }} />
                  <input 
                    type="text" 
                    value={securityQuestion} 
                    readOnly 
                    className="form-input"
                    style={{ paddingLeft: '38px', height: '42px', color: 'var(--slate-700)', fontWeight: 600 }}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Answer & Retrieve */}
            {securityQuestion && (
              <div className="form-group animate-fade-in">
                <label className="form-label">Security Answer</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Key size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                    <input 
                      type="text" 
                      value={securityAnswer} 
                      onChange={(e) => setSecurityAnswer(e.target.value)} 
                      placeholder="Enter your answer"
                      className="form-input"
                      style={{ paddingLeft: '38px', height: '42px' }}
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={handleRetrieve}
                    disabled={retrieving}
                    className="btn btn-primary"
                    style={{ padding: '0 20px', height: '42px', fontSize: '12px' }}
                  >
                    {retrieving ? "..." : "RETRIEVE"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Revealed Password */}
            {recoveredPassword && (
              <div className="form-group animate-fade-in">
                <label className="form-label" style={{ color: 'var(--success)' }}>Recovered Password</label>
                <div className="password-input-container">
                  <Lock size={16} style={{ position: 'absolute', left: '14px', color: 'var(--success)' }} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={recoveredPassword} 
                    readOnly 
                    className="form-input"
                    style={{ 
                      paddingLeft: '38px', 
                      paddingRight: '48px', 
                      height: '42px', 
                      borderColor: 'var(--success)', 
                      backgroundColor: 'rgba(16, 185, 129, 0.05)',
                      color: 'var(--success)',
                      fontWeight: 700 
                    }}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: 'var(--success)' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Back Navigation Button */}
            <div style={{ marginTop: '8px' }}>
              <button 
                type="button" 
                onClick={() => setView('login')}
                className="btn btn-secondary"
                style={{ width: '100%', gap: '8px', height: '42px' }}
              >
                <ArrowLeft size={16} />
                BACK TO LOGIN
              </button>
            </div>

          </div>
        </div>

        {/* Right Graphic Section using asset forgotpassword.jpg */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.98) 100%), url(${forgotBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>Having Trouble?</h3>
          <p style={{ color: 'var(--slate-300)', fontSize: '13px', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
            Enter your active operator username first to load your registered recovery safety queries. Answering matches will disclose your password immediately.
          </p>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;