// Shared TypeScript interfaces and client API helpers for Project Videos

export interface ProjectVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  embedUrl: string;
  category?: string;
}

// Utility to parse any YouTube URL format (watch?v=, youtu.be/, embed/, etc.) into a clean embedUrl
export function extractYouTubeEmbedUrl(url: string): { embedUrl: string; videoId: string } {
  let videoId = "";
  try {
    const trimmed = url.trim();
    if (trimmed.includes("youtu.be/")) {
      const parts = trimmed.split("youtu.be/");
      const after = parts[1] || "";
      videoId = after.split("?")[0].split("&")[0];
    } else if (trimmed.includes("youtube.com/watch")) {
      const urlObj = new URL(trimmed);
      videoId = urlObj.searchParams.get("v") || "";
    } else if (trimmed.includes("youtube.com/embed/")) {
      const parts = trimmed.split("youtube.com/embed/");
      const after = parts[1] || "";
      videoId = after.split("?")[0].split("&")[0];
    } else {
      // Fallback assume raw ID if 11 chars
      videoId = trimmed;
    }
  } catch (e) {
    videoId = url.trim();
  }

  return {
    videoId,
    embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : url,
  };
}

export const INITIAL_PROJECT_VIDEOS: ProjectVideo[] = [
  {
    id: "yt1",
    title: "10 Tons/Day Wet Waste Plant in Bangalore 🌱 | Future with The Soil Maker",
    youtubeUrl: "https://www.youtube.com/watch?v=oRPOpg1cPTU",
    embedUrl: "https://www.youtube.com/embed/oRPOpg1cPTU",
  },
  {
    id: "yt2",
    title: "VIKASIT ECOSYSTEMS presents the \"SOIL MAKER\" at VRUTHI 2024",
    youtubeUrl: "https://youtu.be/x1CgPHZpBnw",
    embedUrl: "https://www.youtube.com/embed/x1CgPHZpBnw",
  },
  {
    id: "yt3",
    title: "THE SOIL MAKER - CIRCULAR ECONOMY - DECENTRALISED WASTE MANAGEMENT",
    youtubeUrl: "https://youtu.be/x9da_q0y6Dk",
    embedUrl: "https://www.youtube.com/embed/x9da_q0y6Dk",
  },
  {
    id: "yt4",
    title: "DECENTRALISED WASTE MANAGEMENT - ORGANIC WASTE TREATMENT",
    youtubeUrl: "https://youtu.be/3A9EDZIecOE",
    embedUrl: "https://www.youtube.com/embed/3A9EDZIecOE",
  },
  {
    id: "yt5",
    title: "On-Site Waste Processing Operations & Soil Maker Showcase",
    youtubeUrl: "https://youtu.be/xVR5KHjfVnU",
    embedUrl: "https://www.youtube.com/embed/xVR5KHjfVnU",
  },
  {
    id: "yt6",
    title: "Decentralized Organic Waste Management System Demonstration",
    youtubeUrl: "https://youtu.be/ePDR9cf7vqk",
    embedUrl: "https://www.youtube.com/embed/ePDR9cf7vqk",
  },
];

// Client API Fetchers

export async function fetchAllProjectVideos(): Promise<ProjectVideo[]> {
  try {
    const res = await fetch("/api/videos", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch project videos");
    const data = await res.json();
    if (data.success && Array.isArray(data.videos)) {
      return data.videos;
    }
  } catch (e) {
    console.error("Client fetch videos error:", e);
  }
  return INITIAL_PROJECT_VIDEOS;
}

export async function addProjectVideoToDb(videoData: {
  title: string;
  youtubeUrl: string;
}): Promise<ProjectVideo> {
  const { embedUrl } = extractYouTubeEmbedUrl(videoData.youtubeUrl);
  const payload = {
    id: `yt_${Date.now()}`,
    title: videoData.title,
    youtubeUrl: videoData.youtubeUrl,
    embedUrl,
  };

  const res = await fetch("/api/videos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to save project video to MongoDB");
  const data = await res.json();
  if (data.success && data.video) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("vikasit_videos_updated"));
    }
    return data.video;
  }
  throw new Error("Failed to create project video");
}

export async function deleteProjectVideoFromDb(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/videos/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("vikasit_videos_updated"));
      }
      return true;
    }
  } catch (e) {
    console.error("Failed to delete project video from MongoDB API", e);
  }
  return false;
}
