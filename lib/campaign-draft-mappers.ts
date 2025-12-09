import { CampaignDraft, MediaAsset } from "@prisma/client";

export interface CampaignDraftListItem {
    id: string;
    name: string;
    objective: string | null;
    status: string;
    createdAt: Date;
}

export interface CampaignDraftDetail {
    id: string;
    name: string;
    description: string | null;
    objective: string | null;
    budget: number | null;
    audience: any | null;
    placements: any | null;
    status: string;
    creativeAssets: { id: string; url: string; type: string }[];
    createdAt: Date;
    updatedAt: Date;
}

// Mapper para lista
export function mapCampaignDraftListItem(d: any): CampaignDraftListItem {
    return {
        id: d.id,
        name: d.name,
        objective: d.objective,
        status: d.status,
        createdAt: d.created_at,
    };
}

// Mapper para os media assets
export function mapMediaAssets(media: MediaAsset[]) {
    return media.map((m) => ({
        id: m.id,
        url: m.url,
        type: m.type,
    }));
}

// Mapper para detalhe completo
export function mapCampaignDraftDetail(d: any): CampaignDraftDetail {
    return {
        id: d.id,
        name: d.name,
        description: d.description,
        objective: d.objective,
        budget: d.budget,
        audience: d.audience,
        placements: d.placements,
        status: d.status,
        creativeAssets: mapMediaAssets(d.media_assets || []),
        createdAt: d.created_at,
        updatedAt: d.updated_at,
    };
}
