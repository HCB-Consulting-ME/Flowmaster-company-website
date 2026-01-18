import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import ClientLayout from "@/components/ClientLayout";
import { getSettings } from "@/lib/getSettings";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL(settings.siteUrl || "https://flow-master.ai"),
    title: settings.siteTitle,
    description: settings.siteDescription,
    icons: {
      icon: settings.favicon,
      apple: settings.favicon,
    },
    openGraph: {
      title: settings.siteTitle,
      description: settings.siteDescription,
      url: settings.siteUrl,
      siteName: settings.companyName,
      images: [
        {
          url: `${settings.siteUrl}${settings.ogImage}`,
          width: 2556,
          height: 1360,
          alt: `${settings.companyName} Logo`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.siteTitle,
      description: settings.siteDescription,
      images: [`${settings.siteUrl}${settings.ogImage}`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans bg-background text-foreground relative min-h-screen flex flex-col">
        <Toaster position="top-right" reverseOrder={false} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
