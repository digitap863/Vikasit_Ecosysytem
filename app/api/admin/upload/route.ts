import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const isConfigured = Boolean(
    cloudName &&
    cloudName.trim() !== "" &&
    apiKey &&
    apiKey.trim() !== "" &&
    apiSecret &&
    apiSecret.trim() !== ""
  );

  return NextResponse.json({
    configured: isConfigured,
    cloudName: isConfigured ? cloudName : null,
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const isCloudinaryConfigured = Boolean(
      cloudName &&
      cloudName.trim() !== "" &&
      apiKey &&
      apiKey.trim() !== "" &&
      apiSecret &&
      apiSecret.trim() !== ""
    );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (isCloudinaryConfigured) {
      const folder = process.env.CLOUDINARY_FOLDER || "vikasit_projects";

      const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "auto",
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Cloudinary upload failed"));
            } else {
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
            }
          }
        );
        stream.end(buffer);
      });

      return NextResponse.json({
        success: true,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        provider: "cloudinary",
      });
    }

    // Fallback if Cloudinary environment variables are not populated yet
    const mimeType = file.type || "image/png";
    const base64Image = `data:${mimeType};base64,${buffer.toString("base64")}`;

    return NextResponse.json({
      success: true,
      url: base64Image,
      publicId: "",
      provider: "base64",
      warning: "Cloudinary credentials not set in .env.local. Stored as local data URL.",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process image upload" },
      { status: 500 }
    );
  }
}
