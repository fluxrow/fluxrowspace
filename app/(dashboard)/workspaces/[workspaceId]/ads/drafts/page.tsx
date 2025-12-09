"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { AdDraftCard } from "@/components/ads";

export default function AdDraftsPage({ params }: { params: { workspaceId: string } }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Ad Drafts</h1>
                    <p className="text-muted-foreground">
                        Manage your Meta Ads drafts and prepare them for publishing.
                    </p>
                </div>
                <Button asChild>
                    <Link href={`/workspaces/${params.workspaceId}/ads/drafts/new`}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Draft
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder for empty state or list */}
                <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                    No drafts found. Create your first ad draft to get started.
                </div>
            </div>
        </div>
    );
}
