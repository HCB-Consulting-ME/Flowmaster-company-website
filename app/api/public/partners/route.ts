import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all active partner benefits (public)
export async function GET() {
  try {
    const benefits = await prisma.partnerBenefit.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        icon: true,
      },
    });

    return NextResponse.json(benefits);
  } catch (error) {
    console.error("Error fetching partner benefits:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
