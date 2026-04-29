import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkLimit } from "@/lib/subscription";

export async function GET(req: Request, { params }: { params: { workspaceId: string } }) {
    try {
        const members = await db.workspaceMember.findMany({
            where: { workspace_id: params.id },
            include: { user: true }
        });
        return NextResponse.json(members);
    } catch (error) {
        console.error("[TEAM_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { workspaceId: string } }) {
    try {
        const { email, role } = await req.json();

        if (!email) {
            return new NextResponse("Email required", { status: 400 });
        }

        // Check team size limit
        const currentCount = await db.workspaceMember.count({ where: { workspace_id: params.id } });
        const canAdd = await checkLimit(params.id, 'teamMembers', currentCount);

        if (!canAdd) {
            return new NextResponse("Team member limit reached. Upgrade to Agency.", { status: 403 });
        }

        // Mock invite flow: create a dummy user if not exists and add to workspace
        // In real app, send email invite
        let user = await db.user.findUnique({ where: { email } });
        if (!user) {
            user = await db.user.create({
                data: {
                    email,
                    name: email.split('@')[0],
                    password_hash: "mock_hash"
                }
            });
        }

        const member = await db.workspaceMember.create({
            data: {
                workspace_id: params.id,
                user_id: user.id,
                role: role || 'member'
            },
            include: { user: true }
        });

        return NextResponse.json(member);
    } catch (error) {
        console.error("[TEAM_INVITE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
