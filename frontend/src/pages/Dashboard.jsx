import React from 'react';
import {
  UserPlus,
  UserCheck,
  User,
  UserMinus,
  Boxes,
  CalendarDays,
  FolderSearch,
  Hotel,
  MapPin,
  PlaneTakeoff,
  BookmarkCheck,
  CreditCard,
  HelpCircle,
  LogOut
} from 'lucide-react';
import homeBg from '../assets/home.jpg';

function Dashboard({ username, currentView, setView, children }) {
  const actionItems = [
    { label: "ADD PERSONAL DETAILS", view: "addCustomer", icon: UserPlus },
    { label: "UPDATE PERSONAL DETAILS", view: "updateCustomer", icon: UserCheck },
    { label: "VIEW PERSONAL DETAILS", view: "viewCustomer", icon: User },
    { label: "DELETE PERSONAL DETAILS", view: "deleteCustomer", icon: UserMinus },
    { label: "CHECK PACKAGES", view: "checkPackage", icon: Boxes },
    { label: "BOOK PACKAGE", view: "bookPackage", icon: CalendarDays },
    { label: "VIEW PACKAGE", view: "viewPackage", icon: FolderSearch },
    { label: "VIEW HOTELS", view: "checkHotels", icon: Hotel },
    { label: "VIEW DESTINATIONS", view: "destinations", icon: MapPin },
    { label: "BOOK HOTEL", view: "bookHotel", icon: PlaneTakeoff },
    { label: "VIEW BOOKED HOTEL", view: "viewBookedHotels", icon: BookmarkCheck },
    { label: "PAYMENTS", view: "payments", icon: CreditCard },
    { label: "ABOUT PROJECT", view: "about", icon: HelpCircle }
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of your session?")) {
      setView('login');
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-app)'
    }}>

      {/* LEFT NAVIGATION SIDEBAR */}
      <div style={{
        backgroundColor: 'var(--slate-900)',
        borderRight: '1px solid var(--slate-800)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        color: '#fff',
        overflow: 'hidden'
      }}>
        {/* Brand Header */}
        <div style={{
          padding: '24px 20px',
          background: 'linear-gradient(to right, var(--slate-900), var(--slate-950))',
          borderBottom: '1px solid var(--slate-800)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            background: 'var(--brand-gradient)',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            ✈️
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '17px', color: '#fff', fontWeight: 800, letterSpacing: '0.5px' }}>
              EXPLORCATION
            </h1>
            <p style={{ margin: 0, fontSize: '11px', color: 'var(--slate-400)', fontWeight: 600 }}>
              TRAVEL PLATFORM
            </p>
          </div>
        </div>

        {/* Sidebar Links */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {actionItems.map((item, idx) => {
            const isActive = currentView === item.view;
            const IconComponent = item.icon;

            return (
              <button
                key={idx}
                onClick={() => setView(item.view)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  backgroundColor: isActive ? 'var(--slate-800)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--slate-300)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  borderLeft: isActive ? '3px solid var(--brand-secondary)' : '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.backgroundColor = 'var(--slate-800)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--slate-300)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <IconComponent size={16} strokeWidth={2.5} style={{ color: isActive ? 'var(--brand-secondary)' : 'inherit' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer User Badge */}
        <div style={{
          padding: '20px 16px',
          borderTop: '1px solid var(--slate-800)',
          backgroundColor: 'var(--slate-950)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--slate-800)',
              color: 'var(--brand-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              border: '2px solid var(--slate-700)',
              flexShrink: 0
            }}>
              {username ? username[0].toUpperCase() : 'G'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {username ? username.toUpperCase() : 'GUEST'}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--slate-400)', fontWeight: 600 }}>Active User</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '6px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* RIGHT WORKSPACE PANELS */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}>

        {/* HEADER PANEL */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid var(--slate-200)',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          zIndex: 10
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--slate-800)' }}>
              {currentView === 'home' ? 'SYSTEM PORTAL WORKSPACE' : currentView.toUpperCase().replace('CUSTOMER', ' DETAILS')}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'var(--slate-100)',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--slate-600)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
              Connected
            </div>
          </div>
        </div>

        {/* WORKSPACE VIEWPORT */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: 'var(--bg-app)',
          position: 'relative'
        }}>
          {currentView === 'home' ? (
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: 'calc(100vh - 65px)',
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.85)), url(${homeBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              textAlign: 'center',
              padding: '40px'
            }}>
              <div className="animate-fade-in" style={{ maxWidth: '750px' }}>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  display: 'inline-block',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  marginBottom: '20px'
                }}>
                  🌍 TRAVEL AGENCY PORTAL
                </span>

                <h1 style={{
                  margin: '0 0 16px 0',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '48px',
                  lineHeight: 1.1,
                  textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  Welcome back, <span style={{ color: 'var(--brand-secondary)' }}>{username ? username.toUpperCase() : 'GUEST'}</span>!
                </h1>

                <p style={{
                  fontSize: '16px',
                  color: 'var(--slate-300)',
                  maxWidth: '600px',
                  margin: '0 auto 40px auto',
                  lineHeight: '1.6',
                  fontWeight: 500
                }}>
                  Manage holiday tours, view available hotels, register itineraries, process Paytm checkouts, and administer profiles from this central system control desk.
                </p>

                {/* Quick Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginTop: '20px'
                }}>
                  {[
                    { title: "Packages", desc: "Gold, Silver, Bronze", link: "checkPackage" },
                    { title: "Hotels Available", desc: "10 Premium Hotels", link: "checkHotels" },
                    { title: "Destinations", desc: "10 Featured Locales", link: "destinations" }
                  ].map((card, idx) => (
                    <div
                      key={idx}
                      onClick={() => setView(card.link)}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backdropFilter: 'blur(4px)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <h3 style={{ color: '#fff', fontSize: '18px', margin: '0 0 6px 0' }}>{card.title}</h3>
                      <p style={{ color: 'var(--slate-300)', fontSize: '12px', margin: 0, fontWeight: 600 }}>{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '40px' }}>
              {children}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;