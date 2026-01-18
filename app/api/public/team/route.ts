import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all active team members (public)
export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        role: true,
        image: true,
        linkedIn: true,
      },
    });

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
