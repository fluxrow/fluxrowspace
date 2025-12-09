"use client";

import clsx from "clsx";

export function ReviewStatusBadge({ status }: { status: string }) {
    const colors = {
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
        pending: "bg-amber-100 text-amber-800",
        none: "bg-slate-200 text-slate-700",
    };

    return (
        <span
            className={clsx(
                "px-3 py-1 text-xs rounded-full font-semibold uppercase tracking-wide",
                colors[status as keyof typeof colors] || colors.none
            )}
        >
            {status}
        </span>
    );
}
