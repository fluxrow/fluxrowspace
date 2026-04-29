"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@/components/ui";

export default function ComIntegrationPage() {
    const params = useParams();
    const workspaceId = params.id as string;

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [comEnabled, setComEnabled] = useState(false);
    const [comUrl, setComUrl] = useState("");
    const [comApiKey, setComApiKey] = useState("");

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/workspaces/${workspaceId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComEnabled(data.comEnabled || false);
                    setComUrl(data.comUrl || "");
                    setComApiKey(data.comApiKey || "");
                }
            } catch (error) {
                console.error("Failed to fetch settings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, [workspaceId]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/workspaces/${workspaceId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    comEnabled,
                    comUrl,
                    comApiKey
                }),
            });

            if (!res.ok) throw new Error("Failed to save");

            alert("COM settings saved successfully!");
        } catch (error) {
            alert("Error saving settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8">Loading settings...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">COM Integration</h2>
                    <p className="text-muted-foreground">Connect your workspace to the external COM/CRM system.</p>
                </div>
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="enable-com"
                            checked={comEnabled}
                            onChange={(e) => setComEnabled(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="enable-com"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Enable COM Integration
                        </label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">COM Webhook URL</label>
                        <Input
                            value={comUrl}
                            onChange={(e) => setComUrl(e.target.value)}
                            placeholder="https://api.com-system.example/webhook"
                            disabled={!comEnabled}
                        />
                        <p className="text-xs text-muted-foreground">
                            The endpoint where FluxSpace will push content updates.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">API Key</label>
                        <Input
                            type="password"
                            value={comApiKey}
                            onChange={(e) => setComApiKey(e.target.value)}
                            placeholder="sk_..."
                            disabled={!comEnabled}
                        />
                        <p className="text-xs text-muted-foreground">
                            Secure key for authenticating requests to the COM system.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
