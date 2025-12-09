import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string } }
) {
    try {
        await db.campaignDraft.delete({
            where: { id: params.draftId }
        });

        return NextResponse.json({ status: "deleted" });
    } catch (err) {
        console.error("[CAMPAIGN_DRAFT_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
