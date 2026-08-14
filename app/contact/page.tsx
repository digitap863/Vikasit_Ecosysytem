"use client";

import { Suspense } from "react";
import ContactCard from "@/components/contact/ContactCard";
import ContactLocations from "@/components/contact/ContactLocations";

function ContactPageContent() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1320px] mx-auto w-full space-y-10 sm:space-y-14 flex-1">
      {/* Top Contact Info & Form Card */}
      <ContactCard />

      {/* Dual Google Maps Locations */}
      <ContactLocations />
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6] min-h-screen flex flex-col justify-between font-farro">
      <Suspense fallback={<div className="py-40 text-center text-neutral-600 font-sans">Loading Contact Page...</div>}>
        <ContactPageContent />
      </Suspense>
    </main>
  );
}
