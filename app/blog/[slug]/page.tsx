import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/blog/BlogDetail";
import { getBlogPostBySlugServer } from "@/lib/blogServer";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlugServer(resolvedParams.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Vikasit Ecosystems",
    };
  }

  const title = post.metaTitle || `${post.title} | Vikasit Ecosystems`;
  const description =
    post.metaDescription ||
    post.shortDescription ||
    post.content?.intro?.slice(0, 160) ||
    "Read the latest waste management and sustainability insights from Vikasit Ecosystems.";
  const canonicalUrl = post.canonicalUrl || `https://vikasitecosystems.com/blog/${post.slug}`;
  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : `https://vikasitecosystems.com${post.image || "/blog_banner.webp"}`;

  return {
    title,
    description,
    keywords:
      post.tags && post.tags.length > 0
        ? post.tags.join(", ")
        : "Waste Management, Soil Maker OWC, Composting, Sustainability",
    authors: [{ name: post.author || "Vikasit Ecosystems" }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Vikasit Ecosystems",
      images: [
        {
          url: imageUrl,
          alt: post.featuredImageAlt || post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlugServer(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = post.canonicalUrl || `https://vikasitecosystems.com/blog/${post.slug}`;
  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : `https://vikasitecosystems.com${post.image || "/blog_banner.webp"}`;
  const description =
    post.metaDescription ||
    post.shortDescription ||
    post.content?.intro?.slice(0, 160) ||
    "Read the latest insights from Vikasit Ecosystems.";

  // Generate or parse JSON-LD Structured Data Schema for Search Engines
  let jsonLdSchema: object;
  if (post.schemaMarkup) {
    try {
      jsonLdSchema = JSON.parse(post.schemaMarkup);
    } catch {
      jsonLdSchema = buildDefaultJsonLd(post, canonicalUrl, imageUrl, description);
    }
  } else {
    jsonLdSchema = buildDefaultJsonLd(post, canonicalUrl, imageUrl, description);
  }

  return (
    <main className="relative w-full overflow-x-hidden bg-[#eae4d6] min-h-screen flex flex-col justify-between font-farro">
      {/* Inject JSON-LD Schema Markup into page for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <div className="pt-28 sm:pt-36 pb-16 w-full flex-1">
        <BlogDetail post={post} />
      </div>
    </main>
  );
}

function buildDefaultJsonLd(
  post: { title: string; author?: string; date?: string },
  canonicalUrl: string,
  imageUrl: string,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: description,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: post.author || "Vikasit Ecosystems",
    },
    publisher: {
      "@type": "Organization",
      name: "Vikasit Ecosystems",
      logo: {
        "@type": "ImageObject",
        url: "https://vikasitecosystems.com/icon.webp",
      },
    },
    datePublished: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };
}
