import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all active job listings (public)
export async function GET() {
  try {
    const jobs = await prisma.jobListing.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        description: true,
        scope: true,
        skills: true,
      },
    });

    // Parse JSON fields
    const parsedJobs = jobs.map((job) => ({
      ...job,
      scope: JSON.parse(job.scope),
      skills: JSON.parse(job.skills),
    }));

    return NextResponse.json(parsedJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
