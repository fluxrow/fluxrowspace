import { z } from "zod";

// ================= INTERFACES =================

export interface AdAudienceConfig {
    locations: string[];
    ageRange: { min: number; max: number };
    genders: ("MALE" | "FEMALE" | "ALL")[];
    interests: string[];
    languages: string[];
}

export interface AdBudgetConfig {
    currency: string;
    value: number; // em centavos
    type: "DAILY" | "LIFETIME";
}

export interface AdPlacementConfig {
    platforms: ("FACEBOOK" | "INSTAGRAM" | "MESSENGER" | "AUDIENCE_NETWORK")[];
    positions: ("FEED" | "STORY" | "REELS" | "SEARCH" | "MESSAGES")[];
}

export interface AdCreativeConfig {
    mediaId?: string;
    imageUrl?: string;
    videoUrl?: string;
    primaryText?: string;
    headline?: string;
    description?: string;
    callToAction?: string; // 'LEARN_MORE', 'SHOP_NOW', etc.
}

export interface AdCampaignItem {
    id: string;
    workspaceId: string;
    name: string;
    objective: "AWARENESS" | "TRAFFIC" | "ENGAGEMENT" | "LEADS" | "SALES";
    status: "DRAFT" | "READY" | "PUBLISHING" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ERROR";
    budget: AdBudgetConfig;
    createdAt: string;
    updatedAt: string;
}

export interface AdCampaignDetail extends AdCampaignItem {
    audience: AdAudienceConfig;
    placements: AdPlacementConfig;
    creative: AdCreativeConfig;
    metaCampaignId?: string;
    metaAdSetId?: string;
    metaAdId?: string;
    errorMessage?: string;
}

// ================= ZOD SCHEMAS =================

const AudienceSchema = z.object({
    locations: z.array(z.string()).default([]),
    ageRange: z.object({
        min: z.number().min(13).max(65),
        max: z.number().min(13).max(65),
    }),
    genders: z.array(z.enum(["MALE", "FEMALE", "ALL"])).default(["ALL"]),
    interests: z.array(z.string()).default([]),
    languages: z.array(z.string()).default([]),
});

const BudgetSchema = z.object({
    currency: z.string().default("BRL"),
    value: z.number().min(100), // mínimo 1 real (100 centavos)
    type: z.enum(["DAILY", "LIFETIME"]),
});

const PlacementSchema = z.object({
    platforms: z.array(z.enum(["FACEBOOK", "INSTAGRAM", "MESSENGER", "AUDIENCE_NETWORK"])).min(1),
    positions: z.array(z.enum(["FEED", "STORY", "REELS", "SEARCH", "MESSAGES"])).min(1),
});

const CreativeSchema = z.object({
    mediaId: z.string().optional(),
    imageUrl: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
    primaryText: z.string().optional(),
    headline: z.string().optional(),
    description: z.string().optional(),
    callToAction: z.string().optional(),
});

export const CreateCampaignSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    objective: z.enum(["AWARENESS", "TRAFFIC", "ENGAGEMENT", "LEADS", "SALES"]),
    budget: BudgetSchema,
    audience: AudienceSchema,
    placements: PlacementSchema,
    creative: CreativeSchema.optional(),
});

export const UpdateCampaignSchema = CreateCampaignSchema.partial().extend({
    status: z.enum(["DRAFT", "READY", "PUBLISHING", "ACTIVE", "PAUSED", "COMPLETED", "ERROR"]).optional(),
});

// ================= DTOs =================

export type CreateCampaignDTO = z.infer<typeof CreateCampaignSchema>;
export type UpdateCampaignDTO = z.infer<typeof UpdateCampaignSchema>;
