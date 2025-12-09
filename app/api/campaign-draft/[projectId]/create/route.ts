import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CreateCampaignDraftSchema } from "@/types/campaign-draft";
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const json = await req.json();
        const parsed = CreateCampaignDraftSchema.parse(json);

        const draft = await db.campaignDraft.create({
            data: {
                projectId: params.projectId,
                title: parsed.title,
                objective: parsed.objective,
                budget: parsed.budget ? new Decimal(parsed.budget) : undefined,
                scheduleStart: parsed.scheduleStart ? new Date(parsed.scheduleStart) : undefined,
                scheduleEnd: parsed.scheduleEnd ? new Date(parsed.scheduleEnd) : undefined,
                creativeId: parsed.creativeId,
                status: "draft",
            },
        });

        return NextResponse.json(draft);
    } catch (error) {
        console.error("[CAMPAIGN_DRAFT_CREATE]", error);
        return new NextResponse("Invalid Request", { status: 400 });
    }
}
