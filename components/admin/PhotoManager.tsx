"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Trash2,
  Copy,
  ExternalLink,
  Search,
  Filter,
  Eye,
  X,
  Sparkles,
} from "lucide-react";
import {
  ProjectPhoto,
  PHOTO_CATEGORIES,
  fetchAllProjectPhotos,
  addProjectPhotoToDb,
  deleteProjectPhotoFromDb,
} from "@/lib/photoData";

export default function PhotoManager() {
  const [photos, setPhotos] = useState<ProjectPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Cloudinary configuration status state
  const [cloudStatus, setCloudStatus] = useState<{
    configured: boolean;
    cloudName: string | null;
  }>({ configured: false, cloudName: null });

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Decentralized Plants");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [altText, setAltText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [uploadedPublicId, setUploadedPublicId] = useState<string>("");

  // Filters & Notifications
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("ALL");
  const [notification, setNotification] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<ProjectPhoto | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const checkCloudinaryConfig = async () => {
    try {
      const res = await fetch("/api/admin/upload", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setCloudStatus({
          configured: Boolean(data.configured),
          cloudName: data.cloudName || null,
        });
      }
    } catch (e) {
      console.error("Cloudinary status check error:", e);
    }
  };

  const loadPhotos = async () => {
    setLoading(true);
    const data = await fetchAllProjectPhotos();
    setPhotos(data);
    setLoading(false);
  };

  useEffect(() => {
    checkCloudinaryConfig();
    loadPhotos();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, etc.).");
      return;
    }

    setError(null);
    setSelectedFile(file);
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setUploadedUrl("");
    setUploadedPublicId("");

    // Auto set alt text from file name if blank
    if (!altText) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ");
      setAltText(cleanName);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) return null;

    try {
      setUploadingImage(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (json.success && json.url) {
        setUploadedUrl(json.url);
        if (json.publicId) setUploadedPublicId(json.publicId);
        if (json.warning) {
          setNotification(`Notice: ${json.warning}`);
        }
        return { url: json.url as string, publicId: (json.publicId as string) || "" };
      } else {
        throw new Error(json.error || "Failed to upload image to Cloudinary.");
      }
    } catch (err: any) {
      setError(err?.message || "Error uploading file");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Please enter a title for the project photo.");
      return;
    }

    let finalImageUrl = uploadedUrl;
    let finalPublicId = uploadedPublicId;

    if (!finalImageUrl) {
      if (!selectedFile) {
        setError("Please select an image file to upload.");
        return;
      }

      setIsSubmitting(true);
      const uploadRes = await handleUploadImage();
      if (!uploadRes) {
        setIsSubmitting(false);
        return;
      }
      finalImageUrl = uploadRes.url;
      finalPublicId = uploadRes.publicId;
    }

    try {
      setIsSubmitting(true);
      const finalCat = category === "CUSTOM" ? customCategory.trim() || "Project Photo" : category;

      const newPhoto = await addProjectPhotoToDb({
        title: title.trim(),
        imageUrl: finalImageUrl,
        publicId: finalPublicId,
        category: finalCat,
        description: description.trim(),
        altText: altText.trim() || title.trim(),
      });

      // Reset Form
      setTitle("");
      setDescription("");
      setAltText("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadedUrl("");
      setUploadedPublicId("");
      setCustomCategory("");

      setNotification(`Project photo "${newPhoto.title}" added successfully!`);
      loadPhotos();
      window.setTimeout(() => setNotification(null), 6000);
    } catch (err: any) {
      setError(err?.message || "Failed to save project photo to database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, photoTitle: string) => {
    if (!confirm(`Are you sure you want to delete the photo "${photoTitle}"?`)) return;

    const success = await deleteProjectPhotoFromDb(id);
    if (success) {
      setNotification(`Photo "${photoTitle}" deleted successfully.`);
      loadPhotos();
      window.setTimeout(() => setNotification(null), 5000);
    } else {
      setError("Failed to delete project photo.");
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch =
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (photo.category && photo.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (photo.description && photo.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedFilterCategory === "ALL" || photo.category === selectedFilterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Cloudinary Integration Status Bar */}
      <div
        className={`rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          cloudStatus.configured
            ? "border-emerald-200 bg-emerald-50/70 text-emerald-900"
            : "border-amber-200 bg-amber-50/80 text-amber-900"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg shrink-0 ${
              cloudStatus.configured ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {cloudStatus.configured ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-bold flex items-center gap-2">
              Cloudinary Storage Engine
              {cloudStatus.configured ? (
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  Setup Required
                </span>
              )}
            </h4>
            <p className="text-xs mt-0.5 text-neutral-600 font-medium">
              {cloudStatus.configured
                ? `Connected to Cloudinary account (${cloudStatus.cloudName}). Uploads are stored securely in Cloudinary CDN.`
                : "Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) not found in .env.local. Images will temporary store locally until env is updated."}
            </p>
          </div>
        </div>

        {!cloudStatus.configured && (
          <div className="text-xs font-mono bg-white/80 border border-amber-200 rounded-md p-2 text-neutral-700 font-semibold self-stretch sm:self-auto">
            Edit <span className="text-[#056826] font-bold">.env.local</span> to enable Cloudinary
          </div>
        )}
      </div>

      {/* Top Banner Alert / Notification */}
      {notification && (
        <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800">
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
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-800">
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

      {/* Add New Project Photo Form Card */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs">
        <div className="mb-6 flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
              <Upload className="h-5 w-5 text-[#056826]" />
              Upload New Project Photo
            </h3>
            <p className="text-xs font-medium text-neutral-500 mt-0.5">
              Upload project installation images, machinery, or site photos directly to Cloudinary and display them on your public site.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* File Upload / Image Preview Column */}
            <div className="lg:col-span-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Project Image File <span className="text-red-500">*</span>
              </label>

              <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50/50 p-4 transition-colors hover:border-[#056826] hover:bg-[#edf6ef]/20 min-h-[220px]">
                {previewUrl ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-neutral-200 group">
                    <img
                      src={previewUrl}
                      alt="Upload preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <label
                        htmlFor="photo-upload-input"
                        className="cursor-pointer rounded-md bg-white/90 px-3 py-1.5 text-xs font-bold text-neutral-800 hover:bg-white transition-colors"
                      >
                        Change Photo
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          setUploadedUrl("");
                        }}
                        aria-label="Remove image preview"
                        className="rounded-md bg-red-600/90 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    {cloudStatus.configured && (
                      <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-black/70 backdrop-blur-xs px-2 py-1 text-[10px] font-bold text-white">
                        <Sparkles className="h-3 w-3 text-emerald-400" />
                        Cloudinary Ready
                      </span>
                    )}
                  </div>
                ) : (
                  <label
                    htmlFor="photo-upload-input"
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer py-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf6ef] text-[#056826] mb-3">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-bold text-neutral-800 text-center">
                      Click to upload or drag & drop image
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-1 text-center font-medium">
                      PNG, JPG, WEBP or SVG up to 10MB
                    </p>
                  </label>
                )}

                <input
                  id="photo-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Form Fields Column */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label htmlFor="photo-title-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Photo Title / Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="photo-title-input"
                  type="text"
                  required
                  placeholder="e.g. 10 TPD Organic Waste Processing Plant"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-neutral-900 placeholder:text-neutral-400 focus:border-[#056826] focus:outline-hidden focus:ring-1 focus:ring-[#056826]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="photo-category-select" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Category
                  </label>
                  <select
                    id="photo-category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-neutral-900 focus:border-[#056826] focus:outline-hidden focus:ring-1 focus:ring-[#056826]"
                  >
                    {PHOTO_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="CUSTOM">+ Custom Category</option>
                  </select>
                </div>

                {category === "CUSTOM" ? (
                  <div>
                    <label htmlFor="custom-category-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Custom Category Name
                    </label>
                    <input
                      id="custom-category-input"
                      type="text"
                      placeholder="e.g. Biogas Digester"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-neutral-900 placeholder:text-neutral-400 focus:border-[#056826] focus:outline-hidden focus:ring-1 focus:ring-[#056826]"
                    />
                  </div>
                ) : (
                  <div>
                    <label htmlFor="photo-alt-input" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Alt Text (SEO)
                    </label>
                    <input
                      id="photo-alt-input"
                      type="text"
                      placeholder="Descriptive alt text for image"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-neutral-900 placeholder:text-neutral-400 focus:border-[#056826] focus:outline-hidden focus:ring-1 focus:ring-[#056826]"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="photo-description-textarea" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Description / Details (Optional)
                </label>
                <textarea
                  id="photo-description-textarea"
                  rows={2}
                  placeholder="Provide details about location, capacity, technology used, or project scope..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-[#056826] focus:outline-hidden focus:ring-1 focus:ring-[#056826]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || uploadingImage}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#056826] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#04521e] focus:outline-hidden focus:ring-2 focus:ring-[#056826]/50 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting || uploadingImage ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading to Cloudinary...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Publish Project Photo
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Project Photo Gallery & Management Grid */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-950">
              Project Photos Gallery ({filteredPhotos.length})
            </h3>
            <p className="text-xs font-medium text-neutral-500">
              Manage uploaded photos stored in Cloudinary and MongoDB.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 pl-8 pr-3 py-1.5 text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-[#056826] focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative">
              <select
                aria-label="Filter photos by category"
                value={selectedFilterCategory}
                onChange={(e) => setSelectedFilterCategory(e.target.value)}
                className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 focus:border-[#056826] focus:bg-white focus:outline-hidden"
              >
                <option value="ALL">All Categories</option>
                {PHOTO_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-xs font-semibold text-neutral-500 gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#056826]" />
            Loading project photos...
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 py-12 text-center">
            <ImageIcon className="mx-auto h-8 w-8 text-neutral-300 mb-2" />
            <p className="text-sm font-bold text-neutral-700">No project photos found</p>
            <p className="text-xs text-neutral-500 mt-1">
              {searchQuery || selectedFilterCategory !== "ALL"
                ? "Try adjusting your search query or category filter."
                : "Use the upload form above to add your first project photo to Cloudinary."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={photo.imageUrl}
                    alt={photo.altText || photo.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {photo.category && (
                    <span className="absolute top-2.5 left-2.5 rounded-md bg-black/65 backdrop-blur-xs px-2 py-1 text-[10px] font-bold text-white">
                      {photo.category}
                    </span>
                  )}
                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLightboxPhoto(photo)}
                      className="rounded-md bg-white/90 p-2 text-neutral-800 hover:bg-white hover:text-black transition-colors"
                      title="View Fullsize"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(photo.imageUrl, photo.id)}
                      className="rounded-md bg-white/90 p-2 text-neutral-800 hover:bg-white hover:text-black transition-colors"
                      title="Copy Image URL"
                    >
                      {copiedId === photo.id ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(photo.id, photo.title)}
                      className="rounded-md bg-red-600/90 p-2 text-white hover:bg-red-600 transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Photo Info */}
                <div className="flex flex-1 flex-col p-4 justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 line-clamp-1">
                      {photo.title}
                    </h4>
                    {photo.description && (
                      <p className="text-xs text-neutral-500 line-clamp-2 mt-1 font-medium">
                        {photo.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                    <span className="truncate max-w-[150px] font-mono text-[10px] text-neutral-500">
                      {photo.imageUrl.includes("cloudinary") ? "Cloudinary CDN" : "Data Image"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDelete(photo.id, photo.title)}
                      className="text-red-600 hover:text-red-800 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Preview Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <div>
                <h3 className="text-base font-bold text-neutral-950">{lightboxPhoto.title}</h3>
                {lightboxPhoto.category && (
                  <span className="text-xs text-[#056826] font-bold">
                    {lightboxPhoto.category}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 bg-neutral-900 flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={lightboxPhoto.imageUrl}
                alt={lightboxPhoto.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="p-6 space-y-4">
              {lightboxPhoto.description && (
                <p className="text-xs text-neutral-600 font-medium">{lightboxPhoto.description}</p>
              )}

              <div className="flex items-center justify-between border-t border-neutral-100 pt-4 text-xs">
                <div className="truncate max-w-[400px] text-neutral-500 font-mono text-[11px]">
                  {lightboxPhoto.imageUrl}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(lightboxPhoto.imageUrl, lightboxPhoto.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
                  >
                    {copiedId === lightboxPhoto.id ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Image Link
                      </>
                    )}
                  </button>
                  <a
                    href={lightboxPhoto.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#056826] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#04521e]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Open Full Image
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
