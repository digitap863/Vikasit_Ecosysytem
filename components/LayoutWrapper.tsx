"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="flex-1 w-full">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex-1 w-full">{children}</div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
