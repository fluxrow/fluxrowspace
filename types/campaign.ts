import { z } from "zod";

// MODELOS DE LEITURA
export interface CampaignItem {
    id: string;
    name: string;
    objective: string | null;
    status: string;
    createdAt: string;
}

export interface CampaignDetail {
    id: string;
    name: string;
    objective: string | null;
    status: string;
    budget: number | null;
    scheduleDate: string | null;
    creatives: CampaignCreative[];
    approvalStatus: string;
    createdAt: string;
}

export interface CampaignCreative {
    id: string;
    mediaId: string;
    url: string;
    type: string; // IMAGE | VIDEO
}

// SCHEMAS PARA CRIAÇÃO E UPDATE
export const CreateCampaignSchema = z.object({
    name: z.string().min(3),
    objective: z.string().nullable(),
    budget: z.number().nullable(),
    scheduleDate: z.string().nullable(),
});

export type CreateCampaignDTO = z.infer<typeof CreateCampaignSchema>;

export const UpdateCampaignSchema = z.object({
    name: z.string().min(3).optional(),
    objective: z.string().optional(),
    budget: z.number().optional(),
    scheduleDate: z.string().optional(),
    status: z.string().optional(),
});

export type UpdateCampaignDTO = z.infer<typeof UpdateCampaignSchema>;

export const AddCreativeSchema = z.object({
    mediaId: z.string(),
});

export type AddCreativeDTO = z.infer<typeof AddCreativeSchema>;
