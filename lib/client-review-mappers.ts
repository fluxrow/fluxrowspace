import {
    ClientReviewBriefItem,
    ClientReviewBriefDetail,
    ClientReviewMedia,
    ClientReviewAIText,
    ClientReviewHistoryItem,
} from "@/types/client-review";

// Mapper para lista de Briefs
export function mapBriefListItem(brief: any): ClientReviewBriefItem {
    return {
        id: brief.id,
        title: brief.title,
        status: brief.status,
        approvalStatus: brief.approvalStatus,
        createdAt: brief.created_at,
    };
}

// Mapper de media assets
export function mapMediaAssets(media: any[]): ClientReviewMedia[] {
    if (!media || media.length === 0) return [];
    return media.map((m) => ({
        id: m.id,
        type: m.type,
        url: m.url,
    }));
}

// Mapper de texto de IA
export function mapAIText(ai: any | null): ClientReviewAIText | null {
    if (!ai) return null;
    return {
        main_caption: ai.main_caption || null,
    };
}

// Mapper do histórico
export function mapHistoryItems(history: any[]): ClientReviewHistoryItem[] {
    if (!history || history.length === 0) return [];
    return history.map((h) => ({
        id: h.id,
        action: h.action,
        comment: h.comment ?? null,
        // Prisma expõe camelCase (createdAt) por causa do @map("created_at")
        createdAt: h.createdAt,
    }));
}

// Mapper do Brief completo
export function mapBriefDetail(brief: any): ClientReviewBriefDetail {
    return {
        id: brief.id,
        title: brief.title,
        objective: brief.objective ?? null,
        approvalStatus: brief.approvalStatus,
        media: mapMediaAssets(brief.media_assets || []),
        ai: mapAIText(brief.ai_generated || null),
        history: mapHistoryItems(brief.history || []),
    };
}
