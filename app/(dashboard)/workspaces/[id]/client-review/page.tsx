"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClientReviewCard } from "@/components/client-review/client-review-card";

export default function ClientReviewListPage({ params }: { params: { workspaceId: string } }) {
    const { id } = params;

    const [briefs, setBriefs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBriefs() {
            try {
                const res = await fetch(`/api/client-review/${workspaceId}/list`);
                const data = await res.json();
                setBriefs(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadBriefs();
    }, [workspaceId]);

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Client Review</h1>

            {/* ALERTA DE BRIEFS PENDENTES */}
            {briefs.some(
                (b) => b.status === "DESIGN_DONE" && b.approvalStatus === "none"
            ) && (
                    <div className="p-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded">
                        ⚠️ Existem conteúdos prontos que ainda não foram enviados para aprovação.
                        Clique em um deles para revisar e enviar ao cliente.
                    </div>
                )}

            {/* GRID DE BRIEFS */}
            {briefs.length === 0 ? (
                <div>No content available.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {briefs.map((brief) => (
                        <ClientReviewCard
                            key={brief.id}
                            brief={brief}
                            href={`/workspaces/${workspaceId}/client-review/${brief.id}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
