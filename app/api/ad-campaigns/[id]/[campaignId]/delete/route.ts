import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { workspaceId: string; campaignId: string } }) {
    try {
        const { workspaceId, campaignId } = params;

        // FUTURE: deletar campanha
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error("[AD_CAMPAIGNS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
