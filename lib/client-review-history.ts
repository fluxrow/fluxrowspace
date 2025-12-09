import { db } from "@/lib/db";

export async function createClientReviewHistory({
    briefId,
    workspaceId,
    action,
    comment = null,
}: {
    briefId: string;
    workspaceId: string;
    action: "VIEWED" | "APPROVED" | "REJECTED" | "COMMENTED";
    comment?: string | null;
}) {
    return db.clientReviewHistory.create({
        data: {
            briefId,
            workspaceId,
            action,
            comment,
        },
    });
}
