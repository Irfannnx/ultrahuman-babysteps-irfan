'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// MAXIMIZED OUTER SPACING BETWEEN CARDS ACROSS THE STAGE
const SCATTER_CARDS = [
  // 1. Top-Left: Yellow cellular structure (image 2.jpg)
  {
    id: 'card-top-left',
    src: '/image 2.jpg',
    alt: 'Bio cellular structure',
    style: { top: '4%', left: '2%', width: '175px', height: '122px' },
  },
  // 2. Upper-Left Center: Back massage (image3.jpg)
  {
    id: 'card-upper-left-center',
    src: '/image3.jpg',
    alt: 'Performance recovery massage',
    style: { top: '24%', left: '14%', width: '145px', height: '110px' },
  },
  // 3. Mid-Left: Hand holding ring tracking (image4.jpg)
  {
    id: 'card-mid-left',
    src: '/image4.jpg',
    alt: 'Ultrahuman Ring tracking',
    style: { top: '48%', left: '0.5%', width: '180px', height: '130px' },
  },
  // 4. Bottom-Left: Vibrant blue cellular texture (image8.jpg)
  {
    id: 'card-bottom-left',
    src: '/image8.jpg',
    alt: 'Blue cellular biomarker texture',
    style: { top: '78%', left: '8%', width: '145px', height: '118px' },
  },
  // 5. Top-Right: Woman sitting in ice bath (image6.jpg)
  {
    id: 'card-top-right',
    src: '/image6.jpg',
    alt: 'Cold plunge ice bath therapy',
    style: { top: '4%', left: '87%', width: '155px', height: '200px' },
  },
  // 6. Mid-Right: Woman stretching blue background (image5.jpg)
  {
    id: 'card-mid-right',
    src: '/image5.jpg',
    alt: 'Athletic mobility & flexibility',
    style: { top: '34%', left: '77%', width: '165px', height: '118px' },
  },
  // 7. Lower-Right: Metabolic scanner bed (image7.jpg)
  {
    id: 'card-lower-right',
    src: '/image7.jpg',
    alt: 'Metabolic scan bed',
    style: { top: '54%', left: '88%', width: '165px', height: '135px' },
  },
  // 8. Bottom-Center-Right: Runner woman with mask (image9.jpg)
  {
    id: 'card-bottom-center-right',
    src: '/image9.jpg',
    alt: 'VO2 Max runner testing',
    style: { top: '70%', left: '60%', width: '150px', height: '190px' },
  },
];

export function GalleryGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.set('.scatter-card-item', { opacity: 1, scale: 0.9, y: 15 });
        gsap.set('#center-video-box', { scale: 1.15, opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '#diagnostic-scroll-section',
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
          },
        });

        tl.to('#center-video-box', { scale: 1, opacity: 1, duration: 1 }).to(
          '.scatter-card-item',
          { opacity: 1, scale: 1, y: 0, stagger: 0.05, duration: 1.2 },
          '<'
        );
      } else {
        gsap.set('.scatter-card-item', { opacity: 1, scale: 1, y: 0 });
        gsap.set('#center-video-box', { scale: 1, opacity: 1 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full pt-48 bg-[#EAEAEA]">
      <div
        id="diagnostic-scroll-section"
        ref={sectionRef}
        style={{
          position: 'relative',
          width: '100vw',
          height: '160vh',
          background: '#EAEAEA',
        }}
      >
        <div
          id="sticky-stage"
          style={{
            position: 'sticky',
            top: '120px',
            width: '100vw',
            height: 'calc(100vh - 120px)',
            overflow: 'hidden',
          }}
        >
          {/* ENLARGED 8 SCATTERED IMAGE CARDS */}
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
                zIndex: 4,
                background: '#000',
              }}
            >
              <img
                src={card.src}
                alt={card.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}

          {/* CENTER MINIMIZING VIDEO CONTAINER */}
          <div
            id="center-video-box"
            style={{
              position: 'absolute',
              top: '34%',
              left: '33%',
              width: '540px',
              height: '335px',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
              zIndex: 10,
              background: '#000',
            }}
          >
            <video
              ref={videoRef}
              src="/videofirstpage.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
