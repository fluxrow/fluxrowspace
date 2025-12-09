import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mapDraftListItem } from "@/lib/campaign-draft-mappers";

export async function GET(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const drafts = await db.campaignDraft.findMany({
            where: {
                projectId: params.projectId,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(drafts.map(mapDraftListItem));
    } catch (error) {
        console.error("[CAMPAIGN_DRAFT_LIST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
