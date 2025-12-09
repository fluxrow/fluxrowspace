import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    try {
        // Mock getting user ID from session
        // const userId = session.user.id;
        const userId = "mock-user-id";

        const workspaces = await db.workspace.findMany({
            where: {
                OR: [
                    { owner_id: userId },
                    { members: { some: { user_id: userId } } }
                ]
            },
            include: {
                projects: true
            }
        });

        return NextResponse.json(workspaces);
    } catch (error) {
        console.error("[WORKSPACES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name } = await req.json();
        const userId = "mock-user-id"; // Mock user

        if (!name) {
            return new NextResponse("Name required", { status: 400 });
        }

        const workspace = await db.workspace.create({
            data: {
                name,
                owner_id: userId,
                members: {
                    create: {
                        user_id: userId,
                        role: 'owner'
                    }
                }
            }
        });

        // Start 7-day trial
        await db.workspaceTrial.create({
            data: {
                workspaceId: workspace.id,
                trialStart: new Date(),
                trialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                isActive: true
            }
        });

        return NextResponse.json(workspace);
    } catch (error) {
        console.error("[WORKSPACES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
