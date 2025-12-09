import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AdCampaignDraftSchema } from "@/types/ad-campaign-draft";

export async function POST(
    req: Request,
    { params }: { params: { workspaceId: string } }
) {
    try {
        const { workspaceId } = params;
        const body = await req.json();

        if (!workspaceId) {
            return new NextResponse("Workspace ID is required", { status: 400 });
        }

        const validation = AdCampaignDraftSchema.safeParse(body);

        if (!validation.success) {
            return new NextResponse(JSON.stringify(validation.error.errors), { status: 400 });
        }

        const { projectId, briefId, name, objective, status, dailyBudget, totalBudget, currency, startDate, endDate, metaCampaignId } = validation.data;

        // Verify project belongs to workspace
        const project = await db.project.findUnique({
            where: {
                id: projectId,
                workspace_id: workspaceId,
            },
        });

        if (!project) {
            return new NextResponse("Project not found or access denied", { status: 404 });
        }

        const draft = await db.adCampaignDraft.create({
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

        return NextResponse.json(draft);
    } catch (error) {
        console.error("[AD_CAMPAIGN_DRAFTS_CREATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
