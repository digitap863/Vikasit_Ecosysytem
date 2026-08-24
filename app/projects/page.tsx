"use client";

import ProjectHero from "@/components/projects/ProjectHero";
import ProjectVideoGrid from "@/components/projects/ProjectVideoGrid";
import TrustedBy from "@/components/TrustedBy";
import FAQ from "@/components/FAQ";

export default function ProjectsPage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#EBE4D5] min-h-screen flex flex-col justify-between font-farro">
      <div className="w-full flex-1">
        {/* Project Page Hero Banner */}
        <ProjectHero />

        {/* Trusted By Logos Banner */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
          <TrustedBy />
        </div>

        {/* All Video Projects Grid */}
        <ProjectVideoGrid />

        {/* Frequently Asked Questions */}
        <FAQ />
      </div>
    </main>
  );
}
