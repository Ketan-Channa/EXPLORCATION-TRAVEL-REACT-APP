import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Hotel, Users, Calendar, ShieldCheck, CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';
import bookBg from '../assets/book.jpg';

function BookHotel({ username, onBack }) {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({ idType: '', idNumber: '', phone: '' });
  
  const [formData, setFormData] = useState({
    totalPersons: 1,
    totalDays: 1,
    acRoom: 'YES',
    foodIncluded: 'YES'
  });
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkoutDate, setCheckoutDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    // 1. Fetch hotels list from database
    axios.get('http://localhost:5000/api/hotel/list')
      .then(res => {
        setHotels(res.data);
        if (res.data.length > 0) setSelectedHotel(res.data[0]);
      })
      .catch(err => console.error("Error loading hotel listing:", err));

    // 2. Fetch customer verification details (using correct profile endpoint)
    if (username) {
      axios.get(`http://localhost:5000/api/customer/profile/${username}`)
        .then(res => {
          setCustomerInfo({
            idType: res.data.id || 'Passport',
            idNumber: res.data.number || 'N/A',
            phone: res.data.phone || 'N/A'
          });
          setLoading(false);
        })
        .catch(err => {
          console.error("Autofill lookup error:", err);
          alert("Please register your personal profile details first before booking hotels.");
          setLoading(false);
          if (onBack) onBack();
        });
    }
  }, [username, onBack]);

  // 3. Dynamic Cost Calculation
  useEffect(() => {
    if (!selectedHotel) return;

    let costPerPerson = parseInt(selectedHotel.cost || 0); 
    let acCharge = formData.acRoom === 'YES' ? parseInt(selectedHotel.acroom || 0) : 0;
    let foodCharge = formData.foodIncluded === 'YES' ? parseInt(selectedHotel.foodincluded || 0) : 0;

    let total = (costPerPerson + acCharge + foodCharge) * parseInt(formData.totalPersons || 1) * parseInt(formData.totalDays || 1);
    setTotalPrice(total);
  }, [selectedHotel, formData]);

  // 4. Calculate checkout date dynamically
  useEffect(() => {
    if (!checkInDate || !formData.totalDays) return;
    const date = new Date(checkInDate);
    date.setDate(date.getDate() + parseInt(formData.totalDays || 0));
    setCheckoutDate(date.toISOString().split('T')[0]);
  }, [checkInDate, formData.totalDays]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHotelChange = (e) => {
    const hotel = hotels.find(h => h.name === e.target.value);
    setSelectedHotel(hotel);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedHotel) {
      alert("Please select a hotel option.");
      return;
    }

    setBooking(true);
    const payload = {
      username,
      hotelName: selectedHotel.name,
      totalPeople: formData.totalPersons,
      totalDays: formData.totalDays,
      acRoom: formData.acRoom,
      idType: customerInfo.idType,
      idNumber: customerInfo.idNumber,
      phone: customerInfo.phone,
      totalPrice
    };

    axios.post('http://localhost:5000/api/hotel/book', payload)
      .then(res => {
        alert(res.data.message);
        if (onBack) onBack();
      })
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.error || "Booking transaction failed.");
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
            <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Book Lodging Hotel</h3>
            <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
              Schedule check-in windows, select room options, and review dynamic pricing
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
                <label className="form-label">Select Hotel Option</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Hotel size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)', zIndex: 1 }} />
                  <select onChange={handleHotelChange} className="form-select" style={{ paddingLeft: '38px' }}>
                    {hotels.map((hotel, index) => (
                      <option key={index} value={hotel.name}>
                        {hotel.name} (₹{hotel.cost}/day)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Total Occupants</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Users size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="number" 
                    name="totalPersons" 
                    min="1" 
                    required 
                    value={formData.totalPersons} 
                    onChange={handleInputChange} 
                    className="form-input" 
                    style={{ paddingLeft: '38px' }} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Check-In Date</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Calendar size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="date" 
                    required 
                    value={checkInDate} 
                    onChange={(e) => setCheckInDate(e.target.value)} 
                    className="form-input" 
                    style={{ paddingLeft: '38px' }} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Booking Days</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Calendar size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)' }} />
                  <input 
                    type="number" 
                    name="totalDays" 
                    min="1" 
                    required 
                    value={formData.totalDays} 
                    onChange={handleInputChange} 
                    className="form-input" 
                    style={{ paddingLeft: '38px' }} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">AC / Non-AC Room</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Hotel size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)', zIndex: 1 }} />
                  <select name="acRoom" value={formData.acRoom} onChange={handleInputChange} className="form-select" style={{ paddingLeft: '38px' }}>
                    <option value="YES">YES (+₹{selectedHotel?.acroom}/day)</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Food Inclusions</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Users size={16} style={{ position: 'absolute', left: '14px', color: 'var(--slate-400)', zIndex: 1 }} />
                  <select name="foodIncluded" value={formData.foodIncluded} onChange={handleInputChange} className="form-select" style={{ paddingLeft: '38px' }}>
                    <option value="YES">YES (+₹{selectedHotel?.foodincluded}/day)</option>
                    <option value="NO">NO</option>
                  </select>
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
                <span style={{ color: 'var(--slate-700)', fontWeight: 700 }}>{customerInfo.idType}: {customerInfo.idNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--slate-500)', fontWeight: 600 }}>
                <span>Contact Phone</span>
                <span style={{ color: 'var(--slate-700)', fontWeight: 700 }}>{customerInfo.phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--slate-500)', fontWeight: 600 }}>
                <span>Stay Period</span>
                <span style={{ color: 'var(--slate-700)', fontWeight: 700 }}>{checkInDate} to {checkoutDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--slate-500)', fontWeight: 600, borderBottom: '1px solid var(--slate-200)', paddingBottom: '10px' }}>
                <span>Number of Days</span>
                <span style={{ color: 'var(--slate-700)', fontWeight: 700 }}>{formData.totalDays} Days</span>
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

        {/* Right Graphic Section using asset book.jpg */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%), url(${bookBg})`,
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
            Premium Lodgings
          </h2>
          <p style={{ color: 'var(--slate-300)', fontSize: '14px', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
            Select from our 10 verified hotel chains. Customize rooms, toggles, food plans, and days. Pricing updates live on the invoice tracker.
          </p>
        </div>

      </div>
    </div>
  );
}

export default BookHotel;