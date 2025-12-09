import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mapBriefListItem } from "@/lib/client-review-mappers";

export async function GET(
    req: Request,
    { params }: { params: { workspaceId: string } }
) {
    try {
        const { workspaceId } = params;

        const briefs = await db.contentBrief.findMany({
            where: {
                project: {
                    workspace_id: workspaceId
                }
            },
            orderBy: { created_at: "desc" }
        });

        const mapped = briefs.map(mapBriefListItem);

        return NextResponse.json(mapped);
    } catch (err) {
        console.error("CLIENT REVIEW LIST ERROR", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
