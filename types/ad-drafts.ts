import { z } from "zod";

export const AdDraftSchema = z.object({
    objective: z.string(),
    headline: z.string().optional(),
    primaryText: z.string().optional(),
    callToAction: z.string().optional(),
    budgetDaily: z.number().nullable().optional(),
    audienceJson: z.any().optional(),
    creativeId: z.string().nullable().optional(),
    status: z.string().optional(),
});

export type AdDraftPayload = z.infer<typeof AdDraftSchema>;
