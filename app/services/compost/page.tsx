"use client";

import CompostBanner from "@/components/services/compost/CompostBanner";
import BrandedCompostSection from "@/components/services/compost/BrandedCompostSection";
import QualityAssuranceSection from "@/components/services/compost/QualityAssuranceSection";
import CustomizedCompostSection from "@/components/services/compost/CustomizedCompostSection";
import ClimateValueSection from "@/components/services/compost/ClimateValueSection";
import CoreEngineeringDiagramSection from "@/components/services/compost/CoreEngineeringDiagramSection";
import OperationalBurdenBanner from "@/components/services/wmaas/OperationalBurdenBanner";
import ZeroFutureWasteBanner from "@/components/services/wmaas/ZeroFutureWasteBanner";
import FAQ from "@/components/FAQ";

export default function CompostServicePage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#EBE4D5] min-h-screen flex flex-col justify-between font-farro">
      <div className="w-full flex-1">
        {/* Compost Value Chain Banner */}
        <CompostBanner />

        {/* Quality Assurance & Soil-Specific Fortification Section */}
        <QualityAssuranceSection />

        {/* Customized Compost Solutions For Organic Farms */}
        <CustomizedCompostSection />

        {/* From Compost To Carbon Credits - Climate Value Section */}
        <ClimateValueSection />

        {/* Core Engineering & Operational Highlights Diagram */}
        <CoreEngineeringDiagramSection />

        {/* Branded Compost Products Section */}
        <BrandedCompostSection />
        
        {/* Operational Burden Banner */}
        <OperationalBurdenBanner />

        {/* Zero Waste Future Banner */}
        <ZeroFutureWasteBanner />

        {/* FAQ Section */}
        <FAQ />
      </div>
    </main>
  );
}
