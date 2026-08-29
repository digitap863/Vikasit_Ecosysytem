import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import { BlogPost, buildSlugQuery } from "@/lib/blogData";

export async function getAllBlogPostsServer(): Promise<BlogPost[]> {
  try {
    await connectToDatabase();
    const posts = await BlogPostModel.find({}).sort({ createdAt: -1, id: -1 }).lean();
    return JSON.parse(JSON.stringify(posts || []));
  } catch (error) {
    console.error("Error fetching blogs on server:", error);
    return [];
  }
}

export async function getBlogPostBySlugServer(slug: string): Promise<BlogPost | undefined> {
  if (!slug) return undefined;
  try {
    await connectToDatabase();
    const query = buildSlugQuery(slug);
    const post = await BlogPostModel.findOne(query).lean();
    if (post) {
      return JSON.parse(JSON.stringify(post));
    }
  } catch (error) {
    console.error("Error fetching single blog on server:", error);
  }
  return undefined;
}
