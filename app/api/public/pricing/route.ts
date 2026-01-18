import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all active pricing plans (public)
export async function GET() {
  try {
    const plans = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        subtitle: true,
        price: true,
        period: true,
        badge: true,
        features: true,
        specs: true,
        ctaText: true,
        ctaLink: true,
        isPopular: true,
        isHighlighted: true,
      },
    });

    // Parse JSON fields
    const parsedPlans = plans.map((plan) => ({
      ...plan,
      features: JSON.parse(plan.features),
      specs: plan.specs ? JSON.parse(plan.specs) : null,
    }));

    return NextResponse.json(parsedPlans);
  } catch (error) {
    console.error("Error fetching pricing plans:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
