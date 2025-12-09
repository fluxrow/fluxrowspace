import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(
    req: Request,
    { params }: { params: { workspaceId: string } }
) {
    try {
        const { workspaceId } = params;

        if (!workspaceId) {
            return new NextResponse("Workspace ID is required", { status: 400 });
        }

        // Fetch ad campaign drafts for projects in the workspace
        // Since AdCampaignDraft is linked to Project, we first need to find projects in this workspace
        // Or we can query AdCampaignDraft where project.workspaceId = workspaceId

        const drafts = await db.adCampaignDraft.findMany({
            where: {
                project: {
                    workspace_id: workspaceId,
                },
            },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                brief: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                _count: {
                    select: {
                        adCreatives: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(drafts);
    } catch (error) {
        console.error("[AD_CAMPAIGN_DRAFTS_LIST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
