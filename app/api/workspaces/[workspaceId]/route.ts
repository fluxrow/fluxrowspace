import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { workspaceId: string } }) {
    try {
        const workspace = await db.workspace.findUnique({
            where: { id: params.workspaceId }
        });

        if (!workspace) {
            return new NextResponse("Workspace not found", { status: 404 });
        }

        return NextResponse.json(workspace);
    } catch (error) {
        console.error("[WORKSPACE_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { workspaceId: string } }) {
    try {
        const body = await req.json();
        const { comEnabled, comUrl, comApiKey, onboardingCompleted } = body;

        const workspace = await db.workspace.update({
            where: { id: params.workspaceId },
            data: {
                comEnabled,
                comUrl,
                comApiKey,
                onboardingCompleted
            }
        });

        return NextResponse.json(workspace);
    } catch (error) {
        console.error("[WORKSPACE_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
