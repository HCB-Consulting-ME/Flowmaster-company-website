import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [teamMembers, jobListings, solutions, locations] = await Promise.all([
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.jobListing.count({ where: { isActive: true } }),
      prisma.solution.count({ where: { isActive: true } }),
      prisma.officeLocation.count({ where: { isActive: true } }),
    ]);

    return NextResponse.json({
      teamMembers,
      jobListings,
      solutions,
      locations,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
