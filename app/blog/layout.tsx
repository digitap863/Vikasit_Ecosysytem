import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs & News | Vikasit Ecosystems",
  description:
    "Explore articles, guides, and updates on waste management, organic waste converters (OWC), composting, and sustainable ecosystems.",
  openGraph: {
    title: "Blogs & News | Vikasit Ecosystems",
    description:
      "Explore articles, guides, and updates on waste management, organic waste converters (OWC), composting, and sustainable ecosystems.",
    url: "https://vikasitecosystems.com/blog",
    siteName: "Vikasit Ecosystems",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
