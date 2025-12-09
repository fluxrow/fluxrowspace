import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { UpdateCampaignDraftSchema } from "@/types/campaign-draft";
import { Decimal } from "@prisma/client/runtime/library";

export async function PUT(
    req: Request,
    { params }: { params: { projectId: string; draftId: string } }
) {
    try {
        const json = await req.json();
        const parsed = UpdateCampaignDraftSchema.parse(json);

        const updated = await db.campaignDraft.update({
            where: { id: params.draftId },
            data: {
                title: parsed.title,
                objective: parsed.objective,
                status: parsed.status,
                budget: parsed.budget ? new Decimal(parsed.budget) : undefined,
                scheduleStart: parsed.scheduleStart ? new Date(parsed.scheduleStart) : undefined,
                scheduleEnd: parsed.scheduleEnd ? new Date(parsed.scheduleEnd) : undefined,
                creativeId: parsed.creativeId,
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("[CAMPAIGN_DRAFT_UPDATE]", error);
        return new NextResponse("Invalid Request", { status: 400 });
    }
}
