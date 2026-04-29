import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const briefs = await db.contentBrief.findMany({
            where: {
                project: {
                    workspace_id: params.id
                }
            },
            include: {
                project: {
                    select: { name: true }
                },
                ai_generated: {
                    select: { main_caption: true }
                },
                media_assets: {
                    where: { type: 'IMAGE' },
                    take: 1,
                    select: { url: true }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        return NextResponse.json(briefs);
    } catch (error) {
        console.error("[WORKSPACE_CONTENT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
