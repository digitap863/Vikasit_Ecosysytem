"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WmaasBanner from "@/components/services/WmaasBanner";
import WhyWmaasSection from "@/components/services/WhyWmaasSection";
import TenBenefitsSection from "@/components/services/TenBenefitsSection";
import IndustriesWeServeSection from "@/components/services/IndustriesWeServeSection";
import ProvenResultsSection from "@/components/services/ProvenResultsSection";
import OperationalBurdenBanner from "@/components/services/OperationalBurdenBanner";
import ZeroFutureWasteBanner from "@/components/services/ZeroFutureWasteBanner";

export default function ServicesPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#EBE4D5] min-h-screen flex flex-col justify-between font-farro">
      <Navbar />

      {/* Main Content Area */}
      <div className="w-full flex-1">
        {/* Waste Management As A Service Hero Banner */}
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

        {/* Zero Waste Future Banner */}
        <ZeroFutureWasteBanner />
      </div>

      <Footer />
    </main>
  );
}
