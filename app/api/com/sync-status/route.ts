import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { externalId, newStatus } = body;

        if (!externalId || !newStatus) {
            return new NextResponse("External ID and New Status required", { status: 400 });
        }

        const brief = await db.contentBrief.findUnique({
            where: { id: externalId },
            include: { project: true }
        });

        if (!brief) {
            return new NextResponse("Brief not found", { status: 404 });
        }

        await db.contentBrief.update({
            where: { id: externalId },
            data: { status: newStatus }
        });

        await logActivity({
            workspaceId: brief.project.workspace_id,
            action: "COM_STATUS_UPDATE",
            targetType: "CONTENT_BRIEF",
            targetId: brief.id,
            metadata: { newStatus }
        });

        return NextResponse.json({ success: true, message: "Status updated" });

    } catch (error) {
        console.error("[COM_SYNC]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
