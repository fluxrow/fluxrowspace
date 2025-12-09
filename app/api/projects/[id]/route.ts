import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const project = await db.project.findUnique({
            where: { id: params.id },
        });

        if (!project) {
            return new NextResponse("Project not found", { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error("[PROJECT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

import { logActivity } from '@/lib/activity';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { mainColor, secondaryColor, fonts, logoUrl, defaultRequiresApproval } = body;

        const project = await db.project.update({
            where: { id: params.id },
            data: {
                mainColor,
                secondaryColor,
                fonts,
                logoUrl,
                defaultRequiresApproval
            },
        });

        await logActivity({
            workspaceId: project.workspace_id,
            userId: 'user_123', // Mock user
            action: 'UPDATE_PROJECT',
            targetType: 'PROJECT',
            targetId: project.id,
            metadata: { updates: Object.keys(body) }
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error("[PROJECT_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
