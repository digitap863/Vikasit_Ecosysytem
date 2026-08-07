import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroText from "@/components/HeroText";
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
import Footer from "@/components/Footer";
import SuccessStories from "@/components/SuccessStories";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6]">
      {/* 100vh Hero Banner Container */}
      <section className="relative w-full h-screen min-h-[650px] sm:min-h-[750px] md:min-h-0 overflow-hidden">
        {/* Navbar overlay */}
        <Navbar />

        {/* Top-Left Ambient Warm Radial Glow (295x500 shape) */}
        <div className="absolute top-[-40px] left-[1%] w-[320px] h-[520px] bg-[#e89b74]/30 rounded-full blur-[95px] pointer-events-none z-[2]" />

        {/* Lower-Left Ambient Warm Radial Glow (295x432 Figma shape) */}
        <div className="absolute top-[240px] left-[-30px] w-[460px] h-[380px] bg-[#EAE3D2]/40 rounded-full blur-[95px] pointer-events-none z-[2]" />

        {/* Desktop Banner Image (Hidden on mobile) */}
        <Image
          src="/banner/banner.webp"
          alt="Vikasit Ecosystem Banner"
          fill
          priority
          className="hidden sm:block object-cover"
        />

        {/* Mobile Banner Image (Visible on mobile) */}
        <Image
          src="/banner/mobile_banner.webp"
          alt="Vikasit Ecosystem Mobile Banner"
          fill
          priority
          className="block sm:hidden object-cover object-top"
        />

        {/* Full-width Bottom Dark Depth Shadow Overlay (for soil texture & contrast) */}
        <div className="absolute bottom-0 inset-x-0 h-[38%] bg-gradient-to-t from-[#1c140d]/65 via-[#1c140d]/30 to-transparent pointer-events-none z-[3]" />

        {/* Full-width Bottom Cream Gradient Fade Overlay */}
        <div className="absolute bottom-0 inset-x-0 h-[24%] bg-gradient-to-t from-[#eae4d6] via-[#eae4d6]/75 to-transparent pointer-events-none z-[4]" />

        {/* Hero Content Overlay with Scroll Animations */}
        <div className="absolute inset-0 pt-[90px] px-6 sm:px-12 md:px-16 lg:px-24 flex items-center md:items-start md:pt-[150px] justify-start z-10 pointer-events-none">
          <HeroText />
        </div>
        <div
          className="hidden sm:block absolute bottom-0 -left-[160px] rounded-full bg-[#EAE3D2] blur-2xl z-0"
          style={{ width: '295px', height: '432px' }}
        />
      </section>

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

      {/* Footer Component */}
      <Footer />
    </main>
  );
}
