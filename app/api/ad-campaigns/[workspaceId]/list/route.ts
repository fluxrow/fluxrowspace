import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { workspaceId: string } }) {
    try {
        const { workspaceId } = params;

        // FUTURE: buscar campanhas desse workspace
        return NextResponse.json([]);
    } catch (error) {
        console.error("[AD_CAMPAIGNS_LIST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
