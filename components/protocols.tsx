'use client';

import { useEffect, useRef, useState } from 'react';

const RECOVERY_PROTOCOLS = [
  'HYPERBARIC OXYGEN THERAPY (HBOT)',
  'INFRARED SAUNA',
  'COLD PLUNGE',
  'WHOLE BODY CRYOTHERAPY',
  'INVERSION TABLE',
  'POWERPLATE',
  'COMPRESSION',
  'IV THERAPY',
  'IM INJECTIONS',
  'SPORTS MASSAGES',
];

export function Protocols() {
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
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-black text-white overflow-hidden"
      id="protocols"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Span 5 Columns): RECOVER SMARTER Header, Description, BOOK NOW Button, & All 10 Protocol Accordion Items */}
        <div className="lg:col-span-5 flex flex-col items-start pt-2 z-20">
          {/* Header: RECOVER SMARTER */}
          <h2
            className="font-dharma-48 mb-4"
            style={{
              width: '260px',
              color: '#FFFFFF',
            }}
          >
            RECOVER SMARTER
          </h2>

          {/* Description */}
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '140%',
              letterSpacing: '-0.6px',
              color: '#FFFFFF',
              maxWidth: '462px',
            }}
          >
            A curated suite of evidence-backed recovery protocols designed to accelerate cellular repair, reduce inflammation, and optimize metabolic recovery.
          </p>

          {/* BOOK NOW Button */}
          <a
            href="#book-now"
            className="inline-flex items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-md mb-8"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              padding: '10px 24px',
              backgroundColor: '#1539F5',
            }}
          >
            BOOK NOW
          </a>

          {/* All 10 Protocol Accordion Items (Every single item has '+' icon styled on far right) */}
          <div className="w-full flex flex-col border-t border-white/10 max-w-[462px]">
            {RECOVERY_PROTOCOLS.map((protocol) => (
              <div
                key={protocol}
                className="py-3.5 border-b border-white/10 flex items-center justify-between group cursor-pointer hover:pl-1.5 transition-all duration-200"
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '130%',
                    letterSpacing: '0px',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                  }}
                >
                  {protocol}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    fontWeight: 400,
                    fontSize: '16px',
                    color: '#FFFFFF',
                  }}
                  className="group-hover:scale-125 transition-transform"
                >
                  +
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Span 7 Columns): 10+ PROTOCOLS & Massively Scaled Video with High-Tech HUD Bounding Box */}
        <div className="lg:col-span-7 flex flex-col relative min-h-[780px] overflow-visible">
          {/* Top Text: 10+ PROTOCOLS. DESIGNED TO WORK. */}
          <div className="absolute top-0 left-0 z-30">
            <p
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '140%',
                letterSpacing: '0px',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                maxWidth: '177px',
              }}
            >
              10+ PROTOCOLS.<br />
              DESIGNED TO WORK.
            </p>
          </div>

          {/* Massively Scaled Video Container with overflow: visible */}
          <div className="relative w-full h-[720px] lg:h-[780px] flex items-center justify-center pt-8 overflow-visible">
            
            {/* High-Tech HUD Reticle Ticks Framing Scaled Figure (No outer square border) */}
            <div className="absolute inset-x-4 md:inset-x-12 inset-y-12 pointer-events-none z-20 flex flex-col justify-between p-4">
              {/* Corner crosshairs */}
              <div className="flex justify-between items-start text-white/50 font-mono text-[11px] select-none">
                <span>+</span>
                <span>+</span>
              </div>
              <div className="flex justify-between items-end text-white/50 font-mono text-[11px] select-none">
                <span>+</span>
                <span>+</span>
              </div>
              {/* Center Targeting Reticle Line Ticks */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-white/40" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-6 bg-white/40" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-6 bg-white/40" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-6 bg-white/40" />
            </div>

            {/* Thermal Video Figure Seamlessly Blended (mixBlendMode: screen + contrast adjustment) */}
            <video
              className="w-full h-full object-contain relative z-10 pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
              style={{
                mixBlendMode: 'screen',
                filter: 'contrast(160%) brightness(105%)',
                transform: 'scale(1.7)',
                opacity: 1,
              }}
            >
              <source src="/BabyTrack Blob Tracking (1).mp4" type="video/mp4" />
            </video>
          </div>
        </div>

      </div>
    </section>
  );
}
