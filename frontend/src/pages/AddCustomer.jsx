import React, { useState } from 'react';
import axios from 'axios';
import { User, ShieldAlert, FileText, Globe, MapPin, Mail, Phone, ArrowLeft, Plus } from 'lucide-react';
import newCustImg from '../assets/newcustomer.jpg';

function AddCustomer({ username, onBack }) {
  const [idType, setIdType] = useState('Passport');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!number || !name || !country || !address || !phone || !email) {
      alert("All profile information input fields must be filled out completely.");
      return;
    }

    setLoading(true);
    const payload = { username, id: idType, number, name, gender, country, address, phone, email };

    axios.post('http://localhost:5000/api/customer/add', payload)
      .then((res) => {
        alert(res.data.message);
        if (onBack) onBack();
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.error || "Failed to process customer profile record insertion.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
            <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Add Personal Details</h3>
            <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
              Bind verification parameters directly to your active session operator profile
            </p>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Grid 2 Column */}
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Username</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input type="text" value={username} readOnly className="form-input" style={{ paddingLeft: '38px' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Government ID Type</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <ShieldAlert size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)', zIndex: 1 }} />
                  <select 
                    value={idType} 
                    onChange={(e) => setIdType(e.target.value)} 
                    className="form-select"
                    style={{ paddingLeft: '38px' }}
                  >
                    <option value="Passport">Passport</option>
                    <option value="Aadhar Card">Aadhar Card</option>
                    <option value="Pan Card">Pan Card</option>
                    <option value="Ration Card">Ration Card</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">ID Document Number</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FileText size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="text" 
                    value={number} 
                    onChange={(e) => setNumber(e.target.value)} 
                    required 
                    placeholder="Enter document number"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    placeholder="Enter full name"
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
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
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
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                    placeholder="Enter street address"
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
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="name@domain.com"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                    placeholder="Enter mobile number"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>
            </div>

            {/* Gender Select Radio Custom Style */}
            <div className="form-group">
              <label className="form-label">Gender</label>
              <div style={{ display: 'flex', gap: '24px', padding: '6px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="Male" 
                    checked={gender === 'Male'} 
                    onChange={() => setGender('Male')} 
                    style={{ width: '16px', height: '16px', accentColor: 'var(--brand-primary)' }}
                  />
                  Male
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="Female" 
                    checked={gender === 'Female'} 
                    onChange={() => setGender('Female')} 
                    style={{ width: '16px', height: '16px', accentColor: 'var(--brand-primary)' }}
                  />
                  Female
                </label>
              </div>
            </div>

            {/* Submit Control Buttons */}
            <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--slate-200)', paddingTop: '24px', marginTop: '8px' }}>
              <button type="button" onClick={onBack} className="btn btn-secondary" style={{ flex: 1, gap: '6px' }}>
                <ArrowLeft size={16} />
                BACK
              </button>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1.5, gap: '6px' }}>
                <Plus size={16} />
                {loading ? "SAVING..." : "ADD DETAILS"}
              </button>
            </div>

          </form>
        </div>

        {/* Right Graphic Section using asset newcustomer.jpg */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%), url(${newCustImg})`,
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
            Complete Your Profile
          </h2>
          <p style={{ color: 'var(--slate-300)', fontSize: '14px', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
            Enter your verification IDs, country roots, and active contact numbers. Completing your profile permits checkout access for holiday lodgings and package bookings.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AddCustomer;