"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Plus, MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { AdCampaignDraft } from "@/types/ad-campaign-draft";

interface AdCampaignDraftListProps {
    workspaceId: string;
}

export function AdCampaignDraftList({ workspaceId }: AdCampaignDraftListProps) {
    const router = useRouter();
    const [drafts, setDrafts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDrafts();
    }, [workspaceId]);

    const fetchDrafts = async () => {
        try {
            const res = await fetch(`/api/ad-campaigns/${workspaceId}/list`);
            if (res.ok) {
                const data = await res.json();
                setDrafts(data);
            }
        } catch (error) {
            console.error("Failed to fetch drafts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (draftId: string) => {
        if (!confirm("Are you sure you want to delete this draft?")) return;

        try {
            const res = await fetch(`/api/ad-campaigns/${workspaceId}/${draftId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchDrafts();
            }
        } catch (error) {
            console.error("Failed to delete draft", error);
        }
    };

    if (loading) {
        return <div>Loading drafts...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Ad Campaigns</h2>
                <Button onClick={() => router.push(`/workspaces/${workspaceId}/ads/create`)}>
                    <Plus className="mr-2 h-4 w-4" /> New Campaign
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {drafts.map((draft) => (
                    <Card key={draft.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => router.push(`/workspaces/${workspaceId}/ads/${draft.id}`)}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-medium line-clamp-1">
                                    {draft.name}
                                </CardTitle>
                                <CardDescription className="line-clamp-1">
                                    {draft.project.name}
                                </CardDescription>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/workspaces/${workspaceId}/ads/${draft.id}`); }}>
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive" onClick={(e) => { e.stopPropagation(); handleDelete(draft.id); }}>
                                        <Trash className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Status</span>
                                    <Badge variant={draft.status === "DRAFT" ? "secondary" : "default"}>
                                        {draft.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Objective</span>
                                    <span>{draft.objective || "-"}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Creatives</span>
                                    <span>{draft._count?.adCreatives || 0}</span>
                                </div>
                                <div className="text-xs text-muted-foreground pt-2">
                                    Created {format(new Date(draft.createdAt), "MMM d, yyyy")}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {drafts.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No ad campaigns found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
