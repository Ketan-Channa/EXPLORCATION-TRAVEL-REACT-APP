import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

import dest1 from '../assets/dest1.jpg';
import dest2 from '../assets/dest2.jpg';
import dest3 from '../assets/dest3.jpg';
import dest4 from '../assets/dest4.jpg';
import dest5 from '../assets/dest5.jpg';
import dest6 from '../assets/dest6.jpg';
import dest7 from '../assets/dest7.jpg';
import dest8 from '../assets/dest8.jpg';
import dest9 from '../assets/dest9.jpg';
import dest10 from '../assets/dest10.jpg';

function Destinations({ onBack }) {
  const destinationsList = [
    { name: "Kashmir Mountains, India", desc: "Experience heaven on earth with snow-capped valleys and beautiful lakes.", image: dest1 },
    { name: "Goa Beach Resort, India", desc: "Unwind on sandy shores with clear waters and vibrant coastal nightlife.", image: dest2 },
    { name: "Paris Skyline, France", desc: "Discover romantic streets, high art, historic architecture, and cafes.", image: dest3 },
    { name: "Swiss Alps, Switzerland", desc: "Enjoy pure mountain air, skiing terrains, and picturesque cable car trails.", image: dest4 },
    { name: "Kyoto Gardens, Japan", desc: "Walk through serene bamboo groves, shrines, and traditional teahouses.", image: dest5 },
    { name: "Grand Canyon, Arizona, USA", desc: "Marvel at geological layers, layered red rock cliffs, and hiking paths.", image: dest6 },
    { name: "Sydney Harbour, Australia", desc: "View the iconic architectural sails, ocean walkways, and bridge spans.", image: dest7 },
    { name: "Pyramids of Giza, Egypt", desc: "Step back in time to explore sand ruins, ancient history, and mysteries.", image: dest8 },
    { name: "Venice Canals, Italy", desc: "Tour the floating city by gondola through waterways and palace gates.", image: dest9 },
    { name: "Santorini Caldera, Greece", desc: "Relax by whitewashed cliffside estates facing the deep blue Aegean sea.", image: dest10 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % destinationsList.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isPlaying, destinationsList.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + destinationsList.length) % destinationsList.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinationsList.length);
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
          <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Featured Destinations</h3>
          <p style={{ color: 'var(--slate-400)', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
            Scroll through our 10 curated global hotspots for tour planning
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
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.85) 100%), url(${destinationsList[currentIndex].image})`,
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
            LOCATION {currentIndex + 1} OF {destinationsList.length}
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

          {/* Destination Caption Details & Action Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#fff',
            textAlign: 'left',
            zIndex: 2
          }}>
            <div style={{ maxWidth: '80%' }}>
              <span style={{ 
                color: 'var(--brand-secondary)', 
                fontSize: '12px', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                display: 'block',
                marginBottom: '6px'
              }}>
                Featured Spot
              </span>
              <h2 style={{ color: '#fff', fontSize: '32px', fontWeight: 800, margin: '0 0 6px 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {destinationsList[currentIndex].name}
              </h2>
              <p style={{ color: 'var(--slate-200)', fontSize: '14px', margin: 0, fontWeight: 500, lineHeight: 1.4, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                {destinationsList[currentIndex].desc}
              </p>
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
                transition: 'transform 0.2s',
                flexShrink: 0
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
          {destinationsList.map((_, index) => (
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

export default Destinations;