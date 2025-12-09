import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AdCreativeDraftSchema } from "@/types/ad-campaign-draft";

export async function PATCH(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string; creativeId: string } }
) {
    try {
        const { workspaceId, draftId, creativeId } = params;
        const body = await req.json();

        if (!workspaceId || !draftId || !creativeId) {
            return new NextResponse("Missing IDs", { status: 400 });
        }

        // Verify ownership via draft
        const creative = await db.adCreativeDraft.findUnique({
            where: { id: creativeId },
            include: {
                campaign: {
                    include: {
                        project: true,
                    },
                },
            },
        });

        if (!creative) {
            return new NextResponse("Creative not found", { status: 404 });
        }

        if (creative.campaignId !== draftId) {
            return new NextResponse("Creative does not belong to this draft", { status: 400 });
        }

        if (creative.campaign.project.workspace_id !== workspaceId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const validation = AdCreativeDraftSchema.partial().safeParse(body);

        if (!validation.success) {
            return new NextResponse(JSON.stringify(validation.error.errors), { status: 400 });
        }

        const { mediaAssetId, aiTextId, placement, primaryText, headline, description, callToAction, metaAdId } = validation.data;

        const updatedCreative = await db.adCreativeDraft.update({
            where: {
                id: creativeId,
            },
            data: {
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

        return NextResponse.json(updatedCreative);
    } catch (error) {
        console.error("[AD_CREATIVE_DRAFTS_UPDATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string; creativeId: string } }
) {
    try {
        const { workspaceId, draftId, creativeId } = params;

        if (!workspaceId || !draftId || !creativeId) {
            return new NextResponse("Missing IDs", { status: 400 });
        }

        // Verify ownership via draft
        const creative = await db.adCreativeDraft.findUnique({
            where: { id: creativeId },
            include: {
                campaign: {
                    include: {
                        project: true,
                    },
                },
            },
        });

        if (!creative) {
            return new NextResponse("Creative not found", { status: 404 });
        }

        if (creative.campaignId !== draftId) {
            return new NextResponse("Creative does not belong to this draft", { status: 400 });
        }

        if (creative.campaign.project.workspace_id !== workspaceId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await db.adCreativeDraft.delete({
            where: {
                id: creativeId,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[AD_CREATIVE_DRAFTS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
