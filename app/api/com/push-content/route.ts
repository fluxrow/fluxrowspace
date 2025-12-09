import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { briefId } = body;

        if (!briefId) {
            return new NextResponse("Brief ID required", { status: 400 });
        }

        const brief = await db.contentBrief.findUnique({
            where: { id: briefId },
            include: {
                project: {
                    include: {
                        workspace: true
                    }
                },
                media_assets: true,
                ai_generated: true,
                scheduled_posts: true
            }
        });

        if (!brief) {
            return new NextResponse("Brief not found", { status: 404 });
        }

        const workspace = brief.project.workspace;

        if (!workspace.comEnabled || !workspace.comUrl) {
            return new NextResponse("COM integration not enabled", { status: 400 });
        }

        // Build payload
        const payload = {
            id: brief.id,
            caption: brief.ai_generated?.main_caption || brief.reference_text,
            imageUrl: brief.media_assets.find(m => m.type === 'IMAGE')?.url,
            status: brief.status,
            scheduledAt: brief.scheduled_posts[0]?.scheduled_at,
            projectName: brief.project.name,
            workspaceName: workspace.name
        };

        // Mock send to COM_URL
        console.log(`[COM_PUSH] Sending to ${workspace.comUrl}:`, payload);

        // In a real app, we would fetch(workspace.comUrl, { ... })

        await logActivity({
            workspaceId: workspace.id,
            action: "PUSH_TO_COM",
            targetType: "CONTENT_BRIEF",
            targetId: brief.id,
            metadata: { payload }
        });

        return NextResponse.json({ success: true, message: "Pushed to COM" });

    } catch (error) {
        console.error("[COM_PUSH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
