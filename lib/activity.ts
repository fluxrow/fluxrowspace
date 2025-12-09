import { db } from "@/lib/db";

export type ActivityAction =
    | 'CREATE_PROJECT'
    | 'UPDATE_PROJECT'
    | 'CREATE_BRIEF'
    | 'UPDATE_BRIEF'
    | 'GENERATE_AI'
    | 'CREATE_ASSET'
    | 'SCHEDULE_POST'
    | 'APPROVE_CONTENT'
    | 'REJECT_CONTENT'
    | 'INVITE_MEMBER'
    | 'REMOVE_MEMBER'
    | 'UPDATE_SUBSCRIPTION'
    | 'PUSH_TO_COM'
    | 'COM_STATUS_UPDATE'
    | 'WHATSAPP_PREVIEW_SENT'
    | 'CONTENT_BRIEF_APPROVED'
    | 'CONTENT_BRIEF_REJECTED';

export type ActivityTargetType =
    | 'PROJECT'
    | 'CONTENT_BRIEF'
    | 'MEDIA_ASSET'
    | 'WORKSPACE'
    | 'SUBSCRIPTION'
    | 'MEMBER'
    | 'SCHEDULED_POST';

interface LogActivityParams {
    workspaceId: string;
    userId?: string | null; // Null if system or public action
    action: ActivityAction;
    targetType: ActivityTargetType;
    targetId?: string;
    metadata?: any;
}

export async function logActivity({
    workspaceId,
    userId,
    action,
    targetType,
    targetId,
    metadata
}: LogActivityParams) {
    try {
        await db.activityLog.create({
            data: {
                workspaceId,
                userId,
                action,
                targetType,
                targetId,
                metadata: metadata || {}
            }
        });
    } catch (error) {
        console.error("[ACTIVITY_LOG_ERROR]", error);
        // Don't throw, just log error to avoid breaking main flow
    }
}
