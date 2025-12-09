import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { workspaceId, apiKey } = await req.json();

        if (!workspaceId || !apiKey) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Upsert credential
        // Note: In a real app, we'd check if one exists first or use upsert if ID is known
        // Here we'll just create a new one for simplicity or find first

        const existing = await db.integrationCredential.findFirst({
            where: { workspace_id: workspaceId, type: 'OPENAI' }
        });

        if (existing) {
            await db.integrationCredential.update({
                where: { id: existing.id },
                data: { data_encrypted: { apiKey } }
            });
        } else {
            await db.integrationCredential.create({
                data: {
                    workspace_id: workspaceId,
                    type: 'OPENAI',
                    data_encrypted: { apiKey }
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[OPENAI_SAVE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
