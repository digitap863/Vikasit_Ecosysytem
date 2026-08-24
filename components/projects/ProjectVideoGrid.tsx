"use client";

import { useState } from "react";
import VideoModal from "@/components/VideoModal";
import ScrollAnimation from "@/components/ui/ScrollAnimation";

export interface ProjectVideo {
  id: string;
  title: string;
  category: "WMaaS" | "Composting" | "Biomass" | "Automation" | "Field Action";
  description: string;
  videoUrl: string;
  duration?: string;
  location?: string;
}

const allProjectVideos: ProjectVideo[] = [
  {
    id: "v1",
    title: "Waste Management as a Service (WMaaS) Operations",
    category: "WMaaS",
    description: "End-to-end decentralized waste handling for institutions, residential complexes, and urban bodies.",
    videoUrl: "/video/wmas.mp4",
    duration: "Full Showcase",
    location: "Field Processing Site",
  },
  {
    id: "v2",
    title: "Organic Waste Processing & Biomass Transformation",
    category: "Biomass",
    description: "High-yield rapid organic waste processing into nutrient-dense bio-compost and bio-energy feeds.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.27.23 PM.mp4",
    duration: "Project Demo",
    location: "Biomass Plant 01",
  },
  {
    id: "v3",
    title: "Decentralized Composting & Resource Recovery",
    category: "Composting",
    description: "Community-scale composting units eliminating odor and reducing landfill transportation carbon footprint.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.27.23 PM (1).mp4",
    duration: "Site Highlight",
    location: "Municipal Ward Hub",
  },
  {
    id: "v4",
    title: "On-Site Waste Segregation & Tech Automation",
    category: "Automation",
    description: "Automated segregation machinery ensuring optimal purity of incoming organic fractions.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.27.23 PM (2).mp4",
    duration: "Tech Showcase",
    location: "Automation Yard",
  },
  {
    id: "v5",
    title: "Sustainable Municipal & Institutional Impact",
    category: "WMaaS",
    description: "Large-scale institutional waste diversion in partnership with municipal bodies and smart cities.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.45.24 PM.mp4",
    duration: "Impact Story",
    location: "Smart City Zone",
  },
  {
    id: "v6",
    title: "Biomass Resource Conversion & Operations",
    category: "Biomass",
    description: "Industrial organic waste conversion maximizing output quality for agriculture and soil restoration.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.45.41 PM.mp4",
    duration: "Field Footage",
    location: "Resource Recovery Hub",
  },
  {
    id: "v7",
    title: "Bio-Organic Processing & Facility Tour",
    category: "Composting",
    description: "Inside view of zero-emission composting facility and continuous aerobic digestion system.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.45.56 PM.mp4",
    duration: "Facility Tour",
    location: "Processing Center A",
  },
  {
    id: "v8",
    title: "Smart Composting Hub Setup & Demonstration",
    category: "Automation",
    description: "Plug-and-play modular composting setup installed at client site with automated moisture controls.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.45.56 PM (1).mp4",
    duration: "Live Demo",
    location: "Client Installation Site",
  },
  {
    id: "v9",
    title: "Municipal Waste Collection & Shredding Unit",
    category: "Field Action",
    description: "Primary shredding and sizing of wet waste prior to high-temperature microbial decomposition.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.46.18 PM.mp4",
    duration: "Action Clip",
    location: "Segregation Facility",
  },
  {
    id: "v10",
    title: "Organic Soil Conditioning & Output Processing",
    category: "Composting",
    description: "Final refinement, curing, and sifting of organic compost ready for agricultural distribution.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.46.18 PM (1).mp4",
    duration: "Output Review",
    location: "Refining Section",
  },
  {
    id: "v11",
    title: "Circular Organic Waste Ecosystem Overview",
    category: "WMaaS",
    description: "How Vikasit Ecosystem connects waste generators, processing hubs, and end-user soil enrichment.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.46.19 PM.mp4",
    duration: "Ecosystem Overview",
    location: "Central Project Hub",
  },
  {
    id: "v12",
    title: "Automated Heavy Duty Shredding & Mixing",
    category: "Automation",
    description: "Robust industrial shredding machinery operating with minimal power and zero secondary pollution.",
    videoUrl: "/Videos/WhatsApp Video 2026-08-20 at 2.46.19 PM (1).mp4",
    duration: "Equipment Demo",
    location: "Heavy Machinery Zone",
  },
  {
    id: "v13",
    title: "Field Site Operations & Equipment Handling",
    category: "Field Action",
    description: "Real-time field operations, material loading, and daily throughput tracking by our field engineers.",
    videoUrl: "/you_are_missing_the_side_porti.mp4",
    duration: "Field Operational",
    location: "Regional Processing Hub",
  },
];

export default function ProjectVideoGrid() {
  const [selectedVideo, setSelectedVideo] = useState<ProjectVideo | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="video-grid" className="w-full bg-[#EBE4D5] py-16 sm:py-20 md:py-24 px-6 sm:px-10 lg:px-12">
      <div className="max-w-[1320px] mx-auto">
        {/* Header Title */}
        <ScrollAnimation variant="fade-up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider font-farro text-[#2a2d2a]/70 block mb-2">
            Field Documentation & Real Action
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-farro text-[#2a2d2a] tracking-tight mb-4">
            Our Project Video Library
          </h2>
          <p className="text-base sm:text-lg text-neutral-700 font-farro leading-relaxed">
            Browse through our live field implementations, automated composting hubs, and decentralized biomass conversion technologies operating across locations.
          </p>
        </ScrollAnimation>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allProjectVideos.map((video) => (
              <div
                key={video.id}
                onMouseEnter={() => setHoveredId(video.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedVideo(video)}
                className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-black/10 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between aspect-[4/5] sm:aspect-[3/4]"
              >
                {/* Background Video Preview */}
                <video
                  src={video.videoUrl}
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  autoPlay={hoveredId === video.id}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                />

                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 group-hover:from-black transition-opacity duration-300 pointer-events-none" />

                {/* Top Badge Overlay */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider font-farro text-emerald-300 bg-black/60 backdrop-blur-md border border-white/10">
                    {video.category}
                  </span>
                  {video.location && (
                    <span className="text-[11px] font-medium font-farro text-neutral-300 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      📍 {video.location}
                    </span>
                  )}
                </div>

                {/* Center Play Button Icon */}
                <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 transition-all duration-300 shadow-2xl">
                    <svg
                      className="w-7 h-7 translate-x-0.5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-5 sm:p-6">
                  <h3 className="text-white text-lg font-bold font-farro leading-snug mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm font-farro line-clamp-2 leading-relaxed font-light">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl || null}
        title={selectedVideo?.title}
      />
    </section>
  );
}
