import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all active culture values (public)
export async function GET() {
  try {
    const values = await prisma.cultureValue.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        icon: true,
      },
    });

    return NextResponse.json(values);
  } catch (error) {
    console.error("Error fetching culture values:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
