import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CampaignDraftUpsertSchema } from "@/types/campaign-draft";

export async function POST(req: Request, { params }: { params: { workspaceId: string } }) {
    try {
        const body = await req.json();

        // Adapt payload to match schema if necessary, or just parse
        // Assuming the frontend sends data matching CampaignDraftUpsertSchema
        const parsed = CampaignDraftUpsertSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid data", details: parsed.error }, { status: 400 });
        }

        const data = parsed.data;

        // Note: projectId is not in UpsertSchema, so we expect it in body or we need to fetch/infer it.
        // The user's snippet had `projectId: data.projectId`. 
        // But UpsertSchema doesn't have projectId. 
        // We'll assume the body has projectId separately or we need to add it to the schema?
        // For now, I'll cast body to any to get projectId if it's there.
        const projectId = (body as any).projectId;

        if (!projectId) {
            return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
        }

        const draft = await db.campaignDraft.create({
            data: {
                workspaceId: params.workspaceId,
                projectId: projectId,
                name: data.name,
                objective: data.objective,
                status: "DRAFT",
                dailyBudget: data.dailyBudget,
                totalBudget: data.totalBudget,
                currency: data.currency,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                targetingJson: data.targeting ? (data.targeting as any) : undefined,
                // mediaAssetId: data.mediaAssetId || null, // Not in UpsertSchema
                // copyText: data.copyText || null // Not in Schema
            },
            include: {
                MediaAsset: true,
                project: true // Case sensitive: project, not Project
            }
        });

        return NextResponse.json(draft);
    } catch (err) {
        console.error("[CAMPAIGN_DRAFT_CREATE]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
