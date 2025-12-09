import { AdCampaignDraftList } from "@/components/ads/AdCampaignDraftList";

interface AdsPageProps {
    params: {
        workspaceId: string;
    };
}

export default function AdsPage({ params }: AdsPageProps) {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Ads Manager</h2>
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                <AdCampaignDraftList workspaceId={params.workspaceId} />
            </div>
        </div>
    );
}
