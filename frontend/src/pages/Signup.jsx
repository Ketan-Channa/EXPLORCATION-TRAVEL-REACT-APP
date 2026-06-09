import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, User, Lock, Mail, HelpCircle, Key, ArrowLeft, ArrowRight } from 'lucide-react';
import signupBg from '../assets/signup.png';

function Signup({ setView }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [security, setSecurity] = useState('YOUR BIRTHDAY');
  const [answer, setAnswer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!username || !name || !password || !security || !answer) {
      alert("All fields are required to create an account.");
      return;
    }

    setLoading(true);
    const payload = { username, name, password, security, answer };

    axios.post('http://localhost:5000/api/auth/signup', payload)
      .then((res) => {
        alert(res.data.message); 
        setView('login');
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.error || "Account creation rejected.");
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
        gridTemplateColumns: '1.1fr 1fr',
        minHeight: '520px',
        border: '1px solid var(--border-color)'
      }}>
        
        {/* Left Input Form Panel */}
        <div style={{
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--slate-900)' }}>Register Account</h3>
            <p style={{ color: 'var(--slate-400)', fontSize: '14px', marginTop: '4px', fontWeight: 500 }}>Create operator access keys below</p>
          </div>

          <form onSubmit={handleCreateAccount} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Username */}
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Username</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User size={18} style={{ position: 'absolute', left: '16px', color: 'var(--slate-400)' }} />
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                  placeholder="Choose username"
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                />
              </div>
            </div>

            {/* Name */}
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', color: 'var(--slate-400)' }} />
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="Enter full name"
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Password</label>
              <div className="password-input-container">
                <Lock size={18} style={{ position: 'absolute', left: '16px', color: 'var(--slate-400)' }} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="Set password"
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

            {/* Security Question */}
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Security Question</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <HelpCircle size={18} style={{ position: 'absolute', left: '16px', color: 'var(--slate-400)', zIndex: 1 }} />
                <select 
                  value={security} 
                  onChange={(e) => setSecurity(e.target.value)}
                  className="form-select"
                  style={{ paddingLeft: '44px' }}
                >
                  <option value="YOUR BIRTHDAY">YOUR BIRTHDAY</option>
                  <option value="YOUR FIRST SCHOOL">YOUR FIRST SCHOOL</option>
                  <option value="YOUR LUCKY NUMBER">YOUR LUCKY NUMBER</option>
                  <option value="YOUR CHILDHOOD NAME">YOUR CHILDHOOD NAME</option>
                </select>
              </div>
            </div>

            {/* Security Answer */}
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Answer</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Key size={18} style={{ position: 'absolute', left: '16px', color: 'var(--slate-400)' }} />
                <input 
                  type="text" 
                  value={answer} 
                  onChange={(e) => setAnswer(e.target.value)} 
                  required 
                  placeholder="Enter security answer"
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                />
              </div>
            </div>

            {/* Actions Panel */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '4px' }}>
              <button 
                type="button" 
                onClick={() => setView('login')}
                className="btn btn-secondary"
                style={{ flex: 1, gap: '6px' }}
              >
                <ArrowLeft size={16} />
                BACK
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary"
                style={{ flex: 1.5, gap: '6px' }}
              >
                {loading ? "CREATING..." : "CREATE"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </div>

          </form>
        </div>

        {/* Right Graphic Section using asset signup.png */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%), url(${signupBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px',
          textAlign: 'left'
        }}>
          <h2 style={{ color: '#fff', fontSize: '32px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
            Join the Desk
          </h2>
          <p style={{ color: 'var(--slate-300)', fontSize: '15px', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
            Register to unlock available vacation tier plans, customer profile managers, hotel lodging, and Paytm portals.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Signup;