export function mapDraftToMetaPayload(draft: any) {
    return {
        name: draft.name,
        objective: draft.objective,
        daily_budget: draft.dailyBudget,
        start_time: draft.startDate,
        end_time: draft.endDate,
        status: "PAUSED",
    };
}
