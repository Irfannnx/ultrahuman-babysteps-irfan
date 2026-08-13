'use client';

import { useEffect, useRef } from 'react';

export function ParallaxHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
      bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      bg.style.transform = 'translate(0px, 0px)';
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      id="clean-hero"
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#2b51ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* STATIC IMAGE CONTAINER (Zero scaling, pure translation, no filters) */}
      <div
        id="parallax-bg"
        ref={bgRef}
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
          willChange: 'transform',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img
          src="/-7.jpg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          alt="Performance Hero"
        />
      </div>

      {/* MINIMALISTIC OVERLAY FOR TEXT CONTRAST */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.15)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* CONTENT LAYER */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '0 20px',
          pointerEvents: 'none',
        }}
      >
        <h2
          className="font-dharma"
          style={{
            fontFamily: "'Dharma Gothic E', 'League Gothic', sans-serif",
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontStyle: 'italic',
            textTransform: 'uppercase',
            color: '#ffffff',
            letterSpacing: '2px',
            marginBottom: '24px',
            lineHeight: '100%',
          }}
        >
          EXPERIENCE THE FUTURE OF HUMAN PERFORMANCE
        </h2>
        <a
          href="#book"
          style={{
            pointerEvents: 'auto',
            display: 'inline-block',
            background: '#ffffff',
            color: '#000000',
            padding: '14px 36px',
            borderRadius: '30px',
            fontFamily: 'sans-serif',
            fontWeight: 700,
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontSize: '13px',
            letterSpacing: '1.5px',
          }}
          className="hover:opacity-90 hover:scale-105 active:scale-95 shadow-xl transition-all"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
