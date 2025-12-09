import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
    try {
        const { scheduledPostIds, scheduledAt, workspaceId } = await req.json();

        if (!scheduledPostIds || !scheduledPostIds.length || !scheduledAt) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        await db.scheduledPost.updateMany({
            where: { id: { in: scheduledPostIds } },
            data: { scheduled_at: scheduledAt }
        });

        await logActivity({
            workspaceId,
            userId: 'user_123',
            action: 'SCHEDULE_POST',
            targetType: 'SCHEDULED_POST',
            metadata: { count: scheduledPostIds.length, scheduledAt, type: 'bulk_reschedule' }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[BULK_RESCHEDULE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
