import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import { buildSlugQuery } from "@/lib/blogData";

interface Params {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function GET(request: Request, context: Params) {
  try {
    await connectToDatabase();
    const resolvedParams = await context.params;
    const rawSlug = resolvedParams.slug;
    const query = buildSlugQuery(rawSlug);

    const post = await BlogPostModel.findOne(query).lean();

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error("Error fetching single blog post:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: Params) {
  try {
    await connectToDatabase();
    const resolvedParams = await context.params;
    const rawSlug = resolvedParams.slug;
    const query = buildSlugQuery(rawSlug);

    const deleted = await BlogPostModel.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: Params) {
  try {
    await connectToDatabase();
    const resolvedParams = await context.params;
    const rawSlug = resolvedParams.slug;
    const query = buildSlugQuery(rawSlug);

    const body = await request.json();

    const updated = await BlogPostModel.findOneAndUpdate(query, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: updated });
  } catch (error: any) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update post" },
      { status: 500 }
    );
  }
}
