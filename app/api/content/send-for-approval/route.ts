import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
    try {
        const { briefId } = await req.json();

        if (!briefId) {
            return new NextResponse("Missing briefId", { status: 400 });
        }

        // Gerar token único de aprovação
        const token = uuid();

        const updated = await db.contentBrief.update({
            where: { id: briefId },
            data: {
                approvalStatus: "pending",
                status: "READY_FOR_APPROVAL",
                approvalToken: token,
            },
        });

        return NextResponse.json({
            status: "OK",
            approvalUrl: `/client-review/share/${token}`,
        });

    } catch (error) {
        console.error("[SEND_FOR_APPROVAL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
