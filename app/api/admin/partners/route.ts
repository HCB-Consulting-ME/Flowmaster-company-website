import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all partner benefits
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const benefits = await prisma.partnerBenefit.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(benefits);
  } catch (error) {
    console.error("Error fetching partner benefits:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST create new partner benefit
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, icon, order, isActive } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Get the highest order number
    const maxOrder = await prisma.partnerBenefit.aggregate({
      _max: { order: true },
    });

    const benefit = await prisma.partnerBenefit.create({
      data: {
        title,
        description,
        icon: icon || "Lightbulb",
        order: order ?? (maxOrder._max.order ?? 0) + 1,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(benefit, { status: 201 });
  } catch (error) {
    console.error("Error creating partner benefit:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH reorder partner benefits
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

    // Update order for each benefit
    await Promise.all(
      orderedIds.map((id: string, index: number) =>
        prisma.partnerBenefit.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering partner benefits:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
