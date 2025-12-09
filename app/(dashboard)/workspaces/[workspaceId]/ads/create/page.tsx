import { db } from "@/lib/db";
import { AdCampaignDraftForm } from "@/components/ads/AdCampaignDraftForm";

interface AdsCreatePageProps {
    params: {
        workspaceId: string;
    };
}

export default async function AdsCreatePage({ params }: AdsCreatePageProps) {
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
                <h2 className="text-3xl font-bold tracking-tight">Create Campaign</h2>
            </div>
            <div className="max-w-2xl">
                <AdCampaignDraftForm
                    workspaceId={params.workspaceId}
                    projects={projects}
                />
            </div>
        </div>
    );
}
