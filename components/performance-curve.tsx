'use client';

import { useEffect, useRef, useState } from 'react';

// Generate smooth heart rate curve data points
function generateHeartRateData() {
  const points: { x: number; y: number }[] = [];
  const totalPoints = 120;

  for (let i = 0; i < totalPoints; i++) {
    const t = i / totalPoints;
    const x = t * 100;

    // Multi-wave simulation of heart rate during exercise
    const base = 95;
    const rampUp = Math.min(t * 2.5, 1) * 75;
    const fluctuation = Math.sin(t * 18) * 5 + Math.sin(t * 7) * 8;
    const peak = t > 0.6 ? Math.sin((t - 0.6) * 8) * 12 : 0;
    const coolDown = t > 0.85 ? (t - 0.85) * -120 : 0;

    const y = base + rampUp + fluctuation + peak + coolDown;
    points.push({ x, y: Math.max(y, 90) });
  }

  return points;
}

export function PerformanceCurve() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const heartRateData = useRef(generateHeartRateData());

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

  const data = heartRateData.current;
  const maxY = 189;
  const minY = 90;
  const chartWidth = 800;
  const chartHeight = 300;

  // Create SVG path
  const scaleX = (x: number) => (x / 100) * chartWidth;
  const scaleY = (y: number) => chartHeight - ((y - minY) / (maxY - minY)) * chartHeight;

  const pathD = data
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x).toFixed(1)} ${scaleY(p.y).toFixed(1)}`)
    .join(' ');

  // VT thresholds
  const vt1Y = scaleY(142);
  const vt2Y = scaleY(165);
  const maxHRY = scaleY(175);

  // Time labels
  const timeLabels = [
    { x: 0, label: '0' },
    { x: 23.3, label: '3.0' },
    { x: 46.6, label: '5.9' },
    { x: 70, label: '8.9' },
    { x: 93, label: '11.8' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A1628 0%, #0D1F3C 50%, #0A1628 100%)',
      }}
      id="performance-curve"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        {/* Chart Title */}
        <div
          className="mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: '11px',
              lineHeight: '20px',
              letterSpacing: '0.05em',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
            }}
          >
            HEART RATE OVER TIME, WITH VT1 / VT2 / MAX OVERLAY
          </p>
        </div>

        {/* Chart SVG */}
        <div
          className="w-full mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1.2s ease 0.4s',
          }}
        >
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`}
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid lines */}
            {[95, 142, 165, 175, 189].map((val) => (
              <line
                key={val}
                x1="0"
                y1={scaleY(val)}
                x2={chartWidth}
                y2={scaleY(val)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            ))}

            {/* VT2 zone fill */}
            <rect
              x="0"
              y={vt2Y}
              width={chartWidth}
              height={vt1Y - vt2Y}
              fill="rgba(255, 100, 50, 0.04)"
            />

            {/* Main heart rate line */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#heartRateGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="performance-curve-line"
              style={{
                strokeDasharray: isVisible ? 'none' : '2000',
                strokeDashoffset: isVisible ? '0' : '2000',
                transition: 'stroke-dashoffset 2.5s ease 0.6s',
              }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="heartRateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="40%" stopColor="#3B82F6" />
                <stop offset="70%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>

            {/* MAX label */}
            <text
              x={chartWidth - 5}
              y={maxHRY - 8}
              textAnchor="end"
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: '10px',
                fill: '#EF4444',
              }}
            >
              MAX • 175 BPM
            </text>

            {/* Y-axis labels */}
            {[
              { val: 189, label: '189' },
              { val: 142, label: '142' },
              { val: 95, label: '95' },
            ].map(({ val, label }) => (
              <text
                key={val}
                x="-5"
                y={scaleY(val) + 4}
                textAnchor="end"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: '10px',
                  fill: 'rgba(255,255,255,0.3)',
                }}
              >
                {label}
              </text>
            ))}

            {/* X-axis labels */}
            {timeLabels.map(({ x, label }) => (
              <text
                key={label}
                x={scaleX(x)}
                y={chartHeight + 25}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: '10px',
                  fill: 'rgba(255,255,255,0.3)',
                }}
              >
                {label}
              </text>
            ))}

            {/* X-axis label */}
            <text
              x={chartWidth / 2}
              y={chartHeight + 42}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: '10px',
                fill: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              TIME (MIN)
            </text>
          </svg>
        </div>

        {/* Original Uploaded Photos Showcase: Performance Curve & Performance Score */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Performance Curve Card */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-2xl border border-white/10">
            <img
              src="/performancecurve.jpg"
              alt="See Your Performance Curve"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center justify-between inset-x-6">
              <h3 className="text-white text-xl font-bold font-sans">See Your Performance Curve</h3>
              <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg font-mono group-hover:bg-blue-600 transition-colors">+</span>
            </div>
          </div>

          {/* Performance Score Card */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-2xl border border-white/10">
            <img
              src="/PerformanceScore.jpg"
              alt="Performance Score"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center justify-between inset-x-6">
              <h3 className="text-white text-xl font-bold font-sans">Performance Score</h3>
              <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg font-mono group-hover:bg-blue-600 transition-colors">+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
