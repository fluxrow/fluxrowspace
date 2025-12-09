import { z } from "zod";

export type MetaAdObjective =
    | "AWARENESS"
    | "TRAFFIC"
    | "ENGAGEMENT"
    | "LEADS"
    | "SALES";

export interface MetaAdDraftItem {
    id: string;
    workspaceId: string;
    name: string;
    objective: MetaAdObjective;
    status: "DRAFT" | "READY" | "SENT" | "APPROVED" | "REJECTED";
    createdAt: string;
    updatedAt: string;
}

export interface MetaAdDraftDetail extends MetaAdDraftItem {
    budget: number | null;
    startDate: string | null;
    endDate: string | null;
    copy: string | null;
    creativeId: string | null;
    audience: {
        locations: string[];
        minAge: number | null;
        maxAge: number | null;
        interests: string[];
    } | null;
}

export const CreateDraftSchema = z.object({
    name: z.string().min(3),
    objective: z.enum([
        "AWARENESS",
        "TRAFFIC",
        "ENGAGEMENT",
        "LEADS",
        "SALES"
    ]),
});

export const UpdateDraftSchema = z.object({
    name: z.string().optional(),
    objective: z.enum([
        "AWARENESS",
        "TRAFFIC",
        "ENGAGEMENT",
        "LEADS",
        "SALES"
    ]).optional(),
    budget: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    copy: z.string().optional(),
    creativeId: z.string().optional(),
    audience: z.object({
        locations: z.array(z.string()).optional(),
        minAge: z.number().nullable().optional(),
        maxAge: z.number().nullable().optional(),
        interests: z.array(z.string()).optional(),
    }).optional(),
});
