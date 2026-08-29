import { notFound } from "next/navigation";
import BlogDetail from "@/components/blog/BlogDetail";
import { getBlogPostBySlugServer } from "@/lib/blogServer";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlugServer(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6] min-h-screen flex flex-col justify-between font-farro">
      <div className="pt-28 sm:pt-36 pb-16 w-full flex-1">
        <BlogDetail post={post} />
      </div>
    </main>
  );
}
