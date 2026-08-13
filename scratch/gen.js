const fs = require('fs');

const code = `'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

interface PanelConfig {
  id: string;
  image?: string;
  alt: string;
}

const PANELS: PanelConfig[] = [
  { id: 'panel-1', alt: 'Your health does not move in straight lines' },
  { id: 'panel-2', image: '/Bodyistalking-1.jpg', alt: 'Your body is talking' },
  { id: 'panel-3', image: '/but-most-2.jpg', alt: 'But most' },
  { id: 'panel-4', image: '/healthsystems-arentlistening-3.jpg', alt: "Health systems aren't listening" },
  { id: 'panel-5', image: '/sowebuiltonethathas-4.jpg', alt: 'So we built one that does' },
  { id: 'panel-6', image: '/everyinsightinformed-5.jpg', alt: 'Every insight informed by what comes next' },
  { id: 'panel-7', image: '/whereeverysessioncompounds-6.jpg', alt: 'Where every session compounds on the last' },
  { id: 'panel-8', image: '/shapedbyyourphysiology-7.jpg', alt: 'Shaped by your physiology' },
];

const MONO_STYLE: CSSProperties = {
  fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
  fontWeight: 500,
  fontSize: 'clamp(1.1rem, 2.8vw, 1.85rem)',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  lineHeight: 1.4,
  color: '#FFFFFF',
};

const PANEL1_STYLE: CSSProperties = {
  fontFamily: "'Dharma Gothic E', 'League Gothic', 'Antonio', sans-serif",
  fontWeight: 400,
  fontStyle: 'italic',
  fontSize: 'clamp(2.6rem, 5.5vw, 72px)',
  lineHeight: '100%',
  letterSpacing: '0px',
  textTransform: 'uppercase',
  color: '#000000',
  textAlign: 'center',
};

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  const panel1BgRef = useRef<HTMLDivElement>(null);
  const panel1WrapperRef = useRef<HTMLDivElement>(null);

  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const path2to3Ref = useRef<SVGPathElement>(null);
  const runnerLineRef = useRef<SVGLineElement>(null);
  const stretchLineRef = useRef<SVGLineElement>(null);
  const liquidLineRef = useRef<SVGLineElement>(null);

  const textPanel2Ref = useRef<HTMLDivElement>(null);
  const textPanel6TopRef = useRef<HTMLDivElement>(null);
  const textPanel7Ref = useRef<HTMLDivElement>(null);
  const textPanel8Ref = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !trackRef.current || !pinnedRef.current) return;

    const ctx = gsap.context(() => {
      phraseRefs.current.forEach((el, index) => {
        if (el) {
          gsap.set(el, { autoAlpha: index === 0 ? 1 : 0 });
        }
      });

      bgRefs.current.forEach((el) => {
        if (el) {
          gsap.set(el, { autoAlpha: 0 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
          pin: pinnedRef.current,
          anticipatePin: 1,
        },
      });

      /* 0.00 -> 0.14: PANEL 1 */
      tl.to(
        panel1WrapperRef.current,
        {
          rotation: 180,
          scale: 0.82,
          autoAlpha: 0,
          duration: 0.14,
          ease: 'power1.inOut',
          force3D: true,
        },
        0
      );

      if (panel1BgRef.current) {
        tl.to(
          panel1BgRef.current,
          { autoAlpha: 0, duration: 0.12, ease: 'power1.inOut' },
          0.02
        );
      }

      /* 0.12 -> 0.28: PANEL 2 */
      if (bgRefs.current[0]) {
        tl.to(bgRefs.current[0], { autoAlpha: 1, duration: 0.10 }, 0.10);
      }

      tl.fromTo(
        phraseRefs.current[1],
        { autoAlpha: 0, scale: 0.9, y: 20 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        0.10
      );

      if (textPanel2Ref.current && path2to3Ref.current) {
        tl.to(
          textPanel2Ref.current,
          {
            motionPath: {
              path: path2to3Ref.current,
              align: path2to3Ref.current,
              alignOrigin: [0.5, 0.5],
            },
            scale: 0.86,
            autoAlpha: 0,
            duration: 0.12,
            ease: 'power1.inOut',
          },
          0.16
        );
      } else if (textPanel2Ref.current) {
        tl.to(
          textPanel2Ref.current,
          {
            x: -90,
            y: 140,
            scale: 0.85,
            autoAlpha: 0,
            duration: 0.10,
            ease: 'power2.in',
          },
          0.18
        );
      }

      tl.to(phraseRefs.current[1], { autoAlpha: 0, duration: 0.05 }, 0.25);
      if (bgRefs.current[0]) {
        tl.to(bgRefs.current[0], { autoAlpha: 0, duration: 0.07 }, 0.25);
      }

      /* 0.28 -> 0.42: PANEL 3 */
      if (bgRefs.current[1]) {
        tl.to(bgRefs.current[1], { autoAlpha: 1, duration: 0.10 }, 0.28);
      }

      tl.fromTo(
        phraseRefs.current[2],
        { autoAlpha: 0, filter: 'blur(12px)', letterSpacing: '0.3em', scale: 1.2 },
        {
          autoAlpha: 1,
          filter: 'blur(0px)',
          letterSpacing: '0.16em',
          scale: 1,
          duration: 0.10,
          ease: 'power2.out',
        },
        0.28
      );

      tl.to(
        phraseRefs.current[2],
        {
          autoAlpha: 0,
          filter: 'blur(12px)',
          letterSpacing: '-0.05em',
          scale: 0.7,
          duration: 0.08,
          ease: 'power2.in',
        },
        0.36
      );
      if (bgRefs.current[1]) {
        tl.to(bgRefs.current[1], { autoAlpha: 0, duration: 0.08 }, 0.36);
      }

      /* 0.42 -> 0.56: PANEL 4 */
      if (bgRefs.current[2]) {
        tl.to(bgRefs.current[2], { autoAlpha: 1, duration: 0.10 }, 0.42);
      }

      tl.fromTo(
        phraseRefs.current[3],
        { autoAlpha: 0, filter: 'blur(12px)', letterSpacing: '0.28em' },
        {
          autoAlpha: 1,
          filter: 'blur(0px)',
          letterSpacing: '0.16em',
          duration: 0.10,
          ease: 'power2.out',
        },
        0.42
      );

      tl.to(
        phraseRefs.current[3],
        {
          autoAlpha: 0,
          filter: 'blur(12px)',
          letterSpacing: '-0.04em',
          scale: 0.75,
          duration: 0.08,
          ease: 'power2.in',
        },
        0.50
      );
      if (bgRefs.current[2]) {
        tl.to(bgRefs.current[2], { autoAlpha: 0, duration: 0.08 }, 0.50);
      }

      /* 0.56 -> 0.70: PANEL 5 */
      if (bgRefs.current[3]) {
        tl.to(bgRefs.current[3], { autoAlpha: 1, duration: 0.10 }, 0.56);
      }

      tl.fromTo(
        phraseRefs.current[4],
        { autoAlpha: 0, scale: 0.85, y: 30 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        0.56
      );

      tl.to(phraseRefs.current[4], { autoAlpha: 0, y: -20, duration: 0.08 }, 0.64);
      if (bgRefs.current[3]) {
        tl.to(bgRefs.current[3], { autoAlpha: 0, duration: 0.08 }, 0.64);
      }

      /* 0.70 -> 0.82: PANEL 6 */
      if (bgRefs.current[4]) {
        tl.to(bgRefs.current[4], { autoAlpha: 1, duration: 0.10 }, 0.70);
      }

      tl.fromTo(
        phraseRefs.current[5],
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.08, ease: 'power2.out' },
        0.70
      );

      if (textPanel6TopRef.current && runnerLineRef.current) {
        tl.to(
          textPanel6TopRef.current,
          {
            motionPath: {
              path: runnerLineRef.current,
              align: runnerLineRef.current,
              alignOrigin: [0.5, 0.5],
            },
            duration: 0.08,
            ease: 'power1.inOut',
          },
          0.74
        );
      }

      tl.to(phraseRefs.current[5], { autoAlpha: 0, duration: 0.06 }, 0.78);
      if (bgRefs.current[4]) {
        tl.to(bgRefs.current[4], { autoAlpha: 0, duration: 0.06 }, 0.78);
      }

      /* 0.82 -> 0.92: PANEL 7 */
      if (bgRefs.current[5]) {
        tl.to(bgRefs.current[5], { autoAlpha: 1, duration: 0.08 }, 0.82);
      }

      tl.fromTo(
        phraseRefs.current[6],
        { autoAlpha: 0, scale: 0.9, y: 20 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.08, ease: 'power2.out' },
        0.82
      );

      if (textPanel7Ref.current && stretchLineRef.current) {
        tl.to(
          textPanel7Ref.current,
          {
            motionPath: {
              path: stretchLineRef.current,
              align: stretchLineRef.current,
              alignOrigin: [0.5, 0.5],
            },
            duration: 0.06,
            ease: 'power1.inOut',
          },
          0.85
        );
      }

      tl.to(phraseRefs.current[6], { autoAlpha: 0, duration: 0.06 }, 0.88);
      if (bgRefs.current[5]) {
        tl.to(bgRefs.current[5], { autoAlpha: 0, duration: 0.06 }, 0.88);
      }

      /* 0.92 -> 1.00: PANEL 8 */
      if (bgRefs.current[6]) {
        tl.to(bgRefs.current[6], { autoAlpha: 1, duration: 0.08 }, 0.92);
      }

      tl.fromTo(
        phraseRefs.current[7],
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.08, ease: 'power2.out' },
        0.92
      );

      if (textPanel8Ref.current && liquidLineRef.current) {
        tl.to(
          textPanel8Ref.current,
          {
            motionPath: {
              path: liquidLineRef.current,
              align: liquidLineRef.current,
              alignOrigin: [0.5, 1],
            },
            duration: 0.06,
            ease: 'power1.inOut',
          },
          0.94
        );
      }
    }, trackRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section
        ref={sectionRef}
        id="philosophy"
        className="relative w-full bg-black text-white py-24 px-6 flex flex-col gap-20 items-center justify-center"
        aria-label="Philosophy story static mode"
      >
        {PANELS.map((panel, idx) => (
          <div
            key={panel.id}
            className={\`w-full max-w-4xl flex flex-col items-center justify-center p-12 rounded-2xl border text-center relative overflow-hidden \${
              idx === 0
                ? 'bg-[#EAEAEA] text-black border-black/10'
                : 'bg-zinc-900/80 text-white border-white/10'
            }\`}
          >
            {panel.image && (
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: \`url('\${panel.image}')\`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}
            <div className="relative z-10">
              {idx === 0 ? (
                <h1 style={PANEL1_STYLE}>
                  YOUR HEALTH DOESN'T MOVE<br />IN STRAIGHT LINES.
                </h1>
              ) : (
                <p style={MONO_STYLE}>{PANELS[idx].alt}</p>
              )}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="philosophy-section relative w-full bg-black overflow-hidden"
      aria-label="Philosophy story scroll timeline"
    >
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0 overflow-hidden" aria-hidden="true">
        <path id="path-panel-2-3" ref={path2to3Ref} d="M 0 0 C 100 80, -100 180, -160 260" stroke="none" fill="none" />
      </svg>

      <div ref={trackRef} className="relative w-full h-[2000vh]">
        <div
          ref={pinnedRef}
          className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
        >
          <div
            ref={panel1BgRef}
            className="absolute inset-0 pointer-events-none z-[1] will-change-opacity"
            style={{ backgroundColor: '#EAEAEA' }}
          />

          {PANELS.slice(1, 8).map((panel, i) =>
            panel.image ? (
              <div
                key={panel.id}
                ref={(el) => {
                  bgRefs.current[i] = el;
                }}
                className="absolute inset-0 pointer-events-none opacity-0 z-[2] will-change-opacity"
                style={{
                  backgroundImage: \`url('\${panel.image}')\`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ) : null
          )}

          <div className="absolute inset-y-8 inset-x-8 md:inset-x-14 pointer-events-none z-10 flex justify-between">
            <div className="h-full w-px border-l border-dashed border-black/20 dark:border-white/20 relative">
              <span className="absolute top-0 -left-[5px] text-[10px] font-mono opacity-40 select-none">+</span>
              <span className="absolute bottom-0 -left-[5px] text-[10px] font-mono opacity-40 select-none">+</span>
            </div>
            <div className="h-full w-px border-r border-dashed border-black/20 dark:border-white/20 relative">
              <span className="absolute top-0 -right-[5px] text-[10px] font-mono opacity-40 select-none">+</span>
              <span className="absolute bottom-0 -right-[5px] text-[10px] font-mono opacity-40 select-none">+</span>
            </div>
          </div>

          <div className="relative z-20 w-full h-full flex items-center justify-center px-4 pointer-events-none">

            {/* PANEL 1 */}
            <div
              ref={(el) => {
                phraseRefs.current[0] = el;
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
            >
              <div
                ref={panel1WrapperRef}
                className="relative flex flex-col items-center justify-center pointer-events-none will-change-[transform,opacity]"
              >
                <svg
                  className="absolute pointer-events-none overflow-visible w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px]"
                  aria-hidden="true"
                >
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1.2"
                    strokeDasharray="6 6"
                    opacity="0.25"
                  />
                </svg>

                <div className="relative z-10 text-center px-6 max-w-[46rem]">
                  <h1 style={PANEL1_STYLE}>
                    YOUR HEALTH DOESN'T MOVE<br />IN STRAIGHT LINES.
                  </h1>
                </div>
              </div>
            </div>

            {/* PANEL 2 */}
            <div
              ref={(el) => {
                phraseRefs.current[1] = el;
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto opacity-0"
            >
              <div
                ref={textPanel2Ref}
                className="text-center max-w-[90vw] md:max-w-[48rem] text-white will-change-[transform,opacity]"
                style={MONO_STYLE}
              >
                your body is talking
              </div>
            </div>

            {/* PANEL 3 */}
            <div
              ref={(el) => {
                phraseRefs.current[2] = el;
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto opacity-0"
            >
              <p className="text-center max-w-[90vw] text-white" style={MONO_STYLE}>
                but most
              </p>
            </div>

            {/* PANEL 4 */}
            <div
              ref={(el) => {
                phraseRefs.current[3] = el;
              }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-y-6 pointer-events-auto opacity-0"
            >
              <div className="text-center max-w-[90vw] text-white" style={MONO_STYLE}>
                <span className="block text-white/80">health systems</span>
                <span className="block text-white font-semibold text-[1.2em] mt-2">
                  aren't listening
                </span>
              </div>
            </div>

            {/* PANEL 5 */}
            <div
              ref={(el) => {
                phraseRefs.current[4] = el;
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto opacity-0"
            >
              <p className="text-center max-w-[90vw] text-white" style={MONO_STYLE}>
                so we built one that does
              </p>
            </div>

            {/* PANEL 6 */}
            <div
              ref={(el) => {
                phraseRefs.current[5] = el;
              }}
              className="absolute inset-0 flex flex-col items-center justify-between py-24 md:py-32 px-6 pointer-events-auto opacity-0"
            >
              <div ref={textPanel6TopRef} className="text-center max-w-[90vw] text-white will-change-transform" style={MONO_STYLE}>
                EVERY INSIGHT INFORMED
              </div>

              <svg className="w-full max-w-[320px] h-[160px] pointer-events-none overflow-visible opacity-0 my-auto">
                <line
                  ref={runnerLineRef}
                  x1="30%"
                  y1="10%"
                  x2="70%"
                  y2="90%"
                  stroke="none"
                  strokeWidth="1"
                />
              </svg>

              <div className="text-center max-w-[90vw] text-white" style={MONO_STYLE}>
                BY WHAT COMES NEXT
              </div>
            </div>

            {/* PANEL 7 */}
            <div
              ref={(el) => {
                phraseRefs.current[6] = el;
              }}
              className="absolute inset-0 flex items-center justify-center px-6 pointer-events-auto opacity-0"
            >
              <div ref={textPanel7Ref} className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-2 text-center max-w-[90vw] md:max-w-[56rem] text-white will-change-transform" style={MONO_STYLE}>
                <span>WHERE EVERY SESSION COMPOUNDS</span>
                <svg className="hidden md:inline-block w-16 h-px overflow-visible opacity-0 my-auto pointer-events-none">
                  <line
                    ref={stretchLineRef}
                    x1="0%"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke="none"
                    strokeWidth="1"
                  />
                </svg>
                <span className="text-white/80">ON THE LAST</span>
              </div>
            </div>

            {/* PANEL 8 */}
            <div
              ref={(el) => {
                phraseRefs.current[7] = el;
              }}
              className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 px-6 pointer-events-auto opacity-0"
            >
              <svg className="w-6 h-[120px] pointer-events-none overflow-visible opacity-0 mb-6">
                <line
                  ref={liquidLineRef}
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  stroke="none"
                  strokeWidth="1"
                />
              </svg>

              <div ref={textPanel8Ref} className="text-center max-w-[90vw] text-white will-change-transform" style={MONO_STYLE}>
                SHAPED BY YOUR PHYSIOLOGY
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('components/philosophy-section.tsx', code, 'utf8');
console.log('Done!');
