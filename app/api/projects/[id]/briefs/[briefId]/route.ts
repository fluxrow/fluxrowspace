import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string, briefId: string } }) {
    try {
        const brief = await db.contentBrief.findUnique({
            where: { id: params.briefId },
            include: {
                project: true,
                scheduled_posts: true
            }
        });

        if (!brief) {
            return new NextResponse("Brief not found", { status: 404 });
        }

        return NextResponse.json(brief);
    } catch (error) {
        console.error("[BRIEF_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
