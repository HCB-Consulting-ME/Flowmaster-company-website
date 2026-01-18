import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all locations
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const locations = await prisma.officeLocation.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST create new location
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, city, country, address, latitude, longitude, phone, email, isHeadquarters } = body;

    if (!name || !city || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get the highest order number
    const maxOrder = await prisma.officeLocation.aggregate({
      _max: { order: true },
    });

    const location = await prisma.officeLocation.create({
      data: {
        name,
        city,
        country,
        address,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        phone,
        email,
        isHeadquarters: isHeadquarters ?? false,
        order: (maxOrder._max.order ?? 0) + 1,
        isActive: true,
      },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    console.error("Error creating location:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH reorder locations
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

    // Update order for each location
    await Promise.all(
      orderedIds.map((id: string, index: number) =>
        prisma.officeLocation.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering locations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
