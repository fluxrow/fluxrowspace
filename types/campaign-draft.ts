import { z } from "zod";

export const CampaignObjectiveEnum = z.enum([
    "AWARENESS",
    "TRAFFIC",
    "ENGAGEMENT",
    "LEADS",
]);

export const CampaignStatusEnum = z.enum([
    "DRAFT",
    "READY",
    "SYNCED",
    "ERROR",
]);

export const CampaignTargetingSchema = z.object({
    ageMin: z.number().int().min(13).max(65).optional(),
    ageMax: z.number().int().min(13).max(65).optional(),
    genders: z.array(z.enum(["male", "female", "all"])).optional(), // simplificado
    locations: z
        .array(
            z.object({
                country: z.string().optional(),
                region: z.string().optional(),
                city: z.string().optional(),
            })
        )
        .optional(),
    interests: z.array(z.string()).optional(),
});

export type CampaignTargeting = z.infer<typeof CampaignTargetingSchema>;

export const CampaignDraftBaseSchema = z.object({
    id: z.string().uuid(),
    workspaceId: z.string().uuid(),
    projectId: z.string().uuid(),
    briefId: z.string().uuid().optional(),
    name: z.string(),
    objective: CampaignObjectiveEnum,
    status: CampaignStatusEnum,
    dailyBudget: z.number().int().nonnegative().optional(),
    totalBudget: z.number().int().nonnegative().optional(),
    currency: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    targeting: CampaignTargetingSchema.optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export type CampaignDraftDTO = z.infer<typeof CampaignDraftBaseSchema>;

// Schema para criação/edição (sem campos controlados pelo sistema)
export const CampaignDraftUpsertSchema = z.object({
    name: z.string().min(3),
    objective: CampaignObjectiveEnum,
    dailyBudget: z.number().int().nonnegative().optional(),
    totalBudget: z.number().int().nonnegative().optional(),
    currency: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    targeting: CampaignTargetingSchema.optional(),
});

export type CampaignDraftUpsertDTO = z.infer<typeof CampaignDraftUpsertSchema>;
