import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vikasit Admin Portal",
  description: "Content Management Portal for Vikasit Ecosystems",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#f6f7f4] text-neutral-950 font-farro">
      {children}
    </div>
  );
}
