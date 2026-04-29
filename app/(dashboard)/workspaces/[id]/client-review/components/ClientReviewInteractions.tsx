"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ReviewActionPanel, ReviewCommentBox } from "@/components/client-review";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default function ClientReviewInteractions() {
    const params = useParams();
    const router = useRouter();
    const { workspaceId, briefId } = params as { workspaceId: string; briefId: string };

    const [comment, setComment] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [mode, setMode] = useState<"comment" | "reject">("comment");

    const fetchBrief = async () => {
        router.refresh();
    };

    const handleApprove = async () => {
        try {
            setActionLoading(true);

            const res = await fetch(
                `/api/client-review/${workspaceId}/${briefId}/approve`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ comment: null }),
                }
            );

            if (res.ok) {
                await fetchBrief();
            }

        } catch (err) {
            console.error("APPROVE_ERROR", err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            if (!comment) return;
            setActionLoading(true);

            const res = await fetch(
                `/api/client-review/${workspaceId}/${briefId}/reject`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ comment }),
                }
            );

            if (res.ok) {
                setComment("");
                setMode("comment");
                await fetchBrief();
            }

        } catch (err) {
            console.error("REJECT_ERROR", err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleAddComment = async () => {
        try {
            if (!comment) return;
            setCommentLoading(true);

            const res = await fetch(
                `/api/client-review/${workspaceId}/${briefId}/comment`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ comment }),
                }
            );

            if (res.ok) {
                setComment("");
                await fetchBrief();
            }

        } catch (err) {
            console.error("COMMENT_ERROR", err);
        } finally {
            setCommentLoading(false);
        }
    };

    function handleStartReject() {
        setMode("reject");
        // Opcional: focar no input de comentário
    }

    function handleCancel() {
        setComment("");
        setMode("comment");
    }

    function handleSubmit() {
        if (mode === "reject") {
            handleReject();
        } else {
            handleAddComment();
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {mode === "reject" ? "Solicitar Alterações" : "Ações"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {mode === "comment" && (
                    <ReviewActionPanel
                        loading={actionLoading}
                        onApprove={handleApprove}
                        onStartReject={handleStartReject}
                    />
                )}

                <ReviewCommentBox
                    comment={comment}
                    setComment={setComment}
                    loading={actionLoading || commentLoading}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit}
                />
            </CardContent>
        </Card>
    );
}
