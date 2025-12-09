"use client";

import { ClientReviewHistoryItem } from "@/types/client-review";
import { format } from "date-fns";

export default function ReviewHistoryTimeline({
    history
}: {
    history: ClientReviewHistoryItem[];
}) {
    if (!history || history.length === 0) {
        return (
            <div className="text-sm text-slate-500 italic">
                Nenhuma ação registrada ainda.
            </div>
        );
    }

    return (
        <div className="space-y-6 border-l pl-6 mt-4">
            {history.map((item) => (
                <div key={item.id} className="relative">
                    <div className="absolute -left-3 top-1 w-2 h-2 rounded-full bg-blue-600"></div>

                    <div className="text-xs text-slate-400">
                        {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}
                    </div>

                    <div className="font-medium text-slate-800 capitalize mt-1">
                        {item.action}
                    </div>

                    {item.comment && (
                        <div className="text-sm text-slate-600 mt-1 bg-slate-50 p-2 rounded border">
                            {item.comment}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
