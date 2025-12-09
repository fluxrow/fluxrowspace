import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdCampaignDraftForm } from "@/components/ads/AdCampaignDraftForm";
import { AdCreativeDraftForm } from "@/components/ads/AdCreativeDraftForm";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdDetailPageProps {
    params: {
        workspaceId: string;
        adId: string;
    };
}

export default async function AdDetailPage({ params }: AdDetailPageProps) {
    const draft = await db.adCampaignDraft.findUnique({
        where: {
            id: params.adId,
        },
        include: {
            adCreatives: {
                include: {
                    mediaAsset: true,
                },
            },
        },
    });

    if (!draft) {
        notFound();
    }

    const projects = await db.project.findMany({
        where: {
            workspace_id: params.workspaceId,
        },
        select: {
            id: true,
            name: true,
        },
    });

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Edit Campaign</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AdCampaignDraftForm
                                workspaceId={params.workspaceId}
                                projects={projects}
                                initialData={draft}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ad Creatives</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* List of existing creatives would go here */}
                            <div className="space-y-4 mb-6">
                                {draft.adCreatives.map((creative) => (
                                    <div key={creative.id} className="border p-4 rounded-md">
                                        <div className="font-medium">{creative.headline || "Untitled Creative"}</div>
                                        <div className="text-sm text-muted-foreground">{creative.placement}</div>
                                    </div>
                                ))}
                                {draft.adCreatives.length === 0 && (
                                    <div className="text-sm text-muted-foreground">No creatives added yet.</div>
                                )}
                            </div>

                            <Separator className="my-4" />

                            <h3 className="text-lg font-medium mb-4">Add New Creative</h3>
                            <AdCreativeDraftForm
                                workspaceId={params.workspaceId}
                                draftId={params.adId}
                                onSuccess={async () => {
                                    "use server";
                                    // In a real app we'd revalidate path, but for now client router refresh handles it
                                }}
                                onCancel={() => { }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
