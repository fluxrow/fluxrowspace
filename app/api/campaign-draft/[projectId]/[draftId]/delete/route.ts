import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { projectId: string; draftId: string } }
) {
    try {
        await db.campaignDraft.delete({
            where: { id: params.draftId },
        });

        return NextResponse.json({ status: "DELETED" });
    } catch (error) {
        console.error("[CAMPAIGN_DRAFT_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
