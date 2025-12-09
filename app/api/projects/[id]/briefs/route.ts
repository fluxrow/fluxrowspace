import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/activity";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const { title, objective } = await req.json();

        if (!title) {
            return new NextResponse("Title required", { status: 400 });
        }

        // Fetch project to check default approval setting
        const project = await db.project.findUnique({
            where: { id: params.id }
        });

        if (!project) {
            return new NextResponse("Project not found", { status: 404 });
        }

        const requiresApproval = project.defaultRequiresApproval;
        const approvalStatus = requiresApproval ? 'pending' : 'none';
        const approvalToken = requiresApproval ? uuidv4() : null;

        const brief = await db.contentBrief.create({
            data: {
                project_id: params.id,
                title,
                objective,
                requiresApproval,
                approvalStatus,
                approvalToken
            }
        });

        await logActivity({
            workspaceId: project.workspace_id,
            userId: 'user_123', // Mock user
            action: 'CREATE_BRIEF',
            targetType: 'CONTENT_BRIEF',
            targetId: brief.id,
            metadata: { title, requiresApproval }
        });

        return NextResponse.json(brief);
    } catch (error) {
        console.error("[BRIEF_CREATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
