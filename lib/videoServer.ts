import { connectToDatabase } from "@/lib/mongodb";
import ProjectVideoModel from "@/models/ProjectVideo";
import { ProjectVideo, INITIAL_PROJECT_VIDEOS } from "@/lib/videoData";

export async function getAllProjectVideosServer(): Promise<ProjectVideo[]> {
  try {
    await connectToDatabase();
    let videos = await ProjectVideoModel.find({}).sort({ createdAt: -1, id: -1 }).lean();

    // Auto-seed initial 6 YouTube videos if collection is empty
    if (!videos || videos.length === 0) {
      console.log("Seeding initial 6 YouTube project videos into MongoDB...");
      await ProjectVideoModel.insertMany(INITIAL_PROJECT_VIDEOS);
      videos = await ProjectVideoModel.find({}).sort({ createdAt: -1, id: -1 }).lean();
    }

    return JSON.parse(JSON.stringify(videos || INITIAL_PROJECT_VIDEOS));
  } catch (error) {
    console.error("Error fetching project videos on server:", error);
    return INITIAL_PROJECT_VIDEOS;
  }
}
