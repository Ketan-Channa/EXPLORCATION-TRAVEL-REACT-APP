import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, ShieldAlert, FileText, Globe, MapPin, Mail, Phone, ArrowLeft } from 'lucide-react';
import viewAllImg from '../assets/viewall.jpg';

function ViewCustomer({ username, onBack }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    axios.get(`http://localhost:5000/api/customer/profile/${username}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--slate-200)', borderTopColor: 'var(--brand-primary)', borderRadius: '50%', animation: 'spinGlow 1s linear infinite' }}></div>
        <p style={{ fontWeight: 600, color: 'var(--slate-500)', fontSize: '14px' }}>Loading profile records...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="modern-card animate-fade-in" style={{
        maxWidth: '560px',
        margin: '40px auto',
        padding: '40px',
        textAlign: 'center',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>👤</div>
        <h3 style={{ color: 'var(--slate-900)', fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>No Profile Identified</h3>
        <p style={{ color: 'var(--slate-500)', fontSize: '14px', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          There are no personal details recorded under the username "{username}" yet. Please register your profile details.
        </p>
        <button onClick={onBack} className="btn btn-primary" style={{ gap: '6px' }}>
          <ArrowLeft size={16} />
          BACK TO DASHBOARD
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
      <div className="modern-card animate-fade-in" style={{ 
        padding: 0, 
        overflow: 'hidden', 
        display: 'grid', 
        gridTemplateColumns: '1.2fr 1fr',
        border: '1px solid var(--border-color)' 
      }}>
        
        {/* Left Column Profile Grid */}
        <div style={{ padding: '40px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Personal Details</h3>
            <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
              Verified operator attributes mapped to your primary database row
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            
            <div className="grid-2">
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <User size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Username</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: 'var(--slate-900)' }}>{profile.username}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <User size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Full Name</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: 'var(--slate-900)' }}>{profile.name}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Government ID Type</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{profile.id}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>ID Number</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{profile.number}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <Globe size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Country</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{profile.country}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Address Location</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{profile.address}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Phone Number</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{profile.phone}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Email Link</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)', wordBreak: 'break-all' }}>{profile.email}</span>
                </div>
              </div>

            </div>

          </div>

          <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '24px' }}>
            <button onClick={onBack} className="btn btn-secondary" style={{ width: '100%', gap: '6px' }}>
              <ArrowLeft size={16} />
              BACK TO DASHBOARD
            </button>
          </div>
        </div>

        {/* Right Graphic Section using asset viewall.jpg */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%), url(${viewAllImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px',
          textAlign: 'left'
        }}>
          <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
            Preview Profile Data
          </h2>
          <p style={{ color: 'var(--slate-300)', fontSize: '14px', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
            These details are referenced automatically during tour checkout, hotel scheduling, and Paytm checkout processes. Keep details updated.
          </p>
        </div>

      </div>
    </div>
  );
}

export default ViewCustomer;