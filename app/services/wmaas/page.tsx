"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WmaasBanner from "@/components/services/WmaasBanner";
import WhyWmaasSection from "@/components/services/WhyWmaasSection";
import TenBenefitsSection from "@/components/services/TenBenefitsSection";
import IndustriesWeServeSection from "@/components/services/IndustriesWeServeSection";
import FAQ from "@/components/FAQ";
import ZeroFutureWasteBanner from "@/components/services/ZeroFutureWasteBanner";
import ProvenResultsSection from "@/components/services/ProvenResultsSection";
import OperationalBurdenBanner from "@/components/services/OperationalBurdenBanner";

export default function WmaasServicePage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#EBE4D5] min-h-screen flex flex-col justify-between font-farro">
      <Navbar />

      <div className="w-full flex-1">
        {/* Waste Management As A Service Banner */}
        <WmaasBanner />

        {/* Why WMAAS - A Smarter Way To Manage Waste */}
        <WhyWmaasSection />

        {/* Ten Benefits, One Subscription Section */}
        <TenBenefitsSection />
        {/* Industries We Serve Section */}
        <IndustriesWeServeSection />
        {/* Proven Results Section - What WMAAS Looks Like On The Ground */}
        <ProvenResultsSection />
        
        {/* Operational Burden Banner */}
        <OperationalBurdenBanner />
        
        <ZeroFutureWasteBanner />
        <FAQ />
      </div>

      <Footer />
    </main>
  );
}
