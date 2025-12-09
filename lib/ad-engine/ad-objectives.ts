export const AD_OBJECTIVES = [
    "TRAFFIC",
    "ENGAGEMENT",
    "REACH",
    "LEADS",
] as const;

export type AdObjective = typeof AD_OBJECTIVES[number];
