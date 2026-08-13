'use client';

import { useEffect, useRef, useState } from 'react';

const PANEL_CARDS = [
  {
    id: 1,
    title: 'Performance Score',
    image: '/perfscore.jpg?v=2',
    alt: 'Performance Score',
  },
  {
    id: 2,
    title: 'Personalised Roadmap',
    image: '/Personalised Roadmap.jpg?v=2',
    alt: 'Personalised Roadmap',
  },
  {
    id: 3,
    title: 'Know Your Real Biological Age',
    image: '/biological age.jpg?v=2',
    alt: 'Know Your Real Biological Age',
  },
  {
    id: 4,
    title: 'See Your Performance Curve',
    image: '/Performancecurve8.jpg?v=2',
    alt: 'See Your Performance Curve',
  },
  {
    id: 5,
    title: 'Every System, One View',
    image: '/everysystemoneview.jpg?v=2',
    alt: 'Every System, One View',
  },
  {
    id: 6,
    title: 'Inside Gold Standard Tests',
    image: '/insidegoldstandardtests.jpg?v=2',
    alt: 'Inside Gold Standard Tests',
  },
];

export function DeepestRead() {
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
      className="relative w-full py-20 md:py-32 bg-[#E8EAED]"
      id="deepest-read"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header Block (Exact Specs from Figma Screenshots) */}
        <div
          className="flex flex-col items-center text-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          {/* Title: VISION: THE DEEPEST READ OF YOU, EVER. */}
          <h2
            className="font-dharma-72 text-center mb-4"
            style={{
              color: '#000000',
            }}
          >
            VISION: THE DEEPEST READ OF YOU, EVER.
          </h2>

          {/* Paragraph (Exact Inter 400 14px 140% -0.6px Specs) */}
          <p
            className="text-center mb-8"
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '140%',
              letterSpacing: '-0.6px',
              color: '#000000',
              maxWidth: '580px',
            }}
          >
            Every insight is paired with an action plan, supplements, nutrition, exercise, and follow-up consultations, built around your biology and your goals. With up to 3500 markers, move from signals to systems to improve your health and performance.
          </p>

          {/* SEE SAMPLE DATA Button */}
          <a
            href="#sample-data"
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
            SEE SAMPLE DATA
          </a>
        </div>

        {/* 6 Square Cards Grid (2 Columns x 3 Rows - Matches Figma Aspect Ratio & Rounded Corner Specs) */}
        <div className="max-w-[1040px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {PANEL_CARDS.map((card, index) => (
            <div
              key={card.id}
              className="relative rounded-[24px] overflow-hidden aspect-square group cursor-pointer shadow-xl bg-black"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.8s ease ${0.3 + index * 0.1}s, transform 0.8s ease ${0.3 + index * 0.1}s`,
              }}
            >
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Card Label Bottom-Left & Circular Plus Button Bottom-Right */}
              <div className="absolute bottom-6 inset-x-6 flex items-center justify-between z-10 pointer-events-none">
                <span
                  style={{
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                    fontWeight: 450,
                    fontSize: '20px',
                    lineHeight: '130%',
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF',
                  }}
                >
                  {card.title}
                </span>

                <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-mono font-bold text-base shadow-md group-hover:scale-110 transition-transform pointer-events-auto">
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
