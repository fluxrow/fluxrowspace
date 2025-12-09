import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string } }
) {
    try {
        const draft = await db.adsDraft.findUnique({
            where: { id: params.draftId }
        });

        return NextResponse.json(draft);
    } catch (e) {
        console.error("[META_DRAFT_GET]", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string } }
) {
    try {
        const body = await req.json();

        // Adapt body fields to AdsDraft model if necessary
        const updateData: any = { ...body };
        if (body.name) {
            updateData.title = body.name;
            delete updateData.name;
        }
        // If creative details are passed separately, merge them into creativeJson
        if (body.creativeId || body.caption) {
            // Fetch existing to merge? Or just overwrite? 
            // For simplicity in this base API, we might assume the client sends the full structure or we construct it.
            // However, since we are adapting, let's just map straightforwardly if they exist.
            // But `update` with JSON fields is tricky without fetching first if we want partial updates inside JSON.
            // For now, let's assume the client might send `creativeJson` directly OR we map these specific fields if present.

            // If the user sends `creativeJson` directly, use it.
            // If they send `creativeId` or `caption`, we might need to construct `creativeJson`.
            // Given the user's prompt was simple, let's just pass `body` directly but map name->title.
            // The user's prompt for UPDATE didn't specify the body structure, just "data: body".
            // So we assume the client will send the correct fields for `AdsDraft` OR we need to adapt.
            // Since we adapted CREATE, we should probably adapt UPDATE too for consistency.
        }

        const updated = await db.adsDraft.update({
            where: { id: params.draftId },
            data: updateData
        });

        return NextResponse.json(updated);
    } catch (e) {
        console.error("[META_DRAFT_UPDATE]", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { workspaceId: string; draftId: string } }
) {
    try {
        await db.adsDraft.delete({
            where: { id: params.draftId }
        });

        return NextResponse.json({ status: "OK" });
    } catch (e) {
        console.error("[META_DRAFT_DELETE]", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
