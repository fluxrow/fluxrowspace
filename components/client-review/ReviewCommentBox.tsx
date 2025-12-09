"use client";

import { Textarea, Button } from "@/components/ui";
import { Loader2 } from "lucide-react";

interface ReviewCommentBoxProps {
    comment: string;
    setComment: (value: string) => void;
    loading?: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

export function ReviewCommentBox({
    comment,
    setComment,
    loading = false,
    onCancel,
    onSubmit,
}: ReviewCommentBoxProps) {
    return (
        <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">
                Comentário (opcional)
            </h4>

            <Textarea
                className="min-h-[120px]"
                placeholder="Descreva as alterações desejadas..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={loading}
            />

            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button
                    variant="destructive"
                    onClick={onSubmit}
                    disabled={!comment.trim() || loading}
                >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Enviar feedback
                </Button>
            </div>
        </div>
    );
}
