import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mapBriefDetail } from "@/lib/client-review-mappers";

export async function GET(
    req: Request,
    { params }: { params: { workspaceId: string; briefId: string } }
) {
    try {
        const { workspaceId, briefId } = params;

        if (!workspaceId || !briefId) {
            return new NextResponse("Workspace ID and Brief ID required", {
                status: 400,
            });
        }

        const brief = await db.contentBrief.findFirst({
            where: {
                id: briefId,
                project: {
                    workspace_id: workspaceId,
                },
            },
            include: {
                media_assets: true,
                ai_generated: true,
                history: {
                    where: {
                        workspaceId,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

        if (!brief) {
            return new NextResponse("Brief not found", { status: 404 });
        }

        const mapped = mapBriefDetail(brief);

        return NextResponse.json(mapped);
    } catch (error) {
        console.error("[CLIENT_REVIEW_DETAIL_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
