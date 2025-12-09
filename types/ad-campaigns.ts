import { z } from "zod";

// Tipos de campanha
export type CampaignType = "META" | "GOOGLE" | "TIKTOK";

// Objetivos de campanha (Meta simplificado)
export type CampaignObjective =
    | "AWARENESS"
    | "TRAFFIC"
    | "ENGAGEMENT"
    | "LEADS"
    | "SALES";

// Informações do criativo usado no anúncio
export interface CreativeInfo {
    mediaId: string; // id do MediaAsset
    mediaUrl: string;
    caption?: string; // texto de legenda
    cta?: string; // botão (ex: "Saiba mais")
}

// Público (versão simples — será expandido depois)
export interface AudienceDTO {
    ageMin?: number;
    ageMax?: number;
    genders?: string[]; // "male" | "female" | "all"
    locations?: string[]; // cidades/estados
    interests?: string[]; // interesses Meta
}

// Estrutura principal da campanha
export interface AdCampaignDTO {
    id: string;
    workspaceId: string;
    projectId: string;
    type: CampaignType;
    objective: CampaignObjective;
    budget: number; // orçamento total
    startDate: string;
    endDate: string;
    status: string; // DRAFT | READY | APPROVED | RUNNING | PAUSED
    creative: CreativeInfo;
    audience: AudienceDTO;
    createdAt: string;
}

// Schema para criação de campanhas
export const CreateCampaignSchema = z.object({
    workspaceId: z.string(),
    projectId: z.string(),
    type: z.enum(["META"]),
    objective: z.enum(["AWARENESS", "TRAFFIC", "ENGAGEMENT", "LEADS", "SALES"]),
    budget: z.number().positive(),
    startDate: z.string(),
    endDate: z.string(),
    creative: z.object({
        mediaId: z.string(),
        caption: z.string().optional(),
        cta: z.string().optional(),
    }),
    audience: z.object({
        ageMin: z.number().optional(),
        ageMax: z.number().optional(),
        genders: z.array(z.string()).optional(),
        locations: z.array(z.string()).optional(),
        interests: z.array(z.string()).optional(),
    }),
});

// Schema para atualização
export const UpdateCampaignSchema = CreateCampaignSchema.partial();
