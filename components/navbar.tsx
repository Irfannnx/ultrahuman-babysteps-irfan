'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Ring AIR', href: '#ring-air' },
  { label: 'Ring PRO', href: '#ring-pro' },
  { label: 'Blood Vision', href: '#blood-vision' },
  { label: 'Performance Lab', href: '#performance-lab', badge: 'NEW' },
  { label: 'Home Health', href: '#home-health' },
  { label: 'M1 CGM', href: '#m1-cgm' },
  { label: 'Ovulation Tracking', href: '#ovulation' },
  { label: 'UltrahumanX', href: '#ultrahumanx' },
  { label: 'Shop', href: '#shop' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-[44px] left-0 right-0 z-[100] h-[56px] w-full flex items-center justify-center transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl' : 'bg-[#09090b]/80 backdrop-blur-sm'
      }`}
      aria-label="Main navigation"
    >
      <div className="w-full max-w-[1512px] mx-auto px-6 sm:px-12 flex items-center justify-between h-full">
        {/* Brand Logo */}
        <a href="/" aria-label="Ultrahuman Home" className="flex items-center h-full">
          <img
            src="/logo.png"
            alt="Ultrahuman Logo"
            className="h-5 w-auto filter brightness-0 invert object-contain"
          />
        </a>

        {/* Navigation Items (Exact Figma Specs) */}
        <div
          className="hidden lg:flex items-center gap-5 xl:gap-7 h-full text-zinc-300"
          style={{
            fontFamily: "var(--font-inter), 'Graphik', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '24px',
            letterSpacing: '-0.03em',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors flex items-center gap-1 h-full"
            >
              {link.label}
              {link.badge && (
                <sup
                  className="text-zinc-400 font-normal ml-0.5"
                  style={{
                    fontSize: '10px',
                    lineHeight: '24px',
                    letterSpacing: '-0.03em',
                    verticalAlign: 'super',
                  }}
                >
                  {link.badge}
                </sup>
              )}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 sm:gap-6 h-full">
          <button
            aria-label="Cart"
            className="p-1 hover:opacity-80 transition-opacity flex items-center justify-center"
          >
            <img
              src="/cart.png"
              alt="Cart"
              className="w-5 h-5 filter brightness-0 invert opacity-90"
            />
          </button>

          {/* EXPLORE PLANS CTA */}
          <a
            href="#explore-plans"
            className="bg-[#1539F5] hover:bg-blue-600 rounded-full transition-all duration-200 shadow-md shadow-blue-600/30 hover:scale-[1.03] active:scale-95 inline-flex items-center justify-center my-auto"
            style={{
              fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '140%',
              letterSpacing: '0%',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              padding: '8px 18px',
            }}
          >
            EXPLORE PLANS
          </a>
        </div>
      </div>
    </nav>
  );
}
