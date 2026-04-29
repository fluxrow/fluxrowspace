import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { workspaceId: string; briefId: string } }
) {
    try {
        const { comment } = await req.json();

        await db.clientReviewHistory.create({
            data: {
                id: params.id,
                briefId: params.briefId,
                action: "comment",
                comment,
            },
        });

        return NextResponse.json({ status: "COMMENT_ADDED" });

    } catch (error) {
        console.error("[CLIENT_REVIEW_COMMENT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
