import { notFound } from "next/navigation";
import BlogDetail from "@/components/blog/BlogDetail";
import { getBlogPostBySlug, BLOG_POSTS } from "@/components/blog/blogData";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    // Fallback to first post if slug isn't found
    const fallbackPost = BLOG_POSTS[0];
    return (
      <main className="relative w-full overflow-x-hidden bg-[#eae4d6] min-h-screen flex flex-col justify-between font-farro">
        <div className="pt-28 sm:pt-36 pb-16 w-full flex-1">
          <BlogDetail post={fallbackPost} />
        </div>
      </main>
    );
  }

  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6] min-h-screen flex flex-col justify-between font-farro">
      <div className="pt-28 sm:pt-36 pb-16 w-full flex-1">
        <BlogDetail post={post} />
      </div>
    </main>
  );
}
