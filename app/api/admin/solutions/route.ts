import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all industries with their solutions
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const industries = await prisma.industry.findMany({
      orderBy: { order: "asc" },
      include: {
        solutions: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json({ industries });
  } catch (error) {
    console.error("Error fetching industries:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST create new solution
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, icon, industryId, order, isActive } = body;

    if (!title || !description || !industryId) {
      return NextResponse.json(
        { error: "Title, description, and industry are required" },
        { status: 400 }
      );
    }

    // Get the highest order number for this industry
    const maxOrder = await prisma.solution.aggregate({
      where: { industryId },
      _max: { order: true },
    });

    const solution = await prisma.solution.create({
      data: {
        title,
        description,
        icon: icon || "Lightbulb",
        industryId,
        order: order ?? (maxOrder._max.order ?? 0) + 1,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(solution, { status: 201 });
  } catch (error) {
    console.error("Error creating solution:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH reorder solutions
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

    // Update order for each solution
    await Promise.all(
      orderedIds.map((id: string, index: number) =>
        prisma.solution.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering solutions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
