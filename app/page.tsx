import BannerScrollSequence from "@/components/BannerScrollSequence";
import MobileHero from "@/components/MobileHero";
import TrustedBy from "@/components/TrustedBy";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import ClientTestimonials from "@/components/ClientTestimonials";
import CircularFlow from "@/components/CircularFlow";
import ProprietaryTech from "@/components/ProprietaryTech";
import LiveDemoSection from "@/components/LiveDemoSection";
import Campaigns from "@/components/Campaigns";
import FAQ from "@/components/FAQ";
import SuccessStories from "@/components/SuccessStories";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6]">
      {/* Mobile View Hero (Visible on mobile screens < 640px) */}
      <MobileHero />

      {/* Desktop View Hero - GSAP Frame Scroll Sequence Animation */}
      <div className="hidden sm:block w-full">
        <BannerScrollSequence />
      </div>

      {/* Trusted By Section */}
      <TrustedBy />

      {/* About & Mission Section */}
      <AboutSection />

      {/* Circular Flow Interactive Section */}
      <CircularFlow />

      {/* Live Demo Banner Section */}
      <LiveDemoSection />

      {/* Proprietary Technology Section */}
      <ProprietaryTech />

      {/* Services & Products Section */}
      <ServicesSection />

      {/* Impact Stats Counter Section */}
      <StatsSection />

      {/* Our Impact / Campaigns Section */}
      <Campaigns />

      {/* What Our Clients Say - Testimonials Section */}
      <ClientTestimonials />

      {/* Real Projects / Success Stories Section */}
      <SuccessStories />
      
      {/* FAQ Accordion Section */}
      <FAQ />
    </main>
  );
}
