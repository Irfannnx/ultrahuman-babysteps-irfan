import { AdBanner } from '@/components/ad-banner';
import { Navbar } from '@/components/navbar';
import { HeroExperience } from '@/components/hero-experience';
import { DeepDiagnostics } from '@/components/deep-diagnostics';
import { DeepestRead } from '@/components/deepest-read';
import { Protocols } from '@/components/protocols';
import { PhilosophySection } from '@/components/philosophy-section';
import { VisionSection } from '@/components/vision';
import { Footer } from '@/components/footer';
import { SmoothScroll } from '@/components/smooth-scroll';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="bg-black text-white min-h-screen font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden">
        <AdBanner />
        <Navbar />
        <HeroExperience />
        <DeepDiagnostics />
        <DeepestRead />
        <Protocols />
        <PhilosophySection />
        <VisionSection />
        <Footer />
      </div>
    </SmoothScroll>
  );
}