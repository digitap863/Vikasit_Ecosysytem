"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  ProjectVideo,
  fetchAllProjectVideos,
  addProjectVideoToDb,
  deleteProjectVideoFromDb,
  extractYouTubeEmbedUrl,
} from "@/lib/videoData";

export default function VideoManager() {
  const [videos, setVideos] = useState<ProjectVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadVideos = async () => {
    setLoading(true);
    const data = await fetchAllProjectVideos();
    setVideos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !youtubeUrl.trim()) {
      setError("Please enter both a title and a valid YouTube URL.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const newVideo = await addProjectVideoToDb({
        title: title.trim(),
        youtubeUrl: youtubeUrl.trim(),
      });
      setTitle("");
      setYoutubeUrl("");
      setNotification(`Video "${newVideo.title}" added successfully!`);
      loadVideos();
      window.setTimeout(() => setNotification(null), 5000);
    } catch (err: any) {
      setError(err?.message || "Failed to add video");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, videoTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${videoTitle}"?`)) return;

    const success = await deleteProjectVideoFromDb(id);
    if (success) {
      setNotification(`Video "${videoTitle}" deleted successfully.`);
      loadVideos();
      window.setTimeout(() => setNotification(null), 5000);
    } else {
      setError("Failed to delete video.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Add New YouTube Video Card */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-neutral-950">Add New YouTube Video</h3>
          <p className="text-xs font-medium text-neutral-500">
            Paste any YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...) to publish it to your live project gallery.
          </p>
        </div>

        {notification && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800">
            <span>{notification}</span>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-emerald-700 hover:bg-emerald-100 px-1.5 py-0.5 rounded"
            >
              ✕
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-800">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-red-700 hover:bg-red-100 px-1.5 py-0.5 rounded"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Video Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 10 Tons/Day Wet Waste Plant in Bangalore 🌱 | Future with The Soil Maker"
              className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#056826] focus:outline-hidden focus:ring-1 focus:ring-[#056826]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              YouTube Video URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=oRPOpg1cPTU or https://youtu.be/xVR5KHjfVnU"
              className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#056826] focus:outline-hidden focus:ring-1 focus:ring-[#056826]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-[#056826] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#034c1c] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Publishing Video..." : "Publish Video to Database"}
            </button>
          </div>
        </form>
      </div>

      {/* Published YouTube Videos Table */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-950">Published YouTube Videos ({videos.length})</h3>
            <p className="text-xs font-medium text-neutral-500">
              Live YouTube video cards stored in MongoDB and fetched across the site.
            </p>
          </div>
          <button
            type="button"
            onClick={loadVideos}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
          >
            Refresh List
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-semibold text-neutral-500">
            Loading YouTube videos from database...
          </div>
        ) : videos.length === 0 ? (
          <div className="py-12 text-center text-xs font-semibold text-neutral-500">
            No videos published yet. Use the form above to add your first YouTube video!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((vid) => {
              const { videoId } = extractYouTubeEmbedUrl(vid.youtubeUrl || vid.embedUrl);
              const thumbUrl = videoId
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : "/product/product_side.png";

              return (
                <div
                  key={vid.id}
                  className="flex items-center gap-4 rounded-lg border border-neutral-200 p-3 hover:border-neutral-300 transition-all bg-neutral-50/50"
                >
                  <div className="relative h-20 w-32 shrink-0 rounded-md overflow-hidden bg-black">
                    <img src={thumbUrl} alt={vid.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-xs">
                        <svg className="h-3.5 w-3.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-xs font-bold text-neutral-900">{vid.title}</h4>
                    <p className="truncate text-[11px] font-medium text-neutral-500 mt-0.5">
                      {vid.youtubeUrl || vid.embedUrl}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(vid.id, vid.title)}
                    className="rounded-md border border-red-200 bg-white p-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors shrink-0 cursor-pointer"
                    title="Delete Video"
                  >
                    <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
