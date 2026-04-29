"use client";

import { useState, useEffect } from "react";
import { IntegrationStatus } from "@/components/ui";
import { Input, Button } from "@/components/ui";
import { useRouter, useSearchParams } from "next/navigation";

export default function IntegrationsPage({ params }: { params: { workspaceId: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const workspaceId = params.id;

    // State for OpenAI
    const [openaiKey, setOpenaiKey] = useState("");
    const [openaiStatus, setOpenaiStatus] = useState<"CONNECTED" | "NOT_CONNECTED" | "ERROR">("NOT_CONNECTED");

    // State for Canva
    const [canvaStatus, setCanvaStatus] = useState<"CONNECTED" | "NOT_CONNECTED" | "ERROR">("NOT_CONNECTED");

    // State for Meta
    const [metaToken, setMetaToken] = useState("");
    const [metaPageId, setMetaPageId] = useState("");
    const [metaStatus, setMetaStatus] = useState<"CONNECTED" | "NOT_CONNECTED" | "ERROR">("NOT_CONNECTED");

    useEffect(() => {
        // Check for query param from Canva callback
        if (searchParams.get("canva") === "connected") {
            setCanvaStatus("CONNECTED");
        }

        // Fetch existing integrations status
        fetch(`/api/workspaces/${workspaceId}/integrations/status`)
            .then(res => res.json())
            .then(data => {
                if (data.openai) setOpenaiStatus("CONNECTED");
                if (data.canva) setCanvaStatus("CONNECTED");
                if (data.meta) setMetaStatus("CONNECTED");
            })
            .catch(err => console.error("Failed to fetch integration status", err));
    }, [searchParams, workspaceId]);

    const handleSaveOpenAI = async () => {
        // Call API to save key
        await fetch("/api/integrations/openai/save", {
            method: "POST",
            body: JSON.stringify({ workspaceId, apiKey: openaiKey }),
        });
        setOpenaiStatus("CONNECTED");
    };

    const handleTestOpenAI = async () => {
        const res = await fetch("/api/integrations/openai/test", {
            method: "POST",
            body: JSON.stringify({ id }),
        });
        if (res.ok) alert("OpenAI Connection Working!");
        else alert("OpenAI Connection Failed");
    };

    const handleConnectCanva = async () => {
        // Redirect to Canva auth start
        window.location.href = `/api/integrations/canva/auth/start?workspaceId=${workspaceId}`;
    };

    const handleSaveMeta = async () => {
        await fetch("/api/integrations/meta/save", {
            method: "POST",
            body: JSON.stringify({ workspaceId, accessToken: metaToken, defaultPageId: metaPageId }),
        });
        setMetaStatus("CONNECTED");
    };

    const handleTestMeta = async () => {
        const res = await fetch("/api/integrations/meta/test", {
            method: "POST",
            body: JSON.stringify({ id }),
        });
        if (res.ok) alert("Meta Connection Working!");
        else alert("Meta Connection Failed");
    };

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* OpenAI */}
            <IntegrationStatus
                name="OpenAI"
                description="Connect OpenAI for text and image generation."
                status={openaiStatus}
                onConnect={handleSaveOpenAI}
                onTest={handleTestOpenAI}
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium">API Key</label>
                    <Input
                        type="password"
                        placeholder="sk-..."
                        value={openaiKey}
                        onChange={(e) => setOpenaiKey(e.target.value)}
                    />
                </div>
            </IntegrationStatus>

            {/* Canva */}
            <IntegrationStatus
                name="Canva"
                description="Connect Canva to create and edit designs."
                status={canvaStatus}
                onConnect={handleConnectCanva}
            />

            {/* Meta */}
            <IntegrationStatus
                name="Meta (Facebook/Instagram)"
                description="Connect Meta to schedule posts."
                status={metaStatus}
                onConnect={handleSaveMeta}
                onTest={handleTestMeta}
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium">Access Token</label>
                    <Input
                        type="password"
                        placeholder="EAAG..."
                        value={metaToken}
                        onChange={(e) => setMetaToken(e.target.value)}
                    />
                </div>
                <div className="space-y-2 mt-2">
                    <label className="text-sm font-medium">Page ID</label>
                    <Input
                        placeholder="123456789"
                        value={metaPageId}
                        onChange={(e) => setMetaPageId(e.target.value)}
                    />
                </div>
            </IntegrationStatus>
        </div>
    );
}
