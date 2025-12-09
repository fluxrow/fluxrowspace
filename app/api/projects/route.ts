import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkLimit } from "@/lib/subscription";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const workspaceId = searchParams.get('workspaceId');

        if (!workspaceId) {
            return new NextResponse("Workspace ID required", { status: 400 });
        }

        const projects = await db.project.findMany({
            where: {
                workspace_id: workspaceId
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error("[PROJECTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            workspaceId,
            name,
            description,
            brandVoice,
            mainColor,
            secondaryColor,
            fonts
        } = body;

        if (!workspaceId) {
            return new NextResponse("Missing workspaceId", { status: 400 });
        }

        // Check subscription limits
        const canCreate = await checkLimit(workspaceId, 'projects', await db.project.count({ where: { workspace_id: workspaceId } }));

        if (!canCreate) {
            return new NextResponse("Project limit reached. Upgrade to Pro.", { status: 403 });
        }

        const project = await db.project.create({
            data: {
                workspace_id: workspaceId,
                name,
                description,
                brand_voice: brandVoice,
                mainColor,
                secondaryColor,
                fonts,
            }
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error("[PROJECTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
