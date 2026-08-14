"use client";

import CarbonCreditsBanner from "@/components/carbon-credits/CarbonCreditsBanner";
import WasteToClimateValueSection from "@/components/carbon-credits/WasteToClimateValueSection";
import HowCarbonCreditsGeneratedSection from "@/components/carbon-credits/HowCarbonCreditsGeneratedSection";
import EnvironmentalEconomicBenefitsSection from "@/components/carbon-credits/EnvironmentalEconomicBenefitsSection";
import RealImpactMeasurableResultsSection from "@/components/carbon-credits/RealImpactMeasurableResultsSection";
import FAQ from "@/components/FAQ";

export default function CarbonCreditsPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#EBE4D5] min-h-screen flex flex-col justify-between font-farro">
      <div className="w-full flex-1">
        {/* Carbon Credits Banner with Blended Figma Image */}
        <CarbonCreditsBanner />

        {/* Waste-To-Climate Value Section */}
        <WasteToClimateValueSection />

        {/* How Carbon Credits Are Generated Section */}
        <HowCarbonCreditsGeneratedSection />

        {/* Environmental & Economic Benefits Swiper Section */}
        <EnvironmentalEconomicBenefitsSection />

        {/* Real Impact. Measurable Results. Admin-Ready Section */}
        <RealImpactMeasurableResultsSection />

        {/* Frequently Asked Questions */}
        <FAQ />
      </div>
    </main>
  );
}
