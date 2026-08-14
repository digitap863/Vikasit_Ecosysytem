import type { Metadata } from "next";
import { Farro } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const farro = Farro({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-farro",
});

export const metadata: Metadata = {
  title: "Vikasit Ecosystem",
  description: "Your trusted partner for comprehensive business solutions",
  icons: {
    icon: "/icon.webp",
    shortcut: "/favicon.ico",
    apple: "/icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${farro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-farro">
        <Navbar />
        <div className="flex-1 w-full">{children}</div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
