import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mapHistoryItems } from "@/lib/client-review-mappers"; // será criado na parte C

export async function GET(
    req: Request,
    { params }: { params: { workspaceId: string; briefId: string } }
) {
    try {
        const { workspaceId, briefId } = params;

        // Buscar logs reais do banco
        const logs = await db.activityLog.findMany({
            where: {
                workspaceId,
                targetId: briefId,
                targetType: "CONTENT_BRIEF",
            },
            orderBy: { createdAt: "asc" }
        });

        return NextResponse.json({
            history: mapHistoryItems(logs),
        });
    } catch (error) {
        console.error("HISTORY_ERROR", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
