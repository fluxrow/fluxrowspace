"use client";

import { useState, useEffect } from "react";
import {
    ReviewStatusBadge,
    ReviewMediaViewer,
    ReviewCaptionBox,
    ReviewActionPanel,
    ReviewCommentBox,
} from "@/components/client-review";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";

export default function ClientReviewPublicPage({
    params,
}: {
    params: { token: string };
}) {
    const [brief, setBrief] = useState<any>(null);
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [completedAction, setCompletedAction] = useState<"approved" | "rejected" | null>(null);
    const [showReject, setShowReject] = useState(false);
    const [comment, setComment] = useState("");

    useEffect(() => {
        async function loadBrief() {
            try {
                const res = await fetch(`/api/client-review/public/${params.token}`);
                if (!res.ok) {
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                setBrief(data.brief);
                setProject(data.project);

                if (data.brief.approvalStatus === "approved") {
                    setCompletedAction("approved");
                } else if (data.brief.approvalStatus === "rejected") {
                    setCompletedAction("rejected");
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadBrief();
    }, [params.token]);

    const handleApprove = async () => {
        setActionLoading(true);
        try {
            const res = await fetch(`/api/client-review/public/${params.token}/approve`, {
                method: "POST",
            });

            if (res.ok) {
                setCompletedAction("approved");
                setBrief((prev: any) => ({ ...prev, approvalStatus: "approved" }));
            } else {
                alert("Failed to approve");
            }
        } catch (e) {
            alert("Failed to approve");
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        if (!comment || comment.trim().length === 0) return;

        setActionLoading(true);
        try {
            const res = await fetch(`/api/client-review/public/${params.token}/reject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment }),
            });

            if (res.ok) {
                setCompletedAction("rejected");
                setBrief((prev: any) => ({ ...prev, approvalStatus: "rejected" }));
                setShowReject(false);
            } else {
                alert("Failed to reject");
            }
        } catch (e) {
            alert("Failed to reject");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
    }

    if (!brief) {
        return <div className="min-h-screen flex items-center justify-center">Conteúdo não encontrado ou link inválido.</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            {project?.logoUrl && (
                                <Image src={project.logoUrl} alt={project.name} width={32} height={32} className="w-8 h-8 rounded-full" />
                            )}
                            <span className="text-sm font-medium text-slate-500">{project?.name || "FluxSpace"}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">{brief.title}</h1>
                        <p className="text-slate-500 mt-1">{brief.objective}</p>
                    </div>

                    <ReviewStatusBadge status={brief.approvalStatus} />
                </div>

                {/* Main Card */}
                <Card>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        {/* Media */}
                        <ReviewMediaViewer media={brief.media} />

                        {/* Caption */}
                        <ReviewCaptionBox text={brief.ai?.main_caption ?? null} />
                    </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ações</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {completedAction === "approved" ? (
                            <div className="bg-green-50 border border-green-200 rounded-md p-6 flex flex-col items-center text-center">
                                <CheckCircle2 className="w-12 h-12 text-green-600 mb-3" />
                                <h3 className="text-lg font-semibold text-green-800">Conteúdo Aprovado!</h3>
                                <p className="text-green-700">Obrigado pela sua aprovação. O conteúdo seguirá para agendamento.</p>
                            </div>
                        ) : completedAction === "rejected" ? (
                            <div className="bg-red-50 border border-red-200 rounded-md p-6 flex flex-col items-center text-center">
                                <XCircle className="w-12 h-12 text-red-600 mb-3" />
                                <h3 className="text-lg font-semibold text-red-800">Alterações Solicitadas</h3>
                                <p className="text-red-700">Obrigado pelo feedback. Nossa equipe fará as correções necessárias.</p>
                            </div>
                        ) : showReject ? (
                            <ReviewCommentBox
                                comment={comment}
                                setComment={setComment}
                                loading={actionLoading}
                                onCancel={() => setShowReject(false)}
                                onSubmit={handleReject}
                            />
                        ) : (
                            <ReviewActionPanel
                                loading={actionLoading}
                                onApprove={handleApprove}
                                onStartReject={() => setShowReject(true)}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
