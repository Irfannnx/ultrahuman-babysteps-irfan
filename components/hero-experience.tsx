'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// SCATTER CARDS WITH GUARANTEED CLEARANCE AROUND CENTER VIDEO (ZERO OVERLAP)
const SCATTER_CARDS = [
  // 1. Top-Left: Yellow cellular structure (image 2.jpg)
  {
    id: 'card-top-left',
    src: '/image 2.jpg',
    alt: 'Bio cellular structure',
    style: { top: '7%', left: '3%', width: '165px', height: '115px' },
  },
  // 2. Upper-Left Center: Back massage (image3.jpg) - Shifted left to clear center video
  {
    id: 'card-upper-left-center',
    src: '/image3.jpg',
    alt: 'Performance recovery massage',
    style: { top: '24%', left: '12%', width: '135px', height: '100px' },
  },
  // 3. Mid-Left: Hand holding ring tracking (image4.jpg)
  {
    id: 'card-mid-left',
    src: '/image4.jpg',
    alt: 'Ultrahuman Ring tracking',
    style: { top: '48%', left: '1%', width: '170px', height: '120px' },
  },
  // 4. Bottom-Left: Vibrant blue cellular texture (image8.jpg)
  {
    id: 'card-bottom-left',
    src: '/image8.jpg',
    alt: 'Blue cellular biomarker texture',
    style: { top: '76%', left: '10%', width: '140px', height: '112px' },
  },
  // 5. Top-Right: Woman sitting in ice bath (image6.jpg)
  {
    id: 'card-top-right',
    src: '/image6.jpg',
    alt: 'Cold plunge ice bath therapy',
    style: { top: '6%', left: '85%', width: '150px', height: '190px' },
  },
  // 6. Mid-Right: Woman stretching blue background (image5.jpg) - Shifted right to clear center video
  {
    id: 'card-mid-right',
    src: '/image5.jpg',
    alt: 'Athletic mobility & flexibility',
    style: { top: '36%', left: '76%', width: '155px', height: '110px' },
  },
  // 7. Lower-Right: Metabolic scanner bed (image7.jpg)
  {
    id: 'card-lower-right',
    src: '/image7.jpg',
    alt: 'Metabolic scan bed',
    style: { top: '53%', left: '87%', width: '155px', height: '128px' },
  },
  // 8. Bottom-Center-Right: Runner woman with mask (image9.jpg)
  {
    id: 'card-bottom-center-right',
    src: '/image9.jpg',
    alt: 'VO2 Max runner testing',
    style: { top: '69%', left: '60%', width: '145px', height: '180px' },
  },
];

export function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const bgCanvasRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isPillDismissed, setIsPillDismissed] = useState(false);
  const [isPillAnimating, setIsPillAnimating] = useState(false);

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

  useEffect(() => {
    if (!containerRef.current || !videoWrapperRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Initial GSAP Setup for scatter cards
        gsap.set('.scatter-card-item', {
          opacity: 0,
          filter: 'blur(12px)',
          scale: 0.8,
          y: 30,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=120%',
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
          },
        });

        // 1. Hero Text Content & Overlay fade out early in scroll
        tl.to(
          heroContentRef.current,
          {
            opacity: 0,
            y: -50,
            duration: 0.3,
            ease: 'power2.out',
          },
          0
        );

        // 2. Background canvas transitions from black to light grey #EAEAEA
        tl.to(
          bgCanvasRef.current,
          {
            backgroundColor: '#EAEAEA',
            duration: 0.4,
            ease: 'power2.out',
          },
          0.05
        );

        // 3. Hero Video collapses & shrinks evenly around center without aspect ratio skewing (480px x 300px)
        tl.to(
          videoWrapperRef.current,
          {
            width: '480px',
            height: '300px',
            borderRadius: '18px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
            duration: 0.7,
            ease: 'power2.out',
          },
          0.1
        );

        // 4. Surrounding 8 scatter cards appear with BLUR + FADE-IN
        tl.to(
          '.scatter-card-item',
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power2.out',
          },
          0.4
        );
      } else {
        gsap.set(heroContentRef.current, { opacity: 1 });
        gsap.set(videoWrapperRef.current, {
          width: '480px',
          height: '300px',
          borderRadius: '18px',
        });
        gsap.set('.scatter-card-item', {
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          y: 0,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#EAEAEA]"
      id="hero-experience"
    >
      {/* STICKY VIEWPORT STAGE */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pt-[44px]">
        {/* Background Canvas: Color animates from #000000 to #EAEAEA */}
        <div
          ref={bgCanvasRef}
          className="absolute inset-0 bg-black z-0 transition-colors"
        />

        {/* HERO CONTENT OVERLAY (Title, Subtitle, Buttons, Coordinates) */}
        <div
          ref={heroContentRef}
          className="relative z-30 text-center flex flex-col items-center justify-between w-[487px] max-w-[92vw] h-[193px] mx-auto mt-6 pointer-events-auto"
        >
          {/* Section Heading Image */}
          <h1 className="w-full h-[74px] flex items-center justify-center overflow-hidden">
            <img
              src="/Section Heading.png"
              alt="PERFORMANCE LAB"
              className="w-[487px] max-w-full h-[74px] object-fill drop-shadow-2xl"
            />
          </h1>

          {/* Subtitle */}
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

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3.5 w-full">
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

          {/* Coordinates Readout - Bottom Center */}
          <div className="absolute top-[480px] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
            <img
              src="/bengalurucoordinates.png"
              alt="BENGALURU • 12.963° N 77.641° E"
              className="h-7 sm:h-8 w-auto opacity-90 drop-shadow-lg"
            />
          </div>
        </div>

        {/* CONTINUOUS HERO VIDEO CONTAINER: Dead-centered, shrinks to 480px x 300px with zero overlap */}
        <div
          ref={videoWrapperRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden bg-black shadow-2xl"
          style={{
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
          }}
        >
          <video
            className="w-full h-full object-cover block"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-bg.jpg"
          >
            <source src="/videofirstpage.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 8 SURROUNDING SCATTER IMAGE CARDS: Emerge with Blur & Fade-In */}
        {SCATTER_CARDS.map((card) => (
          <div
            key={card.id}
            className="scatter-card-item"
            style={{
              position: 'absolute',
              ...card.style,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 14px 40px rgba(0,0,0,0.15)',
              zIndex: 20,
              background: '#000',
            }}
          >
            <img
              src={card.src}
              alt={card.alt}
              className="w-full h-full object-cover block"
            />
          </div>
        ))}

        {/* Book a Tour Pill & Chat Button - Fixed Bottom Right */}
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

          <button
            aria-label="Open Chat"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden hover:scale-110 transition-transform drop-shadow-2xl border border-white/10"
          >
            <img src="/chatbutton.png" alt="Chat" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  );
}
