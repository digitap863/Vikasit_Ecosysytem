"use client";

import { BlogPost } from "@/lib/blogData";

interface AdminStatsProps {
  posts: BlogPost[];
  totalInquiries?: number;
}

export default function AdminStats({
  posts,
  totalInquiries = 0,
}: AdminStatsProps) {
  const customPostsCount = posts.filter((post) => post.id > 1000).length;

  const metrics = [
    {
      label: "Total Inquiries",
      value: totalInquiries,
      detail: "Submissions from website",
    },
    { label: "Total Articles", value: posts.length, detail: "Published in the CMS" },
    { label: "Custom Posts", value: customPostsCount, detail: "Created from admin" },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-lg border border-neutral-200 bg-white p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            {metric.label}
          </p>
          <p className="mt-2 truncate text-2xl font-bold text-neutral-950">{metric.value}</p>
          <p className="mt-1 truncate text-xs font-medium text-neutral-500">{metric.detail}</p>
        </div>
      ))}
    </section>
  );
}
