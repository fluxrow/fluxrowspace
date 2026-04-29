import { NextResponse } from "next/server";
import { AdsDraftService } from "@/lib/services/ads-draft-service";

export async function GET(req: Request, { params }: { params: { draftId: string } }) {
    try {
        const draft = await AdsDraftService.getById(params.draftId);
        if (!draft) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(draft);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to fetch draft" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { draftId: string } }) {
    try {
        const body = await req.json();

        const updated = await AdsDraftService.update(params.draftId, {
            title: body.name,
            objective: body.objective,
            budgetDaily: body.budgetDaily ?? null,
            budgetLifetime: body.budgetLifetime ?? null,
            audienceJson: body.audience ?? null,
            creativeJson: body.creativeId ? { mediaId: body.creativeId } : undefined
        });

        return NextResponse.json(updated);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to update draft" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { draftId: string } }) {
    try {
        await AdsDraftService.delete(params.draftId);
        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to delete draft" }, { status: 500 });
    }
}
