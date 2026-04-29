import { NextResponse } from "next/server";
import { getWorkspacePlan, getWorkspaceSubscription } from "@/lib/subscription";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const plan = await getWorkspacePlan(params.id);
        const subscription = await getWorkspaceSubscription(params.id);

        return NextResponse.json({
            plan,
            subscription
        });
    } catch (error) {
        console.error("[SUBSCRIPTION_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
