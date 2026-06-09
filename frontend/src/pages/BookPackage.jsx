import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Calendar, Users, ShieldCheck, Phone, CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';
import bookPkgBg from '../assets/bookpackage.jpg';

function BookPackage({ username, onBack }) {
  const [packageName, setPackageName] = useState('GOLD PACKAGE');
  const [totalPeople, setTotalPeople] = useState('1');
  const [idType, setIdType] = useState('N/A');
  const [idNumber, setIdNumber] = useState('N/A');
  const [phone, setPhone] = useState('N/A');
  const [totalPrice, setTotalPrice] = useState(32000);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  // 1. Fetch autofill profile fields on load
  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:5000/api/package/customer/${username}`)
        .then((res) => {
          setIdType(res.data.id || 'Passport');
          setIdNumber(res.data.number || 'N/A');
          setPhone(res.data.phone || 'N/A');
          setLoading(false);
        })
        .catch((err) => {
          console.error("Autofill lookup error:", err);
          alert("Please register your personal profile details first before booking packages.");
          setLoading(false);
          if (onBack) onBack();
        });
    }
  }, [username, onBack]);

  // 2. Dynamic Cost Calculation
  useEffect(() => {
    let factor = 0;
    if (packageName === 'GOLD PACKAGE') factor = 32000;
    else if (packageName === 'SILVER PACKAGE') factor = 24000;
    else if (packageName === 'BRONZE PACKAGE') factor = 12000;

    const count = parseInt(totalPeople) || 0;
    setTotalPrice(factor * count);
  }, [packageName, totalPeople]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!idNumber || idNumber === 'N/A') {
      alert("Cannot process tour booking without valid profile identification documents linked.");
      return;
    }

    setBooking(true);
    const payload = {
      username,
      packageName,
      totalPeople,
      idType,
      phone,
      totalPrice
    };

    axios.post('http://localhost:5000/api/package/book', payload)
      .then((res) => {
        alert(res.data.message);
        if (onBack) onBack();
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.error || "Failed to process booking transaction.");
      })
      .finally(() => {
        setBooking(false);
      });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--slate-200)', borderTopColor: 'var(--brand-primary)', borderRadius: '50%', animation: 'spinGlow 1s linear infinite' }}></div>
        <p style={{ fontWeight: 600, color: 'var(--slate-500)', fontSize: '14px' }}>Verifying profile status...</p>
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
            <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Book Vacation Package</h3>
            <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
              Select your vacation tier plan, specify occupants, and process checkouts
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Username</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input type="text" value={username} readOnly className="form-input" style={{ paddingLeft: '38px' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Select Vacation Bundle</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Calendar size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)', zIndex: 1 }} />
                  <select 
                    value={packageName} 
                    onChange={(e) => setPackageName(e.target.value)} 
                    className="form-select"
                    style={{ paddingLeft: '38px', fontWeight: 700 }}
                  >
                    <option value="GOLD PACKAGE">GOLD PACKAGE (₹32,000/person)</option>
                    <option value="SILVER PACKAGE">SILVER PACKAGE (₹24,000/person)</option>
                    <option value="BRONZE PACKAGE">BRONZE PACKAGE (₹12,000/person)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Total Travelers</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Users size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="number" 
                    min="1" 
                    required 
                    value={totalPeople} 
                    onChange={(e) => setTotalPeople(e.target.value)} 
                    className="form-input" 
                    style={{ paddingLeft: '38px' }} 
                  />
                </div>
              </div>
            </div>

            {/* Calculations Checkout Summary Card */}
            <div style={{
              backgroundColor: 'var(--slate-50)',
              border: '1.5px solid var(--slate-200)',
              borderRadius: '8px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--slate-500)', fontWeight: 600 }}>
                <span>Verification ID (Autofilled)</span>
                <span style={{ color: 'var(--slate-700)', fontWeight: 700 }}>{idType}: {idNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--slate-500)', fontWeight: 600, borderBottom: '1px solid var(--slate-200)', paddingBottom: '10px' }}>
                <span>Registered Phone</span>
                <span style={{ color: 'var(--slate-700)', fontWeight: 700 }}>{phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px' }}>
                <span style={{ fontWeight: 700, color: 'var(--slate-800)', fontSize: '14px' }}>AGGREGATE ACQUISITION:</span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--success)' }}>₹{totalPrice}/-</span>
              </div>
            </div>

            {/* Actions Panel */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
              <button type="button" onClick={onBack} className="btn btn-secondary" style={{ flex: 1, gap: '6px' }}>
                <ArrowLeft size={16} />
                BACK
              </button>
              <button type="submit" disabled={booking} className="btn btn-primary" style={{ flex: 1.5, gap: '6px' }}>
                <CheckCircle size={16} />
                {booking ? "BOOKING..." : "CONFIRM BOOKING"}
              </button>
            </div>

          </form>
        </div>

        {/* Right Graphic Section using asset bookpackage.jpg */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%), url(${bookPkgBg})`,
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
            Book Your Itinerary
          </h2>
          <p style={{ color: 'var(--slate-300)', fontSize: '14px', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
            Choose from Bronze, Silver, or Gold packages. Dynamic pricing calculators handle conversions instantly based on the occupants parameter.
          </p>
        </div>

      </div>
    </div>
  );
}

export default BookPackage;