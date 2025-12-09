import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
    try {
        const { briefIds, targetProjectId, workspaceId } = await req.json();

        if (!briefIds || !briefIds.length || !targetProjectId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const briefs = await db.contentBrief.findMany({
            where: { id: { in: briefIds } }
        });

        const newBriefs = await Promise.all(briefs.map(async (brief) => {
            return db.contentBrief.create({
                data: {
                    project_id: targetProjectId,
                    title: `${brief.title} (Copy)`,
                    objective: brief.objective,
                    content_type: brief.content_type,
                    channel: brief.channel,
                    reference_text: brief.reference_text,
                    status: 'DRAFT', // Reset status
                    requiresApproval: brief.requiresApproval, // Copy approval setting
                    approvalStatus: brief.requiresApproval ? 'pending' : 'none'
                }
            });
        }));

        await logActivity({
            workspaceId,
            action: 'CREATE_BRIEF',
            targetType: 'CONTENT_BRIEF',
            metadata: { count: newBriefs.length, type: 'bulk_duplicate' }
        });

        return NextResponse.json({ count: newBriefs.length });
    } catch (error) {
        console.error("[BULK_DUPLICATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
