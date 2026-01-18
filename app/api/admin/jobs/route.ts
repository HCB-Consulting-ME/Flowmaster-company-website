import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all jobs
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs = await prisma.jobListing.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST create new job
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, department, location, description, scope, skills, isActive } = body;

    if (!title || !department || !location || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get the highest order number
    const maxOrder = await prisma.jobListing.aggregate({
      _max: { order: true },
    });

    const job = await prisma.jobListing.create({
      data: {
        title,
        department,
        location,
        description,
        scope: JSON.stringify(scope || []),
        skills: JSON.stringify(skills || []),
        order: (maxOrder._max.order ?? 0) + 1,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH reorder jobs
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

    // Update order for each job
    await Promise.all(
      orderedIds.map((id: string, index: number) =>
        prisma.jobListing.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering jobs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
