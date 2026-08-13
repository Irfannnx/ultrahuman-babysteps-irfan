'use client';

import { useEffect, useRef, useState } from 'react';

const DIAGNOSTIC_TESTS = [
  'BLOOD VISION',
  'BODY COMPOSITION ANALYSIS',
  'ELECTROCARDIOGRAM',
  'VISION',
  'HEARING',
  'ORAL HEALTH',
  'COGNITION',
  'LUNG HEALTH',
  'VO₂ MAX',
  'MUSCULOSKELETAL ASSESSMENT (BASIC)',
  'MUSCULOSKELETAL ASSESSMENT (PRO)',
  'NUTRITION',
  'NUTRIDNA',
  'GENOMIC HEALTH INSIGHTS',
  'GUT MICROBIOME TESTING',
  'SLEEP STUDY POLYSOMNOGRAPHY',
];

export function DeepDiagnostics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#E8EAED] pt-6 pb-16 md:pb-24 overflow-hidden" id="deep-diagnostics">
      {/* Part 1: LOOK BEYOND THE PRESENT / INSIGHT & ACTION / DRIVE YOUR FUTURE */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
        {/* Left Column: LOOK BEYOND THE PRESENT */}
        <div className="lg:col-span-3 flex flex-col justify-center items-start lg:self-start lg:pt-16">
          <h3
            className="mb-4 uppercase"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0px',
              color: '#000000',
            }}
          >
            LOOK BEYOND THE PRESENT
          </h3>
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '160%',
              letterSpacing: '-0.6px',
              color: '#3F3F46',
              maxWidth: '272.5px',
            }}
          >
            Advanced diagnostics across XX+ markers — metabolism, cardiovascular fitness, body composition, biomechanics, sleep, and genetics — all connected. Each signal informs the next, giving you one unified system of clarity and context.
          </p>
          <a
            href="#explore-plans"
            className="inline-flex items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-md"
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
            EXPLORE PLANS
          </a>
        </div>

        {/* Center Column: Stacked INSIGHT & ACTION Cards */}
        <div className="lg:col-span-6 flex flex-col gap-3 items-center">
          <div
            className="relative w-full max-w-[648px] aspect-[648/486] rounded-[24px] overflow-hidden group cursor-pointer shadow-2xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            <img
              src="/insight.png"
              alt="INSIGHT"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: '50% 15%' }}
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center" />
            <h3 className="font-dharma absolute inset-0 flex items-center justify-center text-center select-none pointer-events-none drop-shadow-lg">
              INSIGHT
            </h3>
          </div>

          <div
            className="relative w-full max-w-[648px] aspect-[648/486] rounded-[24px] overflow-hidden group cursor-pointer shadow-2xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
            }}
          >
            <img
              src="/Action.jpg"
              alt="ACTION"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center" />
            <h3 className="font-dharma absolute inset-0 flex items-center justify-center text-center select-none pointer-events-none drop-shadow-lg">
              ACTION
            </h3>
          </div>
        </div>

        {/* Right Column: DRIVE YOUR FUTURE */}
        <div className="lg:col-span-3 flex flex-col justify-center items-start lg:self-end lg:pb-16">
          <h3
            className="mb-4 uppercase"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0px',
              color: '#000000',
            }}
          >
            DRIVE YOUR FUTURE
          </h3>
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '160%',
              letterSpacing: '-0.6px',
              color: '#3F3F46',
              maxWidth: '272.5px',
            }}
          >
            Sleep optimization, breathwork, cold exposure, nutrition, and movement therapies — unified into one cohesive recovery system. Every signal works in sync, helping your body restore, adapt, and perform at its best.
          </p>
          <a
            href="#explore-plans"
            className="inline-flex items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-md"
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
            EXPLORE PLANS
          </a>
        </div>
      </div>

      {/* Part 2: DEEP DIAGNOSTICS SECTION (Precise Alignment Matching Reference Screenshot 2) */}
      <div
        className="w-full border-t border-black/10 pt-4 pb-8"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          background: '#EAEAEA',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          alignItems: 'start',
          padding: '20px 40px',
          boxSizing: 'border-box',
        }}
      >
        {/* LEFT COLUMN: MODEL & MARKER TEXT & HUD OVERLAY */}
        <div
          className="relative w-full h-[680px] flex flex-col items-center justify-start pt-2"
        >
          {/* Top-Left Text Placement: Slightly above */}
          <div
            style={{
              position: 'absolute',
              top: '0px',
              left: '20px',
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontSize: '11px',
              lineHeight: 1.4,
              color: '#000',
              letterSpacing: '0.5px',
              zIndex: 20,
            }}
          >
            120+ MARKERS.<br />
            ONE COMPLETE PICTURE.
          </div>

          {/* SINGLE Clean HUD Overlay Lines & Coordinate Targeting Box matching Screenshot 2 */}
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            {/* Top Tick Line: | */}
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[1.5px] h-7 bg-black/40" />
            {/* Bottom Tick Line: | */}
            <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[1.5px] h-7 bg-black/40" />
            {/* Left Tick Line: — */}
            <div className="absolute left-[10px] top-[36%] -translate-y-1/2 h-[1.5px] w-7 bg-black/40" />
            {/* Right Tick Line: — */}
            <div className="absolute right-[10px] top-[36%] -translate-y-1/2 h-[1.5px] w-7 bg-black/40" />

            {/* Single Waist Coordinate Target Box (X:950 Y:345) */}
            <div className="absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[175px] border border-black/35">
              <span className="absolute top-1 left-2 font-mono text-[9px] text-black/70 tracking-wider">
                X:950 Y:345
              </span>
            </div>
          </div>

          {/* 3D Body Video Container - Scaled up a slight bit */}
          <div className="relative w-full h-[640px] flex items-center justify-center overflow-hidden pt-2">
            <video
              src="/120+markers -onecompletepicture.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{
                height: '100%',
                maxHeight: '630px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                mixBlendMode: 'darken',
                transform: 'scale(1.30)',
              }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: DIAGNOSTICS CONTENT & ACCORDION */}
        <div
          style={{
            paddingLeft: '40px',
            maxWidth: '580px',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <h2
            className="font-dharma"
            style={{
              fontFamily: "'Dharma Gothic E', 'League Gothic', sans-serif",
              fontSize: '52px',
              fontStyle: 'italic',
              textTransform: 'uppercase',
              color: '#000000',
              marginBottom: '16px',
              lineHeight: 1,
            }}
          >
            DEEP DIAGNOSTICS
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: '14px',
              color: '#333333',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            A curated suite of evidence-backed recovery protocols designed to accelerate cellular repair, reduce inflammation, and optimize metabolic recovery.
          </p>
          <a
            href="#book"
            style={{
              display: 'inline-block',
              background: '#2b51ff',
              color: '#ffffff',
              padding: '12px 30px',
              borderRadius: '25px',
              fontFamily: "var(--font-mono), 'JetBrains Mono', sans-serif",
              fontWeight: 700,
              textDecoration: 'none',
              textTransform: 'uppercase',
              fontSize: '11px',
              letterSpacing: '1px',
              marginBottom: '40px',
            }}
            className="hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            Book Now
          </a>

          {/* Clean Accordion List */}
          <div style={{ borderTop: '1px solid #d0d0d0' }}>
            {DIAGNOSTIC_TESTS.map((test, index) => (
              <div key={test} style={{ borderBottom: '1px solid #d0d0d0' }}>
                <div
                  onClick={() => toggleAccordion(index)}
                  style={{
                    padding: '16px 0',
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#000',
                  }}
                  className="hover:opacity-75 transition-opacity"
                >
                  <span>{test}</span>
                  <span style={{ fontSize: '16px', fontWeight: 400 }}>
                    {openIndex === index ? '−' : '+'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
