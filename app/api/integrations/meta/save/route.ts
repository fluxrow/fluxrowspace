import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { workspaceId, accessToken, defaultPageId } = await req.json();

        if (!workspaceId || !accessToken) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const existing = await db.integrationCredential.findFirst({
            where: { workspace_id: workspaceId, type: 'META' }
        });

        if (existing) {
            await db.integrationCredential.update({
                where: { id: existing.id },
                data: { data_encrypted: { accessToken, defaultPageId } }
            });
        } else {
            await db.integrationCredential.create({
                data: {
                    workspace_id: workspaceId,
                    type: 'META',
                    data_encrypted: { accessToken, defaultPageId }
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[META_SAVE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
