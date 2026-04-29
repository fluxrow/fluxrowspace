import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const drafts = await db.adsDraft.findMany({
            where: { id: params.id },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(drafts);
    } catch (e) {
        console.error("[META_DRAFT_LIST]", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
