import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/activity";

export async function POST(
    req: Request,
    { params }: { params: { workspaceId: string; briefId: string } }
) {
    try {
        const { workspaceId, briefId } = params;
        const { comment } = await req.json();

        // 1. Atualizar status
        const updated = await db.contentBrief.update({
            where: { id: briefId },
            data: {
                approvalStatus: "rejected"
            }
        });

        // 2. Registrar histórico
        await db.clientReviewHistory.create({
            data: {
                briefId,
                workspaceId: workspaceId,
                action: "rejected",
                comment: comment ?? null
            }
        });

        // 3. Activity Log
        await logActivity({
            workspaceId,
            action: "CONTENT_BRIEF_REJECTED",
            targetType: "CONTENT_BRIEF",
            targetId: briefId,
            metadata: { comment }
        });

        return NextResponse.json({ status: "rejected" });
    } catch (err) {
        console.error("REJECT ERROR", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
