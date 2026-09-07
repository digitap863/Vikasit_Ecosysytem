// Shared TypeScript interfaces and client API helpers for Project Photos

export interface ProjectPhoto {
  id: string;
  title: string;
  imageUrl: string;
  publicId?: string;
  category?: string;
  description?: string;
  altText?: string;
  createdAt?: string;
}

export const INITIAL_PROJECT_PHOTOS: ProjectPhoto[] = [

];

export const PHOTO_CATEGORIES = [
  "Decentralized Plants",
  "Composting Technology",
  "Dry Waste Recovery",
  "Biogas Systems",
  "Solar & Clean Tech",
  "On-Site Operations",
];

// Client API Fetchers

export async function fetchAllProjectPhotos(): Promise<ProjectPhoto[]> {
  try {
    const res = await fetch("/api/photos", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch project photos");
    const data = await res.json();
    if (data.success && Array.isArray(data.photos)) {
      return data.photos;
    }
  } catch (e) {
    console.error("Client fetch photos error:", e);
  }
  return INITIAL_PROJECT_PHOTOS;
}

export async function addProjectPhotoToDb(photoData: {
  title: string;
  imageUrl: string;
  publicId?: string;
  category?: string;
  description?: string;
  altText?: string;
}): Promise<ProjectPhoto> {
  const payload = {
    id: `photo_${Date.now()}`,
    title: photoData.title,
    imageUrl: photoData.imageUrl,
    publicId: photoData.publicId || "",
    category: photoData.category || "Project Photo",
    description: photoData.description || "",
    altText: photoData.altText || photoData.title,
  };

  const res = await fetch("/api/photos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to save project photo to MongoDB");
  const data = await res.json();
  if (data.success && data.photo) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("vikasit_photos_updated"));
    }
    return data.photo;
  }
  throw new Error("Failed to create project photo");
}

export async function deleteProjectPhotoFromDb(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/photos/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("vikasit_photos_updated"));
      }
      return true;
    }
  } catch (e) {
    console.error("Failed to delete project photo from MongoDB API", e);
  }
  return false;
}
