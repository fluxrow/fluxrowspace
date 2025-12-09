import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { workspaceId: string; campaignId: string } }
) {
    try {
        const { workspaceId, campaignId } = params;

        const campaign = await db.campaign.findUnique({
            where: {
                id: campaignId,
                workspaceId,
            },
            include: {
                creativeMedia: true,
            },
        });

        if (!campaign) {
            return new NextResponse("Campaign not found", { status: 404 });
        }

        return NextResponse.json(campaign);
    } catch (error) {
        console.error("ROUTE_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
