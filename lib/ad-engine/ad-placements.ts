export const AD_PLACEMENTS = [
    "FEED",
    "STORIES",
    "REELS",
] as const;

export type AdPlacement = typeof AD_PLACEMENTS[number];
