'use client';

import { useEffect, useState, useRef } from 'react';

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isPillDismissed, setIsPillDismissed] = useState(false);
  const [isPillAnimating, setIsPillAnimating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem('ultrahuman_tour_dismissed') === 'true';
    setIsPillDismissed(dismissed);
    setMounted(true);
  }, []);

  const handleDismiss = () => {
    setIsPillAnimating(true);
    setTimeout(() => {
      localStorage.setItem('ultrahuman_tour_dismissed', 'true');
      setIsPillDismissed(true);
      setIsPillAnimating(false);
    }, 500);
  };

  return (
    <section className="relative min-h-[calc(100vh-44px)] w-full flex flex-col justify-center items-center overflow-hidden bg-black text-white pt-[44px]" id="hero">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-bg.jpg"
        >
          <source src="/videofirstpage.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-[1]" />

      {/* Exact Figma Hero Content Frame: 487px Hug Width x 193px Hug Height */}
      <div className="relative z-10 text-center flex flex-col items-center justify-between w-[487px] max-w-[92vw] h-[193px] mx-auto mt-10">
        {/* Line 1: PERFORMANCE LAB
            Exact Figma Layout: Width: 487px, Height: 74px
        */}
        <h1 className="w-full h-[74px] flex items-center justify-center overflow-hidden">
          <img
            src="/Section Heading.png"
            alt="PERFORMANCE LAB"
            className="w-[487px] max-w-full h-[74px] object-fill drop-shadow-2xl"
          />
        </h1>

        {/* Line 2: Experience the Future Of Human Performance
            Exact Figma Specs: Font: Inter, Weight: 500 (Medium), Size: 24px, Line height: 34px, Letter spacing: -1px, Color: #FFFFFF
        */}
        <p
          className="flex items-center justify-center text-center whitespace-nowrap w-full h-[34px] antialiased"
          style={{
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '24px',
            lineHeight: '34px',
            letterSpacing: '-1px',
            color: '#FFFFFF',
            width: '487px',
            height: '34px',
            textAlign: 'center',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          Experience the Future Of Human Performance
        </p>

        {/* Line 3: Action Buttons — Exact Figma JetBrains Mono Specs
            Font: JetBrains Mono, Weight: 500, Style: Medium, Size: 12px, Line height: 140%, Letter spacing: 0%, Color: #FFFFFF
        */}
        <div className="flex items-center justify-center gap-3.5 w-full">
          {/* EXPLORE PLANS Button */}
          <a
            href="#explore-plans"
            className="bg-[#1539F5] hover:bg-blue-600 rounded-full transition-all duration-200 shadow-xl shadow-blue-600/30 hover:scale-[1.03] active:scale-95 flex items-center justify-center"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '140%',
              letterSpacing: '0%',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              padding: '11px 24px',
            }}
          >
            EXPLORE PLANS
          </a>

          {/* PLAY VIDEO Button */}
          <button
            type="button"
            className="bg-zinc-900/60 hover:bg-zinc-800/80 backdrop-blur-md border border-white/20 rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '140%',
              letterSpacing: '0%',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              padding: '11px 24px',
            }}
          >
            <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            PLAY VIDEO
          </button>
        </div>
      </div>

      {/* Coordinates Readout - Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
        <img
          src="/bengalurucoordinates.png"
          alt="BENGALURU • 12.963° N 77.641° E"
          className="h-7 sm:h-8 w-auto opacity-90 hover:opacity-100 transition-opacity drop-shadow-lg"
        />
      </div>

      {/* Book a Tour Pill & Chat Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {mounted && !isPillDismissed && (
          <div
            className={`transition-all duration-500 ease-out ${
              isPillAnimating ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="relative group">
              <img
                src="/bookatourbutton.png"
                alt="Book A Tour"
                className="h-11 sm:h-12 w-auto rounded-full cursor-pointer hover:scale-105 transition-transform drop-shadow-2xl"
              />
              <button
                onClick={handleDismiss}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Chat Button */}
        <button
          aria-label="Open Chat"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden hover:scale-110 transition-transform drop-shadow-2xl border border-white/10"
        >
          <img src="/chatbutton.png" alt="Chat" className="w-full h-full object-cover" />
        </button>
      </div>
    </section>
  );
}
