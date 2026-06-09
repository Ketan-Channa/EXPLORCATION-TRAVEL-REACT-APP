import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Calendar, Users, ShieldCheck, Phone, CreditCard, ArrowLeft, BookmarkCheck } from 'lucide-react';
import packageBookedBg from '../assets/packagebooked.jpg';

function ViewPackage({ username, onBack }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    axios.get(`http://localhost:5000/api/package/booked/${username}`)
      .then((res) => {
        setBooking(res.data);
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
        <p style={{ fontWeight: 600, color: 'var(--slate-500)', fontSize: '14px' }}>Loading itinerary details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="modern-card animate-fade-in" style={{
        maxWidth: '560px',
        margin: '40px auto',
        padding: '40px',
        textAlign: 'center',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
        <h3 style={{ color: 'var(--slate-900)', fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>No Stays Scheduled</h3>
        <p style={{ color: 'var(--slate-500)', fontSize: '14px', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          There are no active vacation packages booked under the username "{username}" yet.
        </p>
        <button onClick={onBack} className="btn btn-primary" style={{ gap: '6px' }}>
          <ArrowLeft size={16} />
          BACK
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
        
        {/* Left Column Booking Details Grid */}
        <div style={{ padding: '40px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookmarkCheck size={24} style={{ color: 'var(--brand-primary)' }} />
              Vacation Package Itinerary
            </h3>
            <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
              Review active travel bookings scheduled under your account
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
            <div className="grid-2">
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <User size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Operator Username</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: 'var(--slate-900)' }}>{booking.username}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Bundle Booked</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: 'var(--brand-primary)' }}>{booking.package}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <Users size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Total Travelers</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{booking.people} Persons</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Verification ID Type</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{booking.id}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', gridColumn: '1 / span 2' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <span className="form-label" style={{ fontSize: '10px' }}>Registered Contact Phone</span>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: 'var(--slate-700)' }}>{booking.phone}</span>
                </div>
              </div>

            </div>

            {/* Total Billing Block */}
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.05)',
              border: '1.5px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '8px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
              textAlign: 'left'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--slate-600)', fontWeight: 700 }}>
                <CreditCard size={18} style={{ color: 'var(--success)' }} />
                TOTAL TRANSACTION VALUE:
              </span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--success)' }}>
                {booking.price}
              </span>
            </div>

          </div>

          <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '24px' }}>
            <button onClick={onBack} className="btn btn-secondary" style={{ width: '100%', gap: '6px' }}>
              <ArrowLeft size={16} />
              BACK TO DASHBOARD
            </button>
          </div>
        </div>

        {/* Right Graphic Section using asset packagebooked.jpg */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%), url(${packageBookedBg})`,
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
            Active Vacation Stay
          </h2>
          <p style={{ color: 'var(--slate-300)', fontSize: '14px', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
            Your vacation itinerary has been registered. You can review scheduling details anytime from your operator desk.
          </p>
        </div>

      </div>
    </div>
  );
}

export default ViewPackage;