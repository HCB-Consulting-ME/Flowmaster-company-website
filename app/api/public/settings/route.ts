import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET site settings (public)
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
      select: {
        companyName: true,
        copyrightYear: true,
        contactEmail: true,
        careersEmail: true,
        siteTitle: true,
        siteDescription: true,
        siteUrl: true,
        ogImage: true,
        favicon: true,
        logoImage: true,
      },
    });

    if (!settings) {
      return NextResponse.json({
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
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
