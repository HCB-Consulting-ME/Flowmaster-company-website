import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all active industries with their solutions (public)
export async function GET() {
  try {
    const industries = await prisma.industry.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: {
        solutions: {
          where: { isActive: true },
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            description: true,
            icon: true,
          },
        },
      },
    });

    // Transform to the format expected by the frontend
    const solutionsData: Record<string, Array<{
      topic: string;
      issue: string;
      impact: string;
      benefit: string;
      icon: string;
    }>> = {};

    const industriesList = industries.map((ind) => {
      solutionsData[ind.slug] = ind.solutions.map((sol) => ({
        topic: sol.title,
        issue: "", // Can be extended if needed
        impact: sol.description,
        benefit: "", // Can be extended if needed
        icon: sol.icon,
      }));

      return {
        id: ind.slug,
        label: ind.name,
        icon: ind.icon,
      };
    });

    return NextResponse.json({
      industries: industriesList,
      solutionsData,
    });
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
