import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ProjectPhotoModel from "@/models/ProjectPhoto";
import { INITIAL_PROJECT_PHOTOS } from "@/lib/photoData";

export async function GET() {
  try {
    await connectToDatabase();
    let photos = await ProjectPhotoModel.find({}).sort({ createdAt: -1, id: -1 }).lean();

    // Auto-seed initial project photos if database is empty
    if (!photos || photos.length === 0) {
      console.log("Seeding initial project photos into MongoDB...");
      await ProjectPhotoModel.insertMany(INITIAL_PROJECT_PHOTOS);
      photos = await ProjectPhotoModel.find({}).sort({ createdAt: -1, id: -1 }).lean();
    }

    return NextResponse.json({ success: true, photos });
  } catch (error: any) {
    console.error("Error fetching project photos from MongoDB:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch project photos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.title || !body.imageUrl) {
      return NextResponse.json(
        { success: false, error: "Title and image URL are required" },
        { status: 400 }
      );
    }

    const nextId = body.id || `photo_${Date.now()}`;

    const newPhotoData = {
      id: nextId,
      title: body.title,
      imageUrl: body.imageUrl,
      publicId: body.publicId || "",
      category: body.category || "Project Photo",
      description: body.description || "",
      altText: body.altText || body.title,
    };

    const createdPhoto = await ProjectPhotoModel.create(newPhotoData);

    return NextResponse.json({ success: true, photo: createdPhoto }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating project photo in MongoDB:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create project photo" },
      { status: 500 }
    );
  }
}
