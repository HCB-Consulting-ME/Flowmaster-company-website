import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET single partner benefit
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const benefit = await prisma.partnerBenefit.findUnique({
      where: { id },
    });

    if (!benefit) {
      return NextResponse.json({ error: "Partner benefit not found" }, { status: 404 });
    }

    return NextResponse.json(benefit);
  } catch (error) {
    console.error("Error fetching partner benefit:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT update partner benefit
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, icon, order, isActive } = body;

    const benefit = await prisma.partnerBenefit.update({
      where: { id },
      data: {
        title,
        description,
        icon,
        order,
        isActive,
      },
    });

    return NextResponse.json(benefit);
  } catch (error) {
    console.error("Error updating partner benefit:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE partner benefit
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.partnerBenefit.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting partner benefit:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
