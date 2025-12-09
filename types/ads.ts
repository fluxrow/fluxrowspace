import { z } from "zod";

export interface AdsDraft {
    id: string;
    workspaceId: string;
    title: string;
    objective: string; // TRAFFIC | ENGAGEMENT | LEADS
    status: string; // DRAFT | READY_FOR_REVIEW | APPROVED | REJECTED
    budget?: number;
    creativeId?: string; // MediaAsset
    caption?: string;
    createdAt: string;
    updatedAt: string;
}

export const CreateAdsDraftSchema = z.object({
    title: z.string(),
    objective: z.enum(["TRAFFIC", "ENGAGEMENT", "LEADS"]),
    budget: z.number().optional(),
    creativeId: z.string().optional(),
    caption: z.string().optional(),
});

export const UpdateAdsDraftSchema = z.object({
    title: z.string().optional(),
    objective: z.enum(["TRAFFIC", "ENGAGEMENT", "LEADS"]).optional(),
    budget: z.number().optional(),
    creativeId: z.string().optional(),
    caption: z.string().optional(),
    status: z.enum(["DRAFT", "READY_FOR_REVIEW", "APPROVED", "REJECTED"]).optional(),
});
