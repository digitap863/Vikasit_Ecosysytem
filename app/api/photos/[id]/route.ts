import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ProjectPhotoModel from "@/models/ProjectPhoto";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface Params {
  params: Promise<{ id: string }> | { id: string };
}

export async function DELETE(request: Request, context: Params) {
  try {
    await connectToDatabase();
    const resolvedParams = await context.params;
    const targetId = decodeURIComponent(resolvedParams.id);

    const photo = await ProjectPhotoModel.findOne({
      $or: [{ id: targetId }, { _id: targetId.match(/^[0-9a-fA-F]{24}$/) ? targetId : null }],
    });

    if (!photo) {
      return NextResponse.json({ success: false, message: "Photo not found" }, { status: 404 });
    }

    // If Cloudinary publicId exists and Cloudinary credentials are set up, attempt destroying asset
    if (photo.publicId && process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        await cloudinary.uploader.destroy(photo.publicId);
      } catch (cloudErr) {
        console.warn("Failed to delete asset from Cloudinary:", cloudErr);
      }
    }

    await ProjectPhotoModel.deleteOne({ _id: photo._id });

    return NextResponse.json({ success: true, message: "Photo deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting project photo:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete photo" },
      { status: 500 }
    );
  }
}
