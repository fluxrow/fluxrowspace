import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { workspaceId: string; campaignId: string } }
) {
    try {
        const { workspaceId, campaignId } = params;

        await db.campaign.delete({
            where: {
                id: campaignId,
                workspaceId,
            },
        });

        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error("ROUTE_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
