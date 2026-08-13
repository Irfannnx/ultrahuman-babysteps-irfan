'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PANELS = [
  { id: 'panel-1', alt: "YOUR HEALTH DOESN'T MOVE IN STRAIGHT LINES.", isLightGrayBg: true },
  { id: 'panel-2', image: '/Bodyistalking-1.jpg', alt: 'YOUR BODY IS TALKING' },
  { id: 'panel-3', image: '/but-most-2.jpg', alt: 'BUT MOST' },
  { id: 'panel-4', image: '/healthsystems-arentlistening-3.jpg', alt: "HEALTH SYSTEMS AREN'T LISTENING" },
  { id: 'panel-5', image: '/sowebuiltonethathas-4.jpg', alt: 'SO WE BUILT ONE THAT DOES' },
  { id: 'panel-6', image: '/everyinsightinformed-5.jpg', alt: 'EVERY INSIGHT INFORMED BY WHAT COMES NEXT' },
  { id: 'panel-7', image: '/whereeverysessioncompounds-6.jpg', alt: 'WHERE EVERY SESSION COMPOUNDS ON THE LAST' },
  { id: 'panel-8', image: '/shapedbyyourphysiology-7.jpg', alt: 'SHAPED BY YOUR PHYSIOLOGY' },
];

export function PhilosophySection() {
  const masterContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !masterContainerRef.current) return;

    const ctx = gsap.context(() => {
      // THE RESTORED CUSTOM ANIMATIONS
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#master-scroll-container',
          pin: true,
          start: 'top top',
          end: '+=15000',
          scrub: 2,
        },
      });

      // 1. The Clockwise Rotate Out
      tl.to('.txt-1', { opacity: 0, scale: 0.5, rotation: 15, duration: 2 })
        .to('.bg-1', { opacity: 0, duration: 1 }, '<')
        .to('.bg-2', { opacity: 1, duration: 1 }, '<');

      // 2. The Free-Falling Pendulum ("your body is talking")
      tl.fromTo(
        '.txt-2',
        { opacity: 0, rotation: -10, transformOrigin: 'left top', y: -100 },
        { opacity: 1, rotation: 0, y: 0, duration: 2 }
      ).to('.txt-2', { opacity: 0, rotation: 15, y: 200, duration: 2 });

      // 3. The Letter Spacing Collapse ("but most")
      tl.to('.bg-3', { opacity: 1, duration: 1 }, '-=1')
        .fromTo(
          '.txt-3',
          { opacity: 0, letterSpacing: '40px', filter: 'blur(10px)' },
          { opacity: 1, letterSpacing: '0px', filter: 'blur(0px)', duration: 2 }
        )
        .to('.txt-3', { opacity: 0, scale: 1.2, duration: 2 });

      // 4. The Morph/Push ("HEALTH SYSTEMS" -> "AREN'T LISTENING")
      tl.to('.bg-4', { opacity: 1, duration: 1 }, '-=1')
        .to('.txt-4-container', { opacity: 1, duration: 0.1 })
        .fromTo('.txt-4a', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 })
        .to('.txt-4a', { opacity: 0, y: 50, duration: 1.5 })
        .fromTo('.txt-4b', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, '<')
        .to('.txt-4-container', { opacity: 0, duration: 1 });

      // 5. Standard Fade In/Out
      tl.to('.bg-5', { opacity: 1, duration: 1 }, '-=0.5')
        .fromTo('.txt-5', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 2 })
        .to('.txt-5', { opacity: 0, y: -30, duration: 2 });

      // 6. Diagonal Travel In
      tl.to('.bg-6', { opacity: 1, duration: 1 }, '-=0.5')
        .to('.txt-6-container', { opacity: 1, duration: 0.1 })
        .fromTo('.txt-6a', { x: -100, y: -100, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 })
        .fromTo('.txt-6b', { x: 100, y: 100, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 2 }, '<')
        .to('.txt-6-container', { opacity: 0, duration: 1 });

      // 7. Horizontal Travel In
      tl.to('.bg-7', { opacity: 1, duration: 1 }, '-=0.5')
        .to('.txt-7-container', { opacity: 1, duration: 0.1 })
        .fromTo('.txt-7a', { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 2 })
        .fromTo('.txt-7b', { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 2 }, '<')
        .to('.txt-7-container', { opacity: 0, duration: 1 });

      // 8. Final Reveal
      tl.to('.bg-8', { opacity: 1, duration: 1 }, '-=0.5')
        .fromTo('.txt-8', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2 });

    }, masterContainerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section
        id="philosophy"
        className="relative w-full bg-black text-white py-24 px-6 flex flex-col gap-20 items-center justify-center"
        aria-label="Philosophy story static mode"
      >
        {PANELS.map((panel, idx) => (
          <div
            key={panel.id}
            className={`w-full max-w-4xl flex flex-col items-center justify-center p-12 rounded-2xl border text-center relative overflow-hidden ${
              panel.isLightGrayBg
                ? 'bg-[#EAEAEA] text-black border-black/10'
                : 'bg-zinc-900/80 text-white border-white/10'
            }`}
          >
            {panel.image && (
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: `url('${panel.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}
            <div className="relative z-10">
              {idx === 0 ? (
                <h2
                  style={{
                    fontFamily: "'Dharma Gothic E', 'League Gothic', 'Antonio', sans-serif",
                    fontSize: '48px',
                    fontStyle: 'italic',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    color: '#000000',
                  }}
                >
                  YOUR HEALTH DOESN'T MOVE<br />IN STRAIGHT LINES.
                </h2>
              ) : (
                <p
                  style={{
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    fontSize: '1.2rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                  }}
                >
                  {PANELS[idx].alt}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      id="philosophy"
      ref={masterContainerRef}
      className="philosophy-section relative w-full bg-black overflow-hidden"
      aria-label="Philosophy story scroll timeline"
    >
      {/* THE EXACT DOM WITH ALL BACKGROUNDS SET TO Z-INDEX 1 */}
      <div
        id="master-scroll-container"
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: '#EAEAEA',
        }}
      >
        {/* FIX: ALL BACKGROUNDS MUST BE Z-INDEX 1 */}
        <div id="bg-container" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <div
            className="panel-bg bg-1"
            style={{
              position: 'absolute',
              inset: 0,
              background: '#EAEAEA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: '600px',
                height: '600px',
                border: '1px dashed rgba(0,0,0,0.2)',
                borderRadius: '50%',
                position: 'absolute',
              }}
            />
          </div>
          <div
            className="panel-bg bg-2"
            style={{
              position: 'absolute',
              inset: 0,
              background: "url('/Bodyistalking-1.jpg') center/cover",
              opacity: 0,
              zIndex: 1,
            }}
          />
          <div
            className="panel-bg bg-3"
            style={{
              position: 'absolute',
              inset: 0,
              background: "url('/but-most-2.jpg') center/cover",
              opacity: 0,
              zIndex: 1,
            }}
          />
          <div
            className="panel-bg bg-4"
            style={{
              position: 'absolute',
              inset: 0,
              background: "url('/healthsystems-arentlistening-3.jpg') center/cover",
              opacity: 0,
              zIndex: 1,
            }}
          />
          <div
            className="panel-bg bg-5"
            style={{
              position: 'absolute',
              inset: 0,
              background: "url('/sowebuiltonethathas-4.jpg') center/cover",
              opacity: 0,
              zIndex: 1,
            }}
          />
          <div
            className="panel-bg bg-6"
            style={{
              position: 'absolute',
              inset: 0,
              background: "url('/everyinsightinformed-5.jpg') center/cover",
              opacity: 0,
              zIndex: 1,
            }}
          />
          <div
            className="panel-bg bg-7"
            style={{
              position: 'absolute',
              inset: 0,
              background: "url('/whereeverysessioncompounds-6.jpg') center/cover",
              opacity: 0,
              zIndex: 1,
            }}
          />
          <div
            className="panel-bg bg-8"
            style={{
              position: 'absolute',
              inset: 0,
              background: "url('/shapedbyyourphysiology-7.jpg') center/cover",
              opacity: 0,
              zIndex: 1,
            }}
          />
        </div>

        {/* TEXT LAYER */}
        <style dangerouslySetInnerHTML={{ __html: `
          .seq-txt {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: max-content; white-space: nowrap;
            font-family: 'Dharma Gothic E', 'League Gothic', 'Antonio', sans-serif; font-size: 72px; font-style: italic; text-transform: uppercase;
            color: #000; text-align: center; z-index: 10; opacity: 0; 
          }
          .txt-1 { opacity: 1; white-space: normal; }
          .txt-2, .txt-3, .txt-4a, .txt-4b, .txt-5, .txt-6a, .txt-6b, .txt-7a, .txt-7b, .txt-8 {
            color: #FFFFFF;
          }
        ` }} />

        <div className="seq-txt txt-1" style={{ color: '#000000' }}>
          YOUR HEALTH DOESN'T MOVE <br /> IN STRAIGHT LINES.
        </div>
        <div className="seq-txt txt-2">YOUR BODY IS TALKING</div>
        <div className="seq-txt txt-3">BUT MOST</div>

        <div className="seq-txt txt-4-container" style={{ opacity: 0 }}>
          <div className="txt-4a">HEALTH SYSTEMS</div>
          <div
            className="txt-4b"
            style={{
              opacity: 0,
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'max-content',
            }}
          >
            AREN'T LISTENING
          </div>
        </div>

        <div className="seq-txt txt-5">SO WE BUILT ONE THAT DOES</div>

        <div className="seq-txt txt-6-container" style={{ opacity: 0, width: '100vw', height: '100vh' }}>
          <div className="txt-6a" style={{ position: 'absolute', top: '40%', left: '30%' }}>
            EVERY INSIGHT INFORMED
          </div>
          <div className="txt-6b" style={{ position: 'absolute', top: '60%', left: '70%' }}>
            BY WHAT COMES NEXT
          </div>
        </div>

        <div className="seq-txt txt-7-container" style={{ opacity: 0, width: '100vw', height: '100vh' }}>
          <div className="txt-7a" style={{ position: 'absolute', top: '50%', left: '20%' }}>
            WHERE EVERY SESSION COMPOUNDS
          </div>
          <div className="txt-7b" style={{ position: 'absolute', top: '50%', left: '80%' }}>
            ON THE LAST
          </div>
        </div>

        <div className="seq-txt txt-8" style={{ color: '#FFF' }}>
          SHAPED BY YOUR PHYSIOLOGY
        </div>
      </div>
    </section>
  );
}
