import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// POST create new industry
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, icon, order, isActive } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.industry.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Industry with this slug already exists" },
        { status: 400 }
      );
    }

    // Get the highest order number
    const maxOrder = await prisma.industry.aggregate({
      _max: { order: true },
    });

    const industry = await prisma.industry.create({
      data: {
        name,
        slug,
        icon: icon || "Landmark",
        order: order ?? (maxOrder._max.order ?? 0) + 1,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(industry, { status: 201 });
  } catch (error) {
    console.error("Error creating industry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH reorder industries
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { orderedIds } = body;

    if (!orderedIds || !Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "orderedIds array is required" }, { status: 400 });
    }

    // Update order for each industry
    await Promise.all(
      orderedIds.map((id: string, index: number) =>
        prisma.industry.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering industries:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
