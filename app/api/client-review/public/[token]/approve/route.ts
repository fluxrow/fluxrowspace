import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { token: string } }
) {
    try {
        const token = params.token;

        if (!token) {
            return new NextResponse("Token required", { status: 400 });
        }

        const brief = await db.contentBrief.findFirst({
            where: { approvalToken: token },
        });

        if (!brief) {
            return new NextResponse("Invalid token", { status: 404 });
        }

        await db.contentBrief.update({
            where: { id: brief.id },
            data: {
                approvalStatus: "approved",
                approvalComment: null,
            },
        });

        return NextResponse.json({ status: "approved" });
    } catch (err) {
        console.error("PUBLIC_APPROVE_ERROR", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
