import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        // 1. Total Posts (Briefs)
        const totalBriefs = await db.contentBrief.count({
            where: { project: { workspace_id: params.id } }
        });

        // 2. Scheduled vs Published
        const scheduledPosts = await db.scheduledPost.count({
            where: {
                content_brief: { project: { workspace_id: params.id } },
                status: 'SCHEDULED'
            }
        });

        const publishedPosts = await db.scheduledPost.count({
            where: {
                content_brief: { project: { workspace_id: params.id } },
                status: 'PUBLISHED'
            }
        });

        // 3. AI Usage
        const usage = await db.workspaceUsage.findFirst({
            where: { id: params.id }
        });

        // 4. Posts per Project
        const projects = await db.project.findMany({
            where: { workspace_id: params.id },
            include: {
                _count: {
                    select: { contentBriefs: true }
                }
            },
            take: 5
        });

        const projectStats = projects.map(p => ({
            name: p.name,
            count: p._count.contentBriefs
        }));

        return NextResponse.json({
            totalBriefs,
            scheduledPosts,
            publishedPosts,
            aiGenerations: usage?.aiGenerations || 0,
            projectStats
        });
    } catch (error) {
        console.error("[ANALYTICS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
