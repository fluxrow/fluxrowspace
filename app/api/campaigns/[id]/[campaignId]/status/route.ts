import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { workspaceId: string, campaignId: string } }) {
    try {
        // FUTURE: update status
        return NextResponse.json({ status: "OK" });
    } catch (error) {
        console.error("CAMPAIGNS_STATUS_ERROR:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
