import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, ShieldAlert, FileText, Globe, MapPin, Mail, Phone, ArrowLeft, Save } from 'lucide-react';
import updateImg from '../assets/update.png';

function UpdateCustomer({ username, onBack }) {
  const [formData, setFormData] = useState({
    id: '',
    number: '',
    name: '',
    gender: '',
    country: '',
    address: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!username) return;
    axios.get(`http://localhost:5000/api/customer/profile/${username}`)
      .then((res) => {
        setFormData({
          id: res.data.id || '',
          number: res.data.number || '',
          name: res.data.name || '',
          gender: res.data.gender || '',
          country: res.data.country || '',
          address: res.data.address || '',
          phone: res.data.phone || '',
          email: res.data.email || ''
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load existing customer profile records. Please confirm you have added details first.");
        setLoading(false);
        if (onBack) onBack();
      });
  }, [username, onBack]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    axios.put(`http://localhost:5000/api/customer/update/${username}`, formData)
      .then((res) => {
        alert(res.data.message);
        if (onBack) onBack();
      })
      .catch((err) => {
        console.error(err);
        alert("Profile update transaction execution failed.");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--slate-200)', borderTopColor: 'var(--brand-primary)', borderRadius: '50%', animation: 'spinGlow 1s linear infinite' }}></div>
        <p style={{ fontWeight: 600, color: 'var(--slate-500)', fontSize: '14px' }}>Loading profile records...</p>
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
        
        {/* Left Column Input Panel */}
        <div style={{ padding: '40px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Update Details</h3>
            <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
              Modify verification parameters associated with your profile
            </p>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Username</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input type="text" value={username} readOnly className="form-input" style={{ paddingLeft: '38px' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input type="text" name="name" value={formData.name} readOnly className="form-input" style={{ paddingLeft: '38px' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Government ID Type</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <ShieldAlert size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="text" 
                    name="id" 
                    value={formData.id} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="E.g. Passport"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">ID Document Number</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FileText size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="text" 
                    name="number" 
                    value={formData.number} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter document number"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="text" 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Male / Female"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Globe size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="text" 
                    name="country" 
                    value={formData.country} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter country"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Address Location</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter address"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email - ID</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter email"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Phone size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Enter phone number"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>

            {/* Form actions */}
            <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--slate-200)', paddingTop: '24px', marginTop: '8px' }}>
              <button type="button" onClick={onBack} className="btn btn-secondary" style={{ flex: 1, gap: '6px' }}>
                <ArrowLeft size={16} />
                CANCEL
              </button>
              <button type="submit" disabled={saving} className="btn btn-primary" style={{ flex: 1.5, gap: '6px' }}>
                <Save size={16} />
                {saving ? "SAVING..." : "SAVE CHANGES"}
              </button>
            </div>

          </form>
        </div>

        {/* Right Graphic Section using asset update.png */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%), url(${updateImg})`,
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
            Keep Details Updated
          </h2>
          <p style={{ color: 'var(--slate-300)', fontSize: '14px', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
            Make adjustments to your email links, contact numbers, or address parameters to avoid processing discrepancies on hotel lodgings.
          </p>
        </div>

      </div>
    </div>
  );
}

export default UpdateCustomer;