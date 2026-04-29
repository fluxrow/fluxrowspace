import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { workspaceId: string } }
) {
    try {
        const body = await req.json();

        const draft = await db.adsDraft.create({
            data: {
                id: params.id,
                title: body.name || "Novo anúncio",
                objective: body.objective || null,
                status: "DRAFT",
                creativeJson: (body.creativeId || body.caption) ? {
                    mediaId: body.creativeId,
                    description: body.caption
                } : undefined,
            }
        });

        return NextResponse.json(draft);
    } catch (e) {
        console.error("[META_DRAFT_CREATE]", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
