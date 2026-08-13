'use client';

import { useEffect, useRef, useState } from 'react';

const FOOTER_PRODUCTS = [
  { label: 'Ring AIR', href: '#' },
  { label: 'Ring PRO', href: '#' },
  { label: 'Blood Vision', href: '#' },
  { label: 'Performance Lab', href: '#' },
  { label: 'Home Health', href: '#' },
  { label: 'M1 CGM', href: '#' },
];

const FOOTER_COMPANY = [
  { label: 'About', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Press', href: '#' },
  { label: 'Partners', href: '#' },
];

const FOOTER_SUPPORT = [
  { label: 'Help Center', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Warranty', href: '#' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black pt-20 pb-8"
      id="footer"
    >


      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        {/* Top Section: Brand + Link Columns */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16 border-b border-white/10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          {/* Brand Column */}
          <div className="md:col-span-1">
            <img
              src="/logo.png"
              alt="Ultrahuman Logo"
              className="h-5 w-auto filter brightness-0 invert mb-6"
            />
            <p
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '22px',
                color: '#71717A',
                maxWidth: '240px',
              }}
            >
              The future of human performance. Wearables, diagnostics, and recovery — unified.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-8">
              {/* Twitter/X */}
              <a href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Products
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_PRODUCTS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '13px',
                      color: '#A1A1AA',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_COMPANY.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '13px',
                      color: '#A1A1AA',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Support
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_SUPPORT.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '13px',
                      color: '#A1A1AA',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              color: '#52525B',
            }}
          >
            © {new Date().getFullYear()} Ultrahuman. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hover:text-zinc-300 transition-colors"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '12px',
                color: '#52525B',
              }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-zinc-300 transition-colors"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '12px',
                color: '#52525B',
              }}
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-zinc-300 transition-colors"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '12px',
                color: '#52525B',
              }}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
