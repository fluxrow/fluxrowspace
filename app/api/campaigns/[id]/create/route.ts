import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, objective, projectId, budget, startDate, endDate, creativeMediaId, creativeText } = body;

    if (!workspaceId || !name || !objective || !projectId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const campaign = await db.campaign.create({
      data: {
        workspaceId,
        projectId,
        name,
        objective,
        budget,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        creativeMediaId,
        creativeText,
        status: "DRAFT",
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("ROUTE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
