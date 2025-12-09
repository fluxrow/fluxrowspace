"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { ClientReviewBriefItem } from "@/types/client-review";
import Link from "next/link";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    pending: "bg-amber-100 text-amber-800",
    none: "bg-slate-200 text-slate-700",
};

export function ClientReviewCard({
    brief,
    href,
}: {
    brief: ClientReviewBriefItem;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="block border rounded-lg p-4 hover:bg-slate-50 transition"
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">{brief.title}</h3>

                {/* BADGE DE PENDENTE */}
                {brief.status === "DESIGN_DONE" && brief.approvalStatus === "none" && (
                    <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 border border-red-300">
                        Pendente de Envio
                    </span>
                )}

                {/* BADGE DE APROVAÇÃO NORMAL */}
                {brief.approvalStatus !== "none" && (
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 border border-blue-300 capitalize">
                        {brief.approvalStatus}
                    </span>
                )}
            </div>

            <p className="text-sm text-slate-500 mt-1">
                Criado em {new Date(brief.createdAt).toLocaleDateString()}
            </p>
        </Link>
    );
}
