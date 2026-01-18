import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET site settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
    });

    // Create default settings if not exists
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "main",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT update settings
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      companyName,
      copyrightYear,
      contactEmail,
      careersEmail,
      siteTitle,
      siteDescription,
      siteUrl,
      ogImage,
      favicon,
      logoImage,
    } = body;

    const settings = await prisma.siteSettings.upsert({
      where: { id: "main" },
      update: {
        companyName,
        copyrightYear,
        contactEmail,
        careersEmail,
        siteTitle,
        siteDescription,
        siteUrl,
        ogImage,
        favicon,
        logoImage,
      },
      create: {
        id: "main",
        companyName,
        copyrightYear,
        contactEmail,
        careersEmail,
        siteTitle,
        siteDescription,
        siteUrl,
        ogImage,
        favicon,
        logoImage,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
