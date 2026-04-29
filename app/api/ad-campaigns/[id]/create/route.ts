import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { workspaceId: string } }) {
    try {
        const { id } = params;

        const body = await req.json();
        // FUTURE: validar body com Zod
        // FUTURE: criar campanha no banco

        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error("[AD_CAMPAIGNS_CREATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
