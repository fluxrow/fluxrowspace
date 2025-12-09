import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { workspaceId: string; campaignId: string } }
) {
    try {
        const { workspaceId, campaignId } = params;
        const body = await request.json();

        // Prepare update data
        const updateData: any = { ...body };

        // Handle dates if present
        if (updateData.startDate) {
            updateData.startDate = new Date(updateData.startDate);
        }
        if (updateData.endDate) {
            updateData.endDate = new Date(updateData.endDate);
        }

        // Remove immutable fields if passed
        delete updateData.id;
        delete updateData.workspaceId;
        delete updateData.createdAt;
        delete updateData.updatedAt;

        const campaign = await db.campaign.update({
            where: {
                id: campaignId,
                workspaceId,
            },
            data: updateData,
        });

        return NextResponse.json(campaign);
    } catch (error) {
        console.error("ROUTE_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
