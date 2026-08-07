import type { Metadata } from "next";
import { Farro } from "next/font/google";
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
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
