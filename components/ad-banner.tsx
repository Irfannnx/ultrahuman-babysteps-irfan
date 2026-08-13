export function AdBanner() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[110] h-[44px] w-full flex items-center justify-center backdrop-blur-[94px] uppercase text-center"
      style={{
        background: 'linear-gradient(90deg, #0C218F 0%, #1539F5 50%, #0C218F 100%)',
        color: '#DADADA',
        fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
        fontWeight: 500,
        fontSize: '13px',
        lineHeight: '16px',
        letterSpacing: '-0.02em',
      }}
    >
      <div className="w-full max-w-[1512px] mx-auto px-4 flex items-center justify-center">
        <span>
          FUTURE OF HUMAN PERFORMANCE. LIVE NOW.{' '}
          <a
            href="#learn-more"
            className="underline decoration-solid hover:opacity-80 transition-opacity ml-1"
          >
            LEARN MORE
          </a>
        </span>
      </div>
    </header>
  );
}
