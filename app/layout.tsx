import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';

// We keep Material Icons locally or via CDN for compatibility with existing assets if needed, 
// but we prefer Lucide for new components.
// The original Landing Page used Material Icons heavily. 
// We include the CDN to support legacy HTML parts if we copy them directly.

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FlowMaster | Enterprise-Ready AI Agents",
  description: "The Platform for Enterprise-Ready AI Agents.",
  icons: {
    icon: "/Logo/logoicon2.png",
    apple: "/Logo/logoicon2.png",
  },
  openGraph: {
    title: "FlowMaster | Enterprise-Ready AI Agents",
    description: "The Platform for Enterprise-Ready AI Agents.",
    url: "https://flow-master.ai",
    siteName: "FlowMaster",
    images: [
      {
        url: "https://flow-master.ai/Logo/logoicon2.png",
        width: 512,
        height: 512,
        alt: "FlowMaster Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FlowMaster | Enterprise-Ready AI Agents",
    description: "The Platform for Enterprise-Ready AI Agents.",
    images: ["https://flow-master.ai/Logo/logoicon2.png"],
  },
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
        <Toaster position="top-right" reverseOrder={false} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {/* <div className="fixed cursor-pointer bottom-6 right-6 z-50">
          <Contact />
        </div> */}
      </body>
    </html>
  );
}
