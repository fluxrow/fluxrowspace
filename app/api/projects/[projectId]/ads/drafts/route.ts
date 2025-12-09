import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AdDraftSchema } from "@/types/ad-drafts";

export async function GET(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const drafts = await db.adDraft.findMany({
            where: {
                projectId: params.projectId,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(drafts);
    } catch (err) {
        console.error("[AD_DRAFTS_GET]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const body = await req.json();
        const parsed = AdDraftSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.format() },
                { status: 400 }
            );
        }

        const draft = await db.adDraft.create({
            data: {
                projectId: params.projectId,
                ...parsed.data,
            },
        });

        return NextResponse.json(draft);
    } catch (err) {
        console.error("[AD_DRAFTS_POST]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
