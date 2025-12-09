export const AD_STATUS = [
    "DRAFT",
    "READY_FOR_REVIEW",
    "APPROVED",
    "PUBLISHED",
    "FAILED",
] as const;

export type AdStatus = typeof AD_STATUS[number];
