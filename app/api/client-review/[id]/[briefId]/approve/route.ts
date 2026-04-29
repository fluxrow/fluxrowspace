import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/activity";

export async function POST(
    req: Request,
    { params }: { params: { workspaceId: string; briefId: string } }
) {
    try {
        const { workspaceId, briefId } = params;
        const { comment } = await req.json().catch(() => ({}));

        // 1. Atualizar o status do brief
        const updated = await db.contentBrief.update({
            where: { id: briefId },
            data: {
                approvalStatus: "approved"
            }
        });

        // 2. Registrar no histórico do cliente
        await db.clientReviewHistory.create({
            data: {
                briefId,
                workspaceId: workspaceId,
                action: "approved",
                comment: comment ?? null
            }
        });

        // 3. Registrar no Activity Log interno
        await logActivity({
            workspaceId,
            action: "CONTENT_BRIEF_APPROVED",
            targetType: "CONTENT_BRIEF",
            targetId: briefId,
            metadata: { comment }
        });

        return NextResponse.json({ status: "approved" });
    } catch (err) {
        console.error("APPROVE ERROR", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
