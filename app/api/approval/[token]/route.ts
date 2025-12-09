import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { token: string } }) {
    try {
        const brief = await db.contentBrief.findFirst({
            where: { approvalToken: params.token },
            include: {
                project: {
                    select: {
                        name: true,
                        logoUrl: true,
                        mainColor: true
                    }
                },
                ai_generated: true,
                media_assets: true
            }
        });

        if (!brief) {
            return new NextResponse("Invalid token", { status: 404 });
        }

        return NextResponse.json(brief);
    } catch (error) {
        console.error("[APPROVAL_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
