"use client";

import MainServicesBanner from "@/components/services/MainServicesBanner";
import ThreeCommitmentsSection from "@/components/services/ThreeCommitmentsSection";
import EndToEndProcessSection from "@/components/services/EndToEndProcessSection";

import FAQ from "@/components/FAQ";

export default function ServicesPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#EBE4D5] min-h-screen flex flex-col justify-between font-farro">
      <div className="w-full flex-1">
        {/* Main Services Banner Header with Soft Blended Banner Image */}
        <MainServicesBanner />

        {/* Three Commitments Behind Every Install (Figma design section) */}
        <ThreeCommitmentsSection />

        {/* Our End-To-End Process 7-Step Section */}
        <EndToEndProcessSection />

        {/* Frequently Asked Questions */}
        <FAQ />
      </div>
    </main>
  );
}
