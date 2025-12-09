"use client";

import { Button } from "@/components/ui";
import { Loader2 } from "lucide-react";

interface ReviewActionPanelProps {
    loading?: boolean;
    onApprove: () => void;
    onStartReject: () => void;
}

export function ReviewActionPanel({
    loading = false,
    onApprove,
    onStartReject,
}: ReviewActionPanelProps) {
    return (
        <div className="flex gap-4">
            <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={onApprove}
                disabled={loading}
            >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Aprovar
            </Button>
            <Button
                variant="destructive"
                onClick={onStartReject}
                disabled={loading}
            >
                Solicitar alterações
            </Button>
        </div>
    );
}
