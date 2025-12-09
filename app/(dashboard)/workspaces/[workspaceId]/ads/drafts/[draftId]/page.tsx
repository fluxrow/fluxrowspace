"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import {
    AdObjectiveSelect,
    AdBudgetInput,
    AdCreativePreview,
    AdCopyEditor,
} from "@/components/ads";

export default function AdDraftDetailPage({
    params,
}: {
    params: { workspaceId: string; draftId: string };
}) {
    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/workspaces/${params.workspaceId}/ads/drafts`}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Ad Draft</h1>
                        <p className="text-muted-foreground">
                            Configure your ad creative, budget, and targeting.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Discard</Button>
                    <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4 p-6 border rounded-lg bg-card">
                        <h2 className="text-lg font-semibold">Campaign Details</h2>
                        <div className="space-y-2">
                            <Label>Draft Name</Label>
                            <Input placeholder="e.g. Summer Sale Campaign" />
                        </div>
                        <AdObjectiveSelect />
                        <AdBudgetInput />
                    </div>

                    <div className="space-y-4 p-6 border rounded-lg bg-card">
                        <h2 className="text-lg font-semibold">Ad Creative</h2>
                        <AdCopyEditor />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 border rounded-lg bg-card space-y-4">
                        <h2 className="text-lg font-semibold">Preview</h2>
                        <AdCreativePreview />
                        <div className="text-xs text-muted-foreground text-center">
                            This is a rough preview. Actual rendering may vary on Meta platforms.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
