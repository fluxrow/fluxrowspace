import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        const credential = await db.integrationCredential.findFirst({
            where: { workspace_id: workspaceId, type: 'META' }
        });

        if (!credential) {
            return new NextResponse("No credentials found", { status: 404 });
        }

        // Mock test call

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("[META_TEST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
