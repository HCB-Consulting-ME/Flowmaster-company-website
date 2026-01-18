import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all active office locations (public)
export async function GET() {
  try {
    const locations = await prisma.officeLocation.findMany({
      where: { isActive: true },
      orderBy: [
        { isHeadquarters: "desc" },
        { order: "asc" },
      ],
      select: {
        id: true,
        name: true,
        city: true,
        country: true,
        countryCode: true,
        address: true,
        latitude: true,
        longitude: true,
        phone: true,
        email: true,
        isHeadquarters: true,
      },
    });

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
