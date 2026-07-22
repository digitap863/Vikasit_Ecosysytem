import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroText from "@/components/HeroText";
import TrustedBy from "@/components/TrustedBy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6]">
      {/* 100vh Hero Banner Container */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Navbar overlay */}
        <Navbar />

        {/* Top-Left Ambient Warm Radial Glow (295x500 shape) */}
        <div className="absolute top-[-40px] left-[1%] w-[320px] h-[520px] bg-[#e89b74]/30 rounded-full blur-[95px] pointer-events-none z-[2]" />
        
        {/* Lower-Left Ambient Warm Radial Glow (295x432 Figma shape) */}
        <div className="absolute top-[240px] left-[-30px] w-[460px] h-[380px] bg-[#EAE3D2]/40 rounded-full blur-[95px] pointer-events-none z-[2]" />

        {/* 100vh Banner Image */}
        <Image
          src="/banner/banner.png"
          alt="Banner"
          fill
          priority
          className="object-cover"
        />

        {/* Full-width Bottom Dark Depth Shadow Overlay (for soil texture & contrast) */}
        <div className="absolute bottom-0 inset-x-0 h-[38%] bg-gradient-to-t from-[#1c140d]/65 via-[#1c140d]/30 to-transparent pointer-events-none z-[3]" />

        {/* Full-width Bottom Cream Gradient Fade Overlay */}
        <div className="absolute bottom-0 inset-x-0 h-[24%] bg-gradient-to-t from-[#eae4d6] via-[#eae4d6]/75 to-transparent pointer-events-none z-[4]" />

        {/* Hero Content Overlay with Scroll Animations */}
        <div className="absolute inset-0 pt-[130px] md:pt-[150px] px-8 md:px-16 lg:px-24 flex items-start justify-start z-10 pointer-events-none">
          <HeroText />
        </div>
         <div
    className="absolute bottom-0 -left-[160px] rounded-full bg-[#EAE3D2] blur-2xl z-0"
    style={{ width: '295px', height: '432px' }}
  />
      </section>

      {/* Trusted By Section */}
      <TrustedBy />

      {/* Footer Component */}
      <Footer />
    </main>
  );
}
