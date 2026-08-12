"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutVideoSection from "@/components/about/AboutVideoSection";
import AboutStorySection from "@/components/about/AboutStorySection";
import AboutMissionSection from "@/components/about/AboutMissionSection";
import CommitmentsSection from "@/components/about/CommitmentsSection";
import JoinUsSection from "@/components/about/JoinUsSection";
import TrustedBy from "@/components/TrustedBy";
import FAQ from "@/components/FAQ";

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6] min-h-screen flex flex-col justify-between font-farro">
      <Navbar />

      <div className="pt-28 sm:pt-36 px-4 sm:px-6 lg:px-12 max-w-[1320px] mx-auto w-full space-y-12">
        {/* About Page Hero Banner */}
        <AboutHero />

        {/* Trusted By Section */}
        <TrustedBy />
      </div>

      {/* Centered Our Story Section (Full Width Map Background) */}
      <div className="w-full my-8">
        <AboutStorySection />
      </div>

      {/* Dark Mission Section with Running Value Counter Stats */}
      <AboutMissionSection />

      {/* Three Commitments Section */}
      <CommitmentsSection />

      {/* Video Showcase Section (GIF style looping video) */}
      <AboutVideoSection />

      {/* Join Us Leadership & Mission Cards Section */}
      <JoinUsSection />

      {/* FAQ Accordion Section */}
      <FAQ />

      <Footer />
    </main>
  );
}
