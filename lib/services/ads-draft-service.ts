import { db } from "@/lib/db";
import { AdsDraft } from "@prisma/client";

export class AdsDraftService {
    static async list(workspaceId: string): Promise<AdsDraft[]> {
        return db.adsDraft.findMany({
            where: { workspaceId },
            orderBy: { createdAt: "desc" },
        });
    }

    static async listByProject(projectId: string): Promise<AdsDraft[]> {
        return db.adsDraft.findMany({
            where: { projectId },
            orderBy: { createdAt: "desc" },
        });
    }

    static async create(data: {
        workspaceId?: string;
        projectId?: string;
        title: string;
        objective?: string;
        budgetDaily?: number;
        budgetLifetime?: number;
        audienceJson?: any;
        creativeJson?: any;
        status?: string;
    }): Promise<AdsDraft> {
        let workspaceId = data.workspaceId;

        if (!workspaceId && data.projectId) {
            const project = await db.project.findUnique({
                where: { id: data.projectId },
                select: { workspace_id: true }
            });
            if (project) {
                workspaceId = project.workspace_id;
            }
        }

        if (!workspaceId) {
            throw new Error("Workspace ID is required");
        }

        return db.adsDraft.create({
            data: {
                workspaceId: workspaceId,
                projectId: data.projectId ?? null,
                title: data.title,
                objective: data.objective ?? null,
                budgetDaily: data.budgetDaily ?? null,
                budgetLifetime: data.budgetLifetime ?? null,
                audienceJson: data.audienceJson ?? {},
                creativeJson: data.creativeJson ?? {},
                status: data.status ?? "DRAFT",
            },
        });
    }

    static async getById(id: string): Promise<AdsDraft | null> {
        return db.adsDraft.findUnique({
            where: { id },
        });
    }

    static async update(
        id: string,
        data: Partial<AdsDraft>
    ): Promise<AdsDraft> {
        return db.adsDraft.update({
            where: { id },
            data,
        });
    }

    static async delete(id: string): Promise<void> {
        await db.adsDraft.delete({
            where: { id },
        });
    }
}
