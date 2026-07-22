import type { Metadata } from "next";
import { Farro } from "next/font/google";
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
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
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
      <body className="min-h-full flex flex-col font-farro">{children}</body>
    </html>
  );
}
