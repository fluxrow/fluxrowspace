import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request, { params }: { params: { token: string } }) {
    try {
        const { comment } = await req.json();

        const brief = await db.contentBrief.findFirst({
            where: { approvalToken: params.token }
        });

        if (!brief) {
            return new NextResponse("Invalid token", { status: 404 });
        }

        const updatedBrief = await db.contentBrief.update({
            where: { id: brief.id },
            data: {
                approvalStatus: 'rejected',
                approvalComment: comment
            }
        });

        await logActivity({
            workspaceId: (await db.project.findUnique({ where: { id: brief.project_id } }))!.workspace_id,
            userId: null, // Client action
            action: 'REJECT_CONTENT',
            targetType: 'CONTENT_BRIEF',
            targetId: brief.id,
            metadata: { token: params.token, comment }
        });

        return NextResponse.json(updatedBrief);
    } catch (error) {
        console.error("[APPROVAL_REJECT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
