import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { workspaceId } = await req.json();

        const credential = await db.integrationCredential.findFirst({
            where: { workspace_id: workspaceId, type: 'OPENAI' }
        });

        if (!credential) {
            return new NextResponse("No credentials found", { status: 404 });
        }

        // Mock test call
        // const apiKey = (credential.data_encrypted as any).apiKey;
        // await openai.listModels();

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("[OPENAI_TEST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
