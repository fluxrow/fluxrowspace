import { z } from "zod";

// Item da lista de briefs para revisão
export interface ClientReviewBriefItem {
    id: string;
    title: string;
    status: string;
    approvalStatus: string;
    createdAt: string;
}

// Mídias do brief
export interface ClientReviewMedia {
    id: string;
    type: string;
    url: string;
}

// Texto gerado por IA
export interface ClientReviewAIText {
    main_caption: string | null;
}

// Histórico de ações de revisão
export interface ClientReviewHistoryItem {
    id: string;
    action: "APPROVED" | "REJECTED";
    comment: string | null;
    createdAt: string;
}

// Detalhe completo do brief para Client Review
export interface ClientReviewBriefDetail {
    id: string;
    title: string;
    objective: string | null;
    approvalStatus: string;
    media: ClientReviewMedia[];
    ai: ClientReviewAIText | null;
    history: ClientReviewHistoryItem[];
}

// ---- SCHEMAS DE DTO PARA APPROVE/REJECT ----

export const ApproveBriefSchema = z.object({
    workspaceId: z.string(),
    briefId: z.string(),
});

export type ApproveBriefDTO = z.infer<typeof ApproveBriefSchema>;

export const RejectBriefSchema = z.object({
    workspaceId: z.string(),
    briefId: z.string(),
    comment: z.string().min(1, "Comment is required"),
});

export type RejectBriefDTO = z.infer<typeof RejectBriefSchema>;
