import {
    CampaignItem,
    CampaignDetail,
    CampaignCreative,
} from "@/types/campaign";

// Mapper para lista de campanhas
export function mapCampaignListItem(c: any): CampaignItem {
    return {
        id: c.id,
        name: c.name,
        objective: c.objective,
        // budget: c.budget, // Removed: Not in CampaignItem interface
        status: c.status,
        createdAt: c.createdAt?.toISOString ? c.createdAt.toISOString() : (c.created_at?.toISOString ? c.created_at.toISOString() : String(c.created_at || "")),
    };
}

// Mapper de criativos
export function mapCampaignCreative(media: any): CampaignCreative {
    if (!media) return { id: "", mediaId: "", url: "", type: "" };

    return {
        id: media.id,
        mediaId: media.mediaAssetId || media.mediaId || "", // Added to satisfy interface
        url: media.url || media.mediaAsset?.url || "", // Handle nested mediaAsset if necessary
        type: media.type || media.mediaAsset?.type || "IMAGE",
    };
}

// Mapper de campanha completa
export function mapCampaignDetail(c: any): CampaignDetail {
    return {
        id: c.id,
        name: c.name,
        objective: c.objective,
        budget: c.budget,
        status: c.status,
        createdAt: c.createdAt?.toISOString ? c.createdAt.toISOString() : (c.created_at?.toISOString ? c.created_at.toISOString() : String(c.created_at || "")),
        creatives: c.creatives?.map(mapCampaignCreative) || [],
        scheduleDate: c.startDate?.toISOString ? c.startDate.toISOString() : (c.startDate || null), // Added to satisfy interface
        approvalStatus: "none", // Added to satisfy interface
    };
}
