"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Loader2 } from "lucide-react";

interface SendForApprovalButtonProps {
    briefId: string;
    approvalStatus: string;
}

export function SendForApprovalButton({ briefId, approvalStatus }: SendForApprovalButtonProps) {
    const [loading, setLoading] = useState(false);
    const [approvalLink, setApprovalLink] = useState("");

    const handleSend = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/content/send-for-approval", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ briefId }),
            });

            if (res.ok) {
                const data = await res.json();
                setApprovalLink(data.approvalUrl);
            } else {
                alert("Failed to send for approval");
            }
        } catch (error) {
            console.error(error);
            alert("Error sending for approval");
        } finally {
            setLoading(false);
        }
    };

    if (approvalStatus !== "none") return null;

    return (
        <div className="mt-4">
            <Button onClick={handleSend} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {loading ? "Enviando..." : "Enviar para aprovação"}
            </Button>

            {approvalLink && (
                <div className="mt-3 p-3 border rounded bg-green-50 text-sm">
                    Link gerado:
                    <div className="font-mono text-green-700 break-all mt-1">
                        {window.location.origin}{approvalLink}
                    </div>
                </div>
            )}
        </div>
    );
}
