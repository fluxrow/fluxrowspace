import { NextResponse } from "next/server";
import { AdsDraftService } from "@/lib/services/ads-draft-service";

export async function POST(req: Request, { params }: { params: { projectId: string } }) {
    try {
        const projectId = params.projectId;
        if (!projectId) return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

        const body = await req.json();

        const draft = await AdsDraftService.create({
            projectId,
            title: body.name,
            objective: body.objective,
            budgetDaily: body.budgetDaily ?? null,
            budgetLifetime: body.budgetLifetime ?? null,
            audienceJson: body.audience ?? null,
            creativeJson: body.creativeId ? { mediaId: body.creativeId } : null,
            status: "DRAFT"
        });

        return NextResponse.json(draft);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to create draft" }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { projectId: string } }) {
    try {
        const drafts = await AdsDraftService.listByProject(params.projectId);
        return NextResponse.json(drafts);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to list drafts" }, { status: 500 });
    }
}
