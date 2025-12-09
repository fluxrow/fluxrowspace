import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AdCreativeDraftSchema } from "@/types/ad-campaign-draft";

export async function GET(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string } }
) {
    try {
        const { workspaceId, draftId } = params;

        if (!workspaceId || !draftId) {
            return new NextResponse("Missing IDs", { status: 400 });
        }

        // Verify draft ownership
        const draft = await db.adCampaignDraft.findUnique({
            where: { id: draftId },
            include: { project: true },
        });

        if (!draft || draft.project.workspace_id !== workspaceId) {
            return new NextResponse("Draft not found or unauthorized", { status: 404 });
        }

        const creatives = await db.adCreativeDraft.findMany({
            where: {
                campaignId: draftId,
            },
            include: {
                mediaAsset: true,
                aiText: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(creatives);
    } catch (error) {
        console.error("[AD_CREATIVE_DRAFTS_LIST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string } }
) {
    try {
        const { workspaceId, draftId } = params;
        const body = await req.json();

        if (!workspaceId || !draftId) {
            return new NextResponse("Missing IDs", { status: 400 });
        }

        // Verify draft ownership
        const draft = await db.adCampaignDraft.findUnique({
            where: { id: draftId },
            include: { project: true },
        });

        if (!draft || draft.project.workspace_id !== workspaceId) {
            return new NextResponse("Draft not found or unauthorized", { status: 404 });
        }

        const validation = AdCreativeDraftSchema.safeParse({ ...body, campaignId: draftId });

        if (!validation.success) {
            return new NextResponse(JSON.stringify(validation.error.errors), { status: 400 });
        }

        const { mediaAssetId, aiTextId, placement, primaryText, headline, description, callToAction, metaAdId } = validation.data;

        const creative = await db.adCreativeDraft.create({
            data: {
                campaignId: draftId,
                mediaAssetId,
                aiTextId,
                placement,
                primaryText,
                headline,
                description,
                callToAction,
                metaAdId,
            },
        });

        return NextResponse.json(creative);
    } catch (error) {
        console.error("[AD_CREATIVE_DRAFTS_CREATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
