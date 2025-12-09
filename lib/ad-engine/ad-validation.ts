export function validateCampaignDraft(draft: any) {
    const errors = [];
    if (!draft.name) errors.push("Name is required");
    if (!draft.objective) errors.push("Objective is required");
    if (!draft.placement) errors.push("Placement is required");
    return errors;
}
