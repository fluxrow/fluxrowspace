import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event;

    try {
        // In a real app, use the actual webhook secret
        event = stripe.webhooks.constructEvent(
            JSON.parse(body), // Mock: passing parsed body as event
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || "whsec_mock"
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as any;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if (!session?.metadata?.workspaceId) {
            return new NextResponse("Webhook Error: No workspaceId in metadata", { status: 400 });
        }

        await db.workspaceSubscription.create({
            data: {
                workspaceId: session.metadata.workspaceId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                planId: session.metadata.planId,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                status: subscription.status,
            },
        });
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        await db.workspaceSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                status: "active", // Reactivate if it was past_due
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}
