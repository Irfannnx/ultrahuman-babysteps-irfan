'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const ROADMAP_WORDS = [
  'BIOMARKERS',
  'GLUCOSE',
  'RECOVERY',
  'SLEEP',
  'MOVEMENT',
  'LONGEVITY',
] as const;

/** Stagger alignment: left, right, center pattern */
const ALIGNMENT: Record<number, string> = {
  0: 'flex-start',
  1: 'flex-end',
  2: 'center',
  3: 'flex-end',
  4: 'flex-start',
  5: 'center',
};

interface LineData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
}

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [lines, setLines] = useState<LineData[]>([]);
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(false);

  // ─── Measure word positions and compute connector lines ───
  const measureLines = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const scrollTop = container.scrollTop || 0;
    const newLines: LineData[] = [];

    for (let i = 0; i < ROADMAP_WORDS.length - 1; i++) {
      const a = wordRefs.current[i];
      const b = wordRefs.current[i + 1];
      if (!a || !b) continue;

      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();

      // Coordinates relative to the SVG container, accounting for scroll
      const x1 = (aRect.left + aRect.right) / 2 - containerRect.left;
      const y1 = (aRect.top + aRect.bottom) / 2 - containerRect.top + scrollTop;
      const x2 = (bRect.left + bRect.right) / 2 - containerRect.left;
      const y2 = (bRect.top + bRect.bottom) / 2 - containerRect.top + scrollTop;

      const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

      newLines.push({ x1, y1, x2, y2, length });
    }

    setLines(newLines);
  }, []);

  // ─── Feature detect and set up fallback ───
  useEffect(() => {
    const hasScrollTimeline =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline', 'view()');

    setSupportsScrollTimeline(hasScrollTimeline);
  }, []);

  // ─── Resize observer for line recalculation ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial measure after layout settles
    const raf = requestAnimationFrame(measureLines);

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(measureLines);
    });
    ro.observe(container);

    // Also measure on window resize (catches font loading, zoom)
    window.addEventListener('resize', measureLines, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', measureLines);
    };
  }, [measureLines]);

  // ─── IntersectionObserver fallback for scroll reveal ───
  useEffect(() => {
    if (supportsScrollTimeline) return; // CSS handles it

    const elements = wordRefs.current.filter(Boolean) as HTMLElement[];

    // Tag elements as IO-managed for CSS transitions
    elements.forEach((el) => el.classList.add('io-managed'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      elements.forEach((el) => {
        el.classList.remove('io-managed', 'is-visible');
      });
    };
  }, [supportsScrollTimeline]);

  // ─── IO fallback for SVG lines ───
  useEffect(() => {
    if (supportsScrollTimeline) return;
    if (!svgRef.current) return;

    const svgLines = svgRef.current.querySelectorAll<SVGLineElement>('.roadmap-line');
    svgLines.forEach((el) => el.classList.add('io-managed'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -5% 0px',
      },
    );

    svgLines.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      svgLines.forEach((el) => {
        el.classList.remove('io-managed', 'is-visible');
      });
    };
  }, [supportsScrollTimeline, lines]);

  // Total height: 1 panel per word
  const totalHeight = `${ROADMAP_WORDS.length * 100}vh`;

  return (
    <section
      ref={containerRef}
      className="roadmap-container"
      style={{ minHeight: totalHeight }}
      aria-label="Roadmap"
    >
      {/* SVG Canvas for connector lines */}
      <svg
        ref={svgRef}
        className="roadmap-svg"
        style={{ height: totalHeight }}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {lines.map((line, i) => (
          <line
            key={`roadmap-line-${i}`}
            className="roadmap-line"
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            style={{
              strokeDasharray: line.length,
              strokeDashoffset: supportsScrollTimeline ? undefined : line.length,
              ['--line-length' as string]: line.length,
            }}
          />
        ))}
      </svg>

      {/* Word panels */}
      {ROADMAP_WORDS.map((word, index) => (
        <div
          key={word}
          className="roadmap-panel"
          style={{ justifyContent: ALIGNMENT[index] || 'center' }}
        >
          <h2
            ref={(el) => { wordRefs.current[index] = el; }}
            className="roadmap-word"
            style={{
              padding: '0 clamp(24px, 6vw, 80px)',
            }}
          >
            {word}
          </h2>
        </div>
      ))}
    </section>
  );
}
