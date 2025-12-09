import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AdCampaignDraftSchema } from "@/types/ad-campaign-draft";

export async function GET(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string } }
) {
    try {
        const { workspaceId, draftId } = params;

        if (!workspaceId || !draftId) {
            return new NextResponse("Missing IDs", { status: 400 });
        }

        const draft = await db.adCampaignDraft.findUnique({
            where: {
                id: draftId,
            },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        workspace_id: true,
                    },
                },
                brief: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                adCreatives: {
                    include: {
                        mediaAsset: true,
                        aiText: true,
                    },
                },
            },
        });

        if (!draft) {
            return new NextResponse("Draft not found", { status: 404 });
        }

        if (draft.project.workspace_id !== workspaceId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        return NextResponse.json(draft);
    } catch (error) {
        console.error("[AD_CAMPAIGN_DRAFTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string } }
) {
    try {
        const { workspaceId, draftId } = params;
        const body = await req.json();

        if (!workspaceId || !draftId) {
            return new NextResponse("Missing IDs", { status: 400 });
        }

        // Validate partial update
        const validation = AdCampaignDraftSchema.partial().safeParse(body);

        if (!validation.success) {
            return new NextResponse(JSON.stringify(validation.error.errors), { status: 400 });
        }

        const { projectId, briefId, name, objective, status, dailyBudget, totalBudget, currency, startDate, endDate, metaCampaignId } = validation.data;

        // Verify ownership
        const existingDraft = await db.adCampaignDraft.findUnique({
            where: { id: draftId },
            include: { project: true },
        });

        if (!existingDraft) {
            return new NextResponse("Draft not found", { status: 404 });
        }

        if (existingDraft.project.workspace_id !== workspaceId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const updatedDraft = await db.adCampaignDraft.update({
            where: {
                id: draftId,
            },
            data: {
                projectId,
                briefId,
                name,
                objective,
                status,
                dailyBudget,
                totalBudget,
                currency,
                startDate,
                endDate,
                metaCampaignId,
            },
        });

        return NextResponse.json(updatedDraft);
    } catch (error) {
        console.error("[AD_CAMPAIGN_DRAFTS_UPDATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string } }
) {
    try {
        const { workspaceId, draftId } = params;

        if (!workspaceId || !draftId) {
            return new NextResponse("Missing IDs", { status: 400 });
        }

        // Verify ownership
        const existingDraft = await db.adCampaignDraft.findUnique({
            where: { id: draftId },
            include: { project: true },
        });

        if (!existingDraft) {
            return new NextResponse("Draft not found", { status: 404 });
        }

        if (existingDraft.project.workspace_id !== workspaceId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await db.adCampaignDraft.delete({
            where: {
                id: draftId,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[AD_CAMPAIGN_DRAFTS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
