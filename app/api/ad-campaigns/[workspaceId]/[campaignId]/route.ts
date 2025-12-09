import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { workspaceId: string; campaignId: string } }) {
    try {
        const { workspaceId, campaignId } = params;

        // FUTURE: buscar campanha específica
        return NextResponse.json({});
    } catch (error) {
        console.error("[AD_CAMPAIGNS_DETAIL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
