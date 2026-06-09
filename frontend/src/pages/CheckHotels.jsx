import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

import hotel1 from '../assets/hotel1.jpg';
import hotel2 from '../assets/hotel2.jpg';
import hotel3 from '../assets/hotel3.jpg';
import hotel4 from '../assets/hotel4.jpg';
import hotel5 from '../assets/hotel5.jpg';
import hotel6 from '../assets/hotel6.jpg';
import hotel7 from '../assets/hotel7.jpg';
import hotel8 from '../assets/hotel8.jpg';
import hotel9 from '../assets/hotel9.jpg';
import hotel10 from '../assets/hotel10.jpg';

function CheckHotels({ onBack }) {
  const hotelList = [
    { name: "J.W. MARRIOT HOTEL", image: hotel1 },
    { name: "MANDRIN HOTEL", image: hotel2 },
    { name: "FOUR SEASONS HOTEL", image: hotel3 },
    { name: "RADISON BLUE HOTEL", image: hotel4 },
    { name: "CLASSIO HOTEL", image: hotel5 },
    { name: "THE BAY CLUB HOTEL", image: hotel6 },
    { name: "BREEZE BLOW HOTEL", image: hotel7 },
    { name: "THE TAJ HOTEL", image: hotel8 },
    { name: "HAPPY MORNING HOTEL", image: hotel9 },
    { name: "RIVER VIEW HOTEL", image: hotel10 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hotelList.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isPlaying, hotelList.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + hotelList.length) % hotelList.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hotelList.length);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      
      {/* Header Panel */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px'
      }}>
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Explore Hotel Chains</h3>
          <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
            Browse catalog of our 10 partnered luxury hotel chains
          </p>
        </div>
        <button 
          onClick={onBack} 
          className="btn btn-secondary"
          style={{ gap: '6px' }}
        >
          <ArrowLeft size={16} />
          BACK
        </button>
      </div>

      {/* Main Slideshow Container */}
      <div className="modern-card animate-fade-in" style={{
        padding: 0,
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        position: 'relative',
        boxShadow: 'var(--card-shadow-hover)'
      }}>
        
        {/* Slideshow Image and Gradient Overlay */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '480px',
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%), url(${hotelList[currentIndex].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '40px'
        }}>
          
          {/* Slide Indicator Badge */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(4px)',
            color: '#fff',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            HOTEL {currentIndex + 1} OF {hotelList.length}
          </div>

          {/* Left/Right Chevron Controls */}
          <button 
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              zIndex: 3
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              zIndex: 3
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>

          {/* Hotel Info Caption & Action Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#fff',
            textAlign: 'left',
            zIndex: 2
          }}>
            <div>
              <span style={{ 
                color: 'var(--brand-secondary)', 
                fontSize: '12px', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                display: 'block',
                marginBottom: '6px'
              }}>
                Luxury Partner Chain
              </span>
              <h2 style={{ color: '#fff', fontSize: '32px', fontWeight: 800, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {hotelList[currentIndex].name}
              </h2>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-primary)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(59,130,246,0.4)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" style={{ marginLeft: '2px' }} />}
            </button>
          </div>

        </div>

        {/* Slide Selector Dots Indicators */}
        <div style={{
          padding: '20px',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          borderTop: '1px solid var(--border-color)'
        }}>
          {hotelList.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)}
              style={{
                width: index === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: index === currentIndex ? 'var(--brand-primary)' : 'var(--slate-300)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

export default CheckHotels;