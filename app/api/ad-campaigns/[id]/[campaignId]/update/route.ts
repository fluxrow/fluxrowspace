import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { workspaceId: string; campaignId: string } }) {
    try {
        const { workspaceId, campaignId } = params;

        const body = await req.json();
        // FUTURE: validar body
        // FUTURE: atualizar campanha

        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error("[AD_CAMPAIGNS_UPDATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
