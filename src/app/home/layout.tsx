import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FacebookPixel } from "@/components/FacebookPixel";
import { AffiliateTracker } from "@/components/AffiliateTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Already good - ensures text remains visible during font load
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home - FabLearner",
  description:
    "Teaching kids to read with our proven science-backed methodology",
  icons: {
    icon: "https://fablearner.com/wp-content/uploads/2025/05/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FacebookPixel />
        <AffiliateTracker />
        {children}
      </body>
    </html>
  );
}

// Example usage in a checkout component
