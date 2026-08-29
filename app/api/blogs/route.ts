import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";

export async function GET() {
  try {
    await connectToDatabase();

    const posts = await BlogPostModel.find({}).sort({ createdAt: -1, id: -1 }).lean();

    return NextResponse.json({ success: true, posts: posts || [] });
  } catch (error: any) {
    console.error("Error fetching blog posts from MongoDB:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const nextId = body.id || Date.now();
    const newPostData = {
      ...body,
      id: nextId,
    };

    const createdPost = await BlogPostModel.create(newPostData);

    return NextResponse.json({ success: true, post: createdPost }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog post in MongoDB:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create blog post" },
      { status: 500 }
    );
  }
}
