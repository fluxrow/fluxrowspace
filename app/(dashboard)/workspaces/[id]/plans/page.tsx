"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Check, X } from "lucide-react";

const PLANS = [
    {
        id: 'FREE',
        name: 'Free',
        price: '$0',
        features: [
            '1 Project',
            '5 Posts/month',
            'Basic AI Generation (5/mo)',
        ],
        missing: [
            'Canva Integration',
            'Meta Scheduling',
            'Brand Templates',
            'Content Presets',
            'Team Members'
        ]
    },
    {
        id: 'PRO',
        name: 'Pro',
        price: '$29/mo',
        popular: true,
        features: [
            'Unlimited Projects',
            '200 Posts/month',
            'Unlimited AI Generation',
            'Canva Integration',
            'Meta Scheduling',
            'Brand Templates',
            'Content Presets',
            'Up to 3 Team Members'
        ],
        missing: []
    },
    {
        id: 'AGENCY',
        name: 'Agency',
        price: '$99/mo',
        features: [
            'Everything in Pro',
            'Unlimited Team Members',
            'Priority Support',
            'Custom Branding',
            'API Access'
        ],
        missing: []
    }
];

export default function PlansPage({ params }: { params: { workspaceId: string } }) {
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (planId: string) => {
        setLoading(planId);
        try {
            const response = await fetch('/api/billing/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: params.id,
                    planId,
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Subscription error:", error);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="space-y-8 p-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">Upgrade your Workspace</h2>
                <p className="text-muted-foreground mt-2">Choose the plan that fits your needs.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {PLANS.map((plan) => (
                    <Card key={plan.id} className={`relative flex flex-col ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Most Popular
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="flex items-baseline justify-between">
                                <span>{plan.name}</span>
                                <span className="text-2xl font-bold">{plan.price}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <ul className="space-y-3 flex-1 mb-6">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                                {plan.missing.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <X className="h-4 w-4" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className="w-full"
                                variant={plan.popular ? "default" : "outline"}
                                disabled={loading === plan.id}
                                onClick={() => handleSubscribe(plan.id)}
                            >
                                {loading === plan.id ? "Processing..." : (plan.id === 'FREE' ? 'Current Plan' : `Upgrade to ${plan.name}`)}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
