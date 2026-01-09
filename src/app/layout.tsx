import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desi IPTV – Premium Live Streaming",
  description: "Desi IPTV offers high-quality live TV, movies, sports, and on-demand entertainment with smooth streaming on all devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[linear-gradient(180deg,_#0a0a0a,_#0b0f1a)] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
