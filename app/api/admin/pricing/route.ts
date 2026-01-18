import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all pricing plans
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plans = await prisma.pricingPlan.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(plans);
  } catch (error) {
    console.error("Error fetching pricing plans:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST create new pricing plan
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, subtitle, price, period, features, isPopular, ctaText, ctaLink } = body;

    if (!name || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get the highest order number
    const maxOrder = await prisma.pricingPlan.aggregate({
      _max: { order: true },
    });

    const plan = await prisma.pricingPlan.create({
      data: {
        name,
        subtitle,
        price,
        period,
        features: Array.isArray(features) ? JSON.stringify(features) : features,
        isPopular: isPopular ?? false,
        ctaText,
        ctaLink,
        order: (maxOrder._max.order ?? 0) + 1,
        isActive: true,
      },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error("Error creating pricing plan:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH reorder pricing plans
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

    // Update order for each plan
    await Promise.all(
      orderedIds.map((id: string, index: number) =>
        prisma.pricingPlan.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering pricing plans:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
