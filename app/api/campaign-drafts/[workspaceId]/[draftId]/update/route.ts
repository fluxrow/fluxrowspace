import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CampaignDraftUpsertSchema } from "@/types/campaign-draft";

export async function PATCH(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string } }
) {
    try {
        const body = await req.json();
        // Use partial for update
        const parsed = CampaignDraftUpsertSchema.partial().safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid data", details: parsed.error }, { status: 400 });
        }

        const data = parsed.data;

        const updated = await db.campaignDraft.update({
            where: { id: params.draftId },
            data: {
                name: data.name,
                objective: data.objective,
                dailyBudget: data.dailyBudget,
                totalBudget: data.totalBudget,
                currency: data.currency,
                startDate: data.startDate ? new Date(data.startDate) : undefined,
                endDate: data.endDate ? new Date(data.endDate) : undefined,
                targetingJson: data.targeting ? (data.targeting as any) : undefined,
                // status: data.status // Status is not in UpsertSchema, maybe add it or handle separately?
                // For now, ignoring status update via this route if it's not in schema, or casting.
            },
            include: {
                MediaAsset: true,
                project: true
            }
        });

        return NextResponse.json(updated);
    } catch (err) {
        console.error("[CAMPAIGN_DRAFT_UPDATE]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
