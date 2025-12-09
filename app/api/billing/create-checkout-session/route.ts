import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { workspaceId, planId } = await req.json();

        if (!workspaceId || !planId) {
            return new NextResponse("Missing workspaceId or planId", { status: 400 });
        }

        // In a real app, you would fetch the priceId based on the planId
        const priceId = planId === 'PRO' ? 'price_pro_123' : 'price_agency_123';

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                workspaceId,
                planId,
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/workspaces/${workspaceId}/plans?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/workspaces/${workspaceId}/plans?canceled=true`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("[STRIPE_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
