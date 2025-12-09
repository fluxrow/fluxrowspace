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
                    select: { title: true, objective: true }
                }
            }
        });

        let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//FluxSpace//Calendar//EN\n";

        posts.forEach(post => {
            const date = new Date(post.scheduled_at);
            const start = date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
            const end = new Date(date.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"; // 1 hour duration

            icsContent += "BEGIN:VEVENT\n";
            icsContent += `UID:${post.id}\n`;
            icsContent += `DTSTAMP:${start}\n`;
            icsContent += `DTSTART:${start}\n`;
            icsContent += `DTEND:${end}\n`;
            icsContent += `SUMMARY:${post.content_brief.title} (${post.platform})\n`;
            icsContent += `DESCRIPTION:${post.content_brief.objective || "Scheduled post"}\n`;
            icsContent += "END:VEVENT\n";
        });

        icsContent += "END:VCALENDAR";

        return new NextResponse(icsContent, {
            headers: {
                "Content-Type": "text/calendar",
                "Content-Disposition": `attachment; filename="calendar_export.ics"`
            }
        });
    } catch (error) {
        console.error("[EXPORT_ICS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
