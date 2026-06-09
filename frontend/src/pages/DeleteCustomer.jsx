import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, ShieldAlert, FileText, Phone, Mail, ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';
import deleteImg from '../assets/delete.png';

function DeleteCustomer({ username, setView }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

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

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      "CRITICAL WARNING: This action will permanently delete your customer details, hotel rooms, vacation packages, and credentials account row. This operation cannot be undone. Proceed?"
    );
    
    if (!confirmation) return;

    setDeleting(true);
    axios.delete(`http://localhost:5000/api/customer/delete/${username}`)
      .then((res) => {
        alert(res.data.message);
        setView('login');
      })
      .catch((err) => {
        console.error(err);
        alert("Server communication failure executing transactional delete query.");
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--slate-200)', borderTopColor: 'var(--danger)', borderRadius: '50%', animation: 'spinGlow 1s linear infinite' }}></div>
        <p style={{ fontWeight: 600, color: 'var(--slate-500)', fontSize: '14px' }}>Verifying security profile context...</p>
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
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
        <h3 style={{ color: 'var(--slate-900)', fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>No Records Identified</h3>
        <p style={{ color: 'var(--slate-500)', fontSize: '14px', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          There are no associated customer profile details matching the active username account "{username}".
        </p>
        <button onClick={() => setView('home')} className="btn btn-secondary" style={{ gap: '6px' }}>
          <ArrowLeft size={16} />
          RETURN
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
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--danger)' }}>Delete Profile Details</h3>
            <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
              Review the active credential data block targeting structural erasure
            </p>
          </div>

          {/* Alert Callout */}
          <div style={{
            display: 'flex',
            gap: '12px',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '8px',
            padding: '16px',
            color: 'var(--danger)',
            fontSize: '13px',
            fontWeight: 600,
            lineHeight: 1.5,
            marginBottom: '28px',
            textAlign: 'left'
          }}>
            <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              Deleting this account cascade erases all linked packages, hotel bookings, customer data, and login credentials permanently.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            <div className="grid-2">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--slate-500)' }}>
                  <User size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Target Account</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: 'var(--slate-900)' }}>{profile.username}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--slate-500)' }}>
                  <User size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Full Name</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: 'var(--slate-900)' }}>{profile.name}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--slate-500)' }}>
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>ID Document Type</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{profile.id}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--slate-500)' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Document Number</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{profile.number}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--slate-500)' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Phone Number</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{profile.phone}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--slate-500)' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Email Link</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)', wordBreak: 'break-all' }}>{profile.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button Controls */}
          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--slate-200)', paddingTop: '24px' }}>
            <button type="button" onClick={() => setView('home')} className="btn btn-secondary" style={{ flex: 1, gap: '6px' }}>
              <ArrowLeft size={16} />
              CANCEL
            </button>
            <button 
              type="button" 
              onClick={handleDeleteAccount} 
              disabled={deleting} 
              className="btn btn-danger" 
              style={{ flex: 1.5, gap: '6px' }}
            >
              <Trash2 size={16} />
              {deleting ? "DELETING..." : "DELETE ACCOUNT"}
            </button>
          </div>
        </div>

        {/* Right Graphic Section using asset delete.png */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%), url(${deleteImg})`,
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
            Account Deletion
          </h2>
          <p style={{ color: 'var(--slate-300)', fontSize: '14px', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
            Ensure you have downloaded all necessary itineraries before requesting accounts erasure. Deletion terminates operator access instantly.
          </p>
        </div>

      </div>
    </div>
  );
}

export default DeleteCustomer;