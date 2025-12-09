import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
    try {
        const { briefIds, status, workspaceId } = await req.json();

        if (!briefIds || !briefIds.length || !status) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        await db.contentBrief.updateMany({
            where: { id: { in: briefIds } },
            data: { status }
        });

        await logActivity({
            workspaceId,
            userId: 'user_123',
            action: 'UPDATE_BRIEF',
            targetType: 'CONTENT_BRIEF',
            metadata: { count: briefIds.length, status, type: 'bulk_status' }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[BULK_STATUS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
