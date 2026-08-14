"use client";

import ProductBanner from "@/components/products/ProductBanner";
import SoilMakerSuitedFor from "@/components/products/SoilMakerSuitedFor";
import RestOfTheLoop from "@/components/products/RestOfTheLoop";
import KeyFeaturesTechnicalSpecs from "@/components/products/KeyFeaturesTechnicalSpecs";
import WasteActBanner from "@/components/products/WasteActBanner";
import FAQ from "@/components/FAQ";

export default function ProductsPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#EBE4D5] min-h-screen flex flex-col justify-between font-farro">
      {/* Main Content Area */}
      <div className="w-full flex-1">
        {/* Product Page Banner */}
        <ProductBanner />

        {/* Soil Maker Suited For Section */}
        <SoilMakerSuitedFor />

        {/* Key Features & Technical Specs Section */}
        <KeyFeaturesTechnicalSpecs />

        {/* Other Products Section */}
        <RestOfTheLoop />

        {/* Waste Management CTA Banner */}
        <WasteActBanner />

        <FAQ/>
      </div>
    </main>
  );
}
