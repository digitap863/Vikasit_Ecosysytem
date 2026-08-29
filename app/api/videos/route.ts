import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ProjectVideoModel from "@/models/ProjectVideo";
import { INITIAL_PROJECT_VIDEOS, extractYouTubeEmbedUrl } from "@/lib/videoData";

export async function GET() {
  try {
    await connectToDatabase();
    let videos = await ProjectVideoModel.find({}).sort({ createdAt: -1, id: -1 }).lean();

    // Auto-seed initial 6 YouTube videos if database is empty
    if (!videos || videos.length === 0) {
      console.log("Seeding initial 6 YouTube videos into MongoDB...");
      await ProjectVideoModel.insertMany(INITIAL_PROJECT_VIDEOS);
      videos = await ProjectVideoModel.find({}).sort({ createdAt: -1, id: -1 }).lean();
    }

    return NextResponse.json({ success: true, videos });
  } catch (error: any) {
    console.error("Error fetching project videos from MongoDB:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch project videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const youtubeUrl = body.youtubeUrl || "";
    const { embedUrl } = extractYouTubeEmbedUrl(youtubeUrl);
    const nextId = body.id || `yt_${Date.now()}`;

    const newVideoData = {
      id: nextId,
      title: body.title || "Vikasit Project Video",
      youtubeUrl,
      embedUrl,
      category: body.category || "Project Video",
    };

    const createdVideo = await ProjectVideoModel.create(newVideoData);

    return NextResponse.json({ success: true, video: createdVideo }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating project video in MongoDB:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create project video" },
      { status: 500 }
    );
  }
}
