import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const workspaceId = searchParams.get("workspaceId");

        if (!workspaceId) {
            return new NextResponse("Workspace ID required", { status: 400 });
        }

        const posts = await db.scheduledPost.findMany({
            where: {
                content_brief: { project: { workspace_id: workspaceId } },
                status: 'SCHEDULED'
            },
            include: {
                content_brief: {
                    select: { title: true }
                }
            }
        });

        const csvRows = [
            ["Title", "Platform", "Scheduled At", "Status"],
            ...posts.map(post => [
                post.content_brief.title,
                post.platform,
                new Date(post.scheduled_at).toISOString(),
                post.status
            ])
        ];

        const csvContent = csvRows.map(e => e.join(",")).join("\n");

        return new NextResponse(csvContent, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="calendar_export.csv"`
            }
        });
    } catch (error) {
        console.error("[EXPORT_CSV]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
