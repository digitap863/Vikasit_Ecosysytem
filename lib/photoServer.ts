import { connectToDatabase } from "@/lib/mongodb";
import ProjectPhotoModel from "@/models/ProjectPhoto";
import { ProjectPhoto, INITIAL_PROJECT_PHOTOS } from "@/lib/photoData";

export async function getAllProjectPhotosServer(): Promise<ProjectPhoto[]> {
  try {
    await connectToDatabase();
    let photos = await ProjectPhotoModel.find({}).sort({ createdAt: -1, id: -1 }).lean();

    // Auto-seed initial project photos if collection is empty
    if (!photos || photos.length === 0) {
      console.log("Seeding initial project photos into MongoDB...");
      await ProjectPhotoModel.insertMany(INITIAL_PROJECT_PHOTOS);
      photos = await ProjectPhotoModel.find({}).sort({ createdAt: -1, id: -1 }).lean();
    }

    return JSON.parse(JSON.stringify(photos || INITIAL_PROJECT_PHOTOS));
  } catch (error) {
    console.error("Error fetching project photos on server:", error);
    return INITIAL_PROJECT_PHOTOS;
  }
}
