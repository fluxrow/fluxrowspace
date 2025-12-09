import { db } from "@/lib/db";

const DAY_IN_MS = 86_400_000;

export const PLANS = {
    FREE: {
        id: 'FREE',
        name: 'Free',
        limits: {
            projects: 1,
            postsPerMonth: 5,
            aiGenerationsPerMonth: 5,
            teamMembers: 1,
        },
        features: {
            canva: false,
            meta: false,
            templates: false,
            presets: false,
            ai_unlimited: false,
            team_expansion: false,
        }
    },
    PRO: {
        id: 'PRO',
        name: 'Pro',
        limits: {
            projects: Infinity,
            postsPerMonth: 200,
            aiGenerationsPerMonth: Infinity,
            teamMembers: 3,
        },
        features: {
            canva: true,
            meta: true,
            templates: true,
            presets: true,
            ai_unlimited: true,
            team_expansion: false,
        }
    },
    AGENCY: {
        id: 'AGENCY',
        name: 'Agency',
        limits: {
            projects: Infinity,
            postsPerMonth: Infinity,
            aiGenerationsPerMonth: Infinity,
            teamMembers: Infinity,
        },
        features: {
            canva: true,
            meta: true,
            templates: true,
            presets: true,
            ai_unlimited: true,
            team_expansion: true,
        }
    }
};

export async function getWorkspaceSubscription(workspaceId: string) {
    const subscription = await db.workspaceSubscription.findUnique({
        where: { workspaceId },
    });

    if (!subscription) return null;

    const isValid =
        subscription.status === "active" ||
        subscription.status === "trialing" ||
        (subscription.status === "canceled" &&
            subscription.currentPeriodEnd &&
            subscription.currentPeriodEnd.getTime() + DAY_IN_MS > Date.now());

    return isValid ? subscription : null;
}

export async function getWorkspacePlan(workspaceId: string) {
    const subscription = await getWorkspaceSubscription(workspaceId);
    const trial = await db.workspaceTrial.findUnique({ where: { workspaceId } });

    // Check if in trial
    if (trial && trial.isActive && trial.trialEnd > new Date()) {
        return PLANS.PRO; // Trial gives PRO access
    }

    if (!subscription) return PLANS.FREE;

    return PLANS[subscription.planId as keyof typeof PLANS] || PLANS.FREE;
}

export async function checkSubscription(workspaceId: string) {
    const plan = await getWorkspacePlan(workspaceId);
    return plan;
}

export async function hasFeature(workspaceId: string, feature: keyof typeof PLANS.FREE.features) {
    const plan = await getWorkspacePlan(workspaceId);
    return plan.features[feature];
}

export async function checkLimit(workspaceId: string, limit: keyof typeof PLANS.FREE.limits, currentCount: number) {
    const plan = await getWorkspacePlan(workspaceId);
    const max = plan.limits[limit];
    return currentCount < max;
}
