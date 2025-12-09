import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mapCampaignDraftListItem } from "@/lib/campaign-draft-mappers";

export async function GET(
    req: Request,
    { params }: { params: { workspaceId: string } }
) {
    try {
        const drafts = await db.campaignDraft.findMany({
            where: {
                workspaceId: params.workspaceId,
            },
            include: {
                MediaAsset: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(drafts.map(mapCampaignDraftListItem));
    } catch (error) {
        console.error("[CAMPAIGN_DRAFT_LIST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
