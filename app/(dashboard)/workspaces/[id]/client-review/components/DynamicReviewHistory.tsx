"use client";

import { useState, useEffect } from "react";
import { ClientReviewHistoryItem } from "@/types/client-review";
import ReviewHistoryTimeline from "./ReviewHistoryTimeline";

interface DynamicReviewHistoryProps {
    workspaceId: string;
    briefId: string;
    initialHistory?: ClientReviewHistoryItem[];
}

export function DynamicReviewHistory({
    workspaceId,
    briefId,
    initialHistory = []
}: DynamicReviewHistoryProps) {
    const [history, setHistory] = useState<ClientReviewHistoryItem[]>(initialHistory);

    useEffect(() => {
        async function loadHistory() {
            try {
                const res = await fetch(
                    `/api/client-review/${workspaceId}/${briefId}/history`
                );
                if (res.ok) {
                    const data = await res.json();
                    setHistory(data.history || []);
                }
            } catch (err) {
                console.error("Failed to load history", err);
            }
        }

        loadHistory();

        // Polling optional or trigger based? 
        // For now just load on mount/change as requested.
        // If we want real-time updates after actions, we might need a trigger or context.
        // But the user just asked for this effect.

    }, [workspaceId, briefId]);

    return <ReviewHistoryTimeline history={history} />;
}
