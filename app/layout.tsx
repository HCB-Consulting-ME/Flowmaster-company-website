import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle } from "lucide-react";

// We keep Material Icons locally or via CDN for compatibility with existing assets if needed, 
// but we prefer Lucide for new components.
// The original Landing Page used Material Icons heavily. 
// We include the CDN to support legacy HTML parts if we copy them directly.

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FlowMaster | Enterprise-Ready AI Agents",
  description: "The Platform for Enterprise-Ready AI Agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" /> */}
      </head>
      <body className="antialiased font-sans bg-background text-foreground relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="bg-navy-900 dark:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-2xl hover:scale-105 transition-transform"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-bold">Let's Talk</span>
          </button>
        </div>
      </body>
    </html>
  );
}
