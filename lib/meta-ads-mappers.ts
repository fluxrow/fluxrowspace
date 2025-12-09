import {
    MetaAdDraftItem,
    MetaAdDraftDetail
} from "@/types/meta-ads";

// Mapper para lista
export function mapMetaAdDraftItem(draft: any): MetaAdDraftItem {
    return {
        id: draft.id,
        workspaceId: draft.workspaceId,
        name: draft.name,
        objective: draft.objective,
        status: draft.status,
        createdAt: draft.createdAt instanceof Date ? draft.createdAt.toISOString() : draft.createdAt,
        updatedAt: draft.updatedAt instanceof Date ? draft.updatedAt.toISOString() : draft.updatedAt
    };
}

// Mapper completo para detalhe
export function mapMetaAdDraftDetail(draft: any): MetaAdDraftDetail {
    return {
        ...mapMetaAdDraftItem(draft),
        budget: draft.dailyBudget ? draft.dailyBudget / 100 : null,
        startDate: draft.startDate instanceof Date ? draft.startDate.toISOString() : draft.startDate,
        endDate: draft.endDate instanceof Date ? draft.endDate.toISOString() : draft.endDate,
        copy: null, // Placeholder as it's not in the model yet
        creativeId: null, // Placeholder
        audience: draft.audience ? (typeof draft.audience === 'string' ? JSON.parse(draft.audience) : draft.audience) : null,
    };
}
