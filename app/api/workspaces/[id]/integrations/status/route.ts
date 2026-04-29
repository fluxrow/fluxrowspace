import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { workspaceId: string } }
) {
    try {
        if (!params.id) {
            return new NextResponse("Workspace ID required", { status: 400 });
        }

        const credentials = await db.integrationCredential.findMany({
            where: {
                workspace_id: params.id
            },
            select: {
                type: true
            }
        });

        const status = {
            openai: credentials.some(c => c.type === 'OPENAI'),
            canva: credentials.some(c => c.type === 'CANVA'),
            meta: credentials.some(c => c.type === 'META'),
            whatsapp: false // Not yet implemented in DB or always false for now
        };

        return NextResponse.json(status);

    } catch (error) {
        console.error("[INTEGRATIONS_STATUS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
