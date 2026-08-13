'use client';

import { useEffect, useRef, useState } from 'react';

export function Recovery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full" id="recovery">
      {/* Top: Two-column visual cards with original uploaded assets */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left: Your Body Is Talking */}
        <div
          className="relative w-full aspect-[4/3] overflow-hidden group cursor-pointer"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          <img
            src="/Bodyistalking.jpg"
            alt="Your Body Is Talking"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
            <h3 className="text-white text-2xl font-bold font-sans">Your Body Is Talking</h3>
          </div>
        </div>

        {/* Right: Where Every Session Compounds */}
        <div
          className="relative w-full aspect-[4/3] overflow-hidden group cursor-pointer"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
          }}
        >
          <img
            src="/whereeverysessioncompounds.jpg"
            alt="Where Every Session Compounds"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
            <h3 className="text-white text-2xl font-bold font-sans">Where Every Session Compounds</h3>
          </div>
        </div>
      </div>

      {/* Bottom: Text content */}
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-0"
        style={{ backgroundColor: '#E8EAED' }}
      >
        {/* Left: Inside Gold Standard Tests */}
        <div
          className="px-8 md:px-16 py-16 md:py-20 flex flex-col justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.2,
              color: '#1A1A1A',
              marginBottom: '16px',
            }}
          >
            Inside Gold Standard Tests
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              color: '#71717A',
              maxWidth: '400px',
            }}
          >
            Clinical-grade diagnostics powered by cutting-edge lab technology, 
            analyzed by board-certified specialists across 16+ test categories.
          </p>
        </div>

        {/* Right: DRIVE YOUR RECOVERY */}
        <div
          className="px-8 md:px-16 py-16 md:py-20 flex flex-col justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s',
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.2,
              color: '#1A1A1A',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            DRIVE YOUR RECOVERY
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              color: '#71717A',
              maxWidth: '400px',
              marginBottom: '24px',
            }}
          >
            Sleep optimization, cold exposure, nutrition, and cutting-edge 
            therapies — unified into a comprehensive recovery system, 
            helping your body reset, rebuild, and perform at its peak.
          </p>
          <a
            href="#explore-recovery"
            className="inline-flex items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-95 self-start"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              padding: '12px 28px',
              backgroundColor: '#1539F5',
            }}
          >
            EXPLORE
          </a>
        </div>
      </div>
    </section>
  );
}
