import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hasFeature, checkLimit } from "@/lib/subscription";

export async function POST(req: Request) {
    try {
        const { briefId, scheduledTime, workspaceId } = await req.json();

        if (!workspaceId) {
            return new NextResponse("Workspace ID required", { status: 400 });
        }

        // Check Meta feature access
        const canScheduleMeta = await hasFeature(workspaceId, 'meta');
        if (!canScheduleMeta) {
            return new NextResponse("Meta scheduling is a Pro feature.", { status: 403 });
        }

        // Check Post limits
        const currentUsage = await db.workspaceUsage.findFirst({
            where: {
                workspaceId,
                month: new Date().toISOString().slice(0, 7)
            }
        });

        const usageCount = currentUsage?.postsCreated || 0;
        const canPost = await checkLimit(workspaceId, 'postsPerMonth', usageCount);

        if (!canPost) {
            return new NextResponse("Post limit reached. Upgrade to Pro.", { status: 403 });
        }

        // Mock Meta Scheduling
        console.log(`Scheduling brief ${briefId} for ${scheduledTime}`);

        // Increment usage
        const month = new Date().toISOString().slice(0, 7);
        await db.workspaceUsage.upsert({
            where: {
                workspaceId_month: {
                    workspaceId,
                    month
                }
            },
            update: {
                postsCreated: { increment: 1 }
            },
            create: {
                workspaceId,
                month,
                postsCreated: 1
            }
        });

        return NextResponse.json({ success: true, scheduledId: "meta_sched_123" });
    } catch (error) {
        console.error("[META_SCHEDULE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
