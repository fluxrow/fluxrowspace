import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { workspaceId: string; campaignId: string } }) {
    try {
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
