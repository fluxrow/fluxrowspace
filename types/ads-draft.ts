import { z } from "zod";

/**
 * ====== AD DRAFT BASE TYPES ======
 */

export const AdsAudienceSchema = z.object({
    locations: z.array(z.string()).optional(),
    interests: z.array(z.string()).optional(),
    genders: z.array(z.string()).optional(),
    ageRange: z.tuple([z.number(), z.number()]).optional(),
});

export type AdsAudienceDTO = z.infer<typeof AdsAudienceSchema>;

export const AdsCreativeSchema = z.object({
    mediaId: z.string().optional(),
    headline: z.string().optional(),
    description: z.string().optional(),
    callToAction: z.string().optional(),
});

export type AdsCreativeDTO = z.infer<typeof AdsCreativeSchema>;

export const AdsScheduleSchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

export type AdsScheduleDTO = z.infer<typeof AdsScheduleSchema>;

/**
 * ====== MAIN CREATE/UPDATE SCHEMAS ======
 */
export const CreateAdsDraftSchema = z.object({
    workspaceId: z.string(),
    projectId: z.string().optional(),
    title: z.string(),
    objective: z.string(),
    budgetDaily: z.number().nullable().optional(),
    budgetLifetime: z.number().nullable().optional(),
    audience: AdsAudienceSchema.optional(),
    creative: AdsCreativeSchema.optional(),
    schedule: AdsScheduleSchema.optional(),
});

export type CreateAdsDraftDTO = z.infer<typeof CreateAdsDraftSchema>;

export const UpdateAdsDraftSchema = CreateAdsDraftSchema.extend({
    id: z.string(),
});

export type UpdateAdsDraftDTO = z.infer<typeof UpdateAdsDraftSchema>;
