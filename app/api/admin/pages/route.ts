import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all page contents
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pages = await prisma.pageContent.findMany({
      orderBy: { pageSlug: "asc" },
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST create new page content
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { pageSlug, heroTitle, heroSubtitle, content, metaTitle, metaDescription } = body;

    if (!pageSlug || !heroTitle || !heroSubtitle) {
      return NextResponse.json(
        { error: "Page slug, hero title, and hero subtitle are required" },
        { status: 400 }
      );
    }

    // Check if page already exists
    const existing = await prisma.pageContent.findUnique({
      where: { pageSlug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Page with this slug already exists" },
        { status: 400 }
      );
    }

    const page = await prisma.pageContent.create({
      data: {
        pageSlug,
        heroTitle,
        heroSubtitle,
        content: content || "{}",
        metaTitle,
        metaDescription,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
