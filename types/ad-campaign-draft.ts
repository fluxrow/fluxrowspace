import { z } from "zod";

// --- Enums ---

export const AdCampaignObjective = {
    AWARENESS: "AWARENESS",
    TRAFFIC: "TRAFFIC",
    ENGAGEMENT: "ENGAGEMENT",
    LEADS: "LEADS",
} as const;

export type AdCampaignObjectiveType = (typeof AdCampaignObjective)[keyof typeof AdCampaignObjective];

export const AdCampaignStatus = {
    DRAFT: "DRAFT",
    READY_FOR_REVIEW: "READY_FOR_REVIEW",
    READY_TO_SYNC: "READY_TO_SYNC",
    SYNCED: "SYNCED",
} as const;

export type AdCampaignStatusType = (typeof AdCampaignStatus)[keyof typeof AdCampaignStatus];

export const AdCreativePlacement = {
    FEED: "FEED",
    STORIES: "STORIES",
    REELS: "REELS",
} as const;

export type AdCreativePlacementType = (typeof AdCreativePlacement)[keyof typeof AdCreativePlacement];

// --- Zod Schemas ---

export const AdCreativeDraftSchema = z.object({
    id: z.string().optional(),
    campaignId: z.string().min(1, "Campaign ID is required"),
    mediaAssetId: z.string().optional().nullable(),
    aiTextId: z.string().optional().nullable(),
    placement: z.nativeEnum(AdCreativePlacement).optional().nullable(),
    primaryText: z.string().optional().nullable(),
    headline: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    callToAction: z.string().optional().nullable(),
    metaAdId: z.string().optional().nullable(),
});

export const AdCampaignDraftSchema = z.object({
    id: z.string().optional(),
    projectId: z.string().min(1, "Project ID is required"),
    briefId: z.string().optional().nullable(),
    name: z.string().min(1, "Name is required"),
    objective: z.nativeEnum(AdCampaignObjective).optional().nullable(),
    status: z.nativeEnum(AdCampaignStatus).default(AdCampaignStatus.DRAFT),
    dailyBudget: z.number().min(0).optional().nullable(),
    totalBudget: z.number().min(0).optional().nullable(),
    currency: z.string().default("BRL").optional().nullable(),
    startDate: z.string().datetime({ offset: true }).optional().nullable().or(z.date()),
    endDate: z.string().datetime({ offset: true }).optional().nullable().or(z.date()),
    metaCampaignId: z.string().optional().nullable(),
    adCreatives: z.array(AdCreativeDraftSchema).optional(),
});

// --- TypeScript Interfaces ---

export type AdCreativeDraft = z.infer<typeof AdCreativeDraftSchema>;
export type AdCampaignDraft = z.infer<typeof AdCampaignDraftSchema>;
