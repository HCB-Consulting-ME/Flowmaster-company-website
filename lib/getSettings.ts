import prisma from "@/lib/prisma";

export interface SiteSettings {
  companyName: string;
  copyrightYear: string;
  contactEmail: string;
  careersEmail: string;
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  ogImage: string;
  favicon: string;
  logoImage: string;
}

const defaultSettings: SiteSettings = {
  companyName: "FlowMaster FZC LLC",
  copyrightYear: "2026",
  contactEmail: "contact@flow-master.ai",
  careersEmail: "careers@flow-master.ai",
  siteTitle: "FlowMaster | Enterprise-Ready AI Agents",
  siteDescription: "The Platform for Enterprise-Ready AI Agents.",
  siteUrl: "https://flow-master.ai",
  ogImage: "/Logo/image.png",
  favicon: "/Logo/logoicon2.png",
  logoImage: "/Logo/newLogo.png",
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
    });

    if (!settings) {
      return defaultSettings;
    }

    return {
      companyName: settings.companyName,
      copyrightYear: settings.copyrightYear,
      contactEmail: settings.contactEmail,
      careersEmail: settings.careersEmail,
      siteTitle: settings.siteTitle,
      siteDescription: settings.siteDescription,
      siteUrl: settings.siteUrl,
      ogImage: settings.ogImage,
      favicon: settings.favicon,
      logoImage: settings.logoImage,
    };
  } catch (error) {
    console.error("Error fetching settings:", error);
    return defaultSettings;
  }
}
