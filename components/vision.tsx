'use client';

import { useEffect, useRef, useState } from 'react';

import { ParallaxHero } from '@/components/parallax-hero';

export function VisionSection() {
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
    <div ref={sectionRef as any} className="w-full flex flex-col">
      {/* Section 1: A NEW PINCODE FOR BETTER HEALTH (Light neutral gray #E8EAED background) */}
      <section className="relative w-full py-24 md:py-32 bg-[#E8EAED] text-black" id="pincode">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          
          {/* Header: A NEW PINCODE FOR BETTER HEALTH */}
          <h2
            className="font-dharma-72 text-center text-black mb-10 max-w-[600px]"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 72px)',
              lineHeight: '90%',
              letterSpacing: '0px',
              color: '#000000',
              textTransform: 'uppercase',
            }}
          >
            A NEW PINCODE FOR<br />BETTER HEALTH.
          </h2>

          {/* Building Photo: uhbuilding.jpg with rounded corners */}
          <a
            href="https://maps.app.goo.gl/unHFAYGcKSX6T7Vd9"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full max-w-[520px] aspect-[1.55/1] rounded-[24px] overflow-hidden shadow-2xl mb-12 group cursor-pointer block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            <img
              src="/uhbuilding.jpg"
              alt="Ultrahuman Performance Lab Building"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </a>

          {/* Sub-block 1: FIND US */}
          <div className="flex flex-col items-center mb-8 text-center">
            <h3
              className="font-dharma-32 text-center text-black mb-2"
              style={{
                fontSize: '32px',
                lineHeight: '90%',
                letterSpacing: '0px',
                color: '#000000',
                textTransform: 'uppercase',
              }}
            >
              FIND US
            </h3>
            <p
              className="mb-2 text-center"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '140%',
                letterSpacing: '-0.6px',
                color: '#000000',
              }}
            >
              Smart Towers, HAL 2nd Stage, Domlur,<br />
              Bengaluru, 560008
            </p>
            <a
              href="https://maps.app.goo.gl/unHFAYGcKSX6T7Vd9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-center hover:opacity-80 transition-opacity mt-1"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '160%',
                letterSpacing: '-0.6px',
                color: '#000000',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              Get Directions ↗
            </a>
          </div>

          {/* Sub-block 2: OPENING HOURS */}
          <div className="flex flex-col items-center text-center">
            <h3
              className="font-dharma-32 text-center text-black mb-2"
              style={{
                fontSize: '32px',
                lineHeight: '90%',
                letterSpacing: '0px',
                color: '#000000',
                textTransform: 'uppercase',
              }}
            >
              OPENING HOURS
            </h3>
            <p
              className="text-center"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '140%',
                letterSpacing: '-0.6px',
                color: '#000000',
              }}
            >
              Monday - Saturday<br />
              11 AM - 7 PM
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: PARALLAX HERO CONTAINER */}
      <ParallaxHero />
    </div>
  );
}
