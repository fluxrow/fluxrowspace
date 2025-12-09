"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { SendForApprovalButton } from "@/components/client-review";

export default function AIPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const briefId = searchParams.get('briefId');

    const [generating, setGenerating] = useState(false);
    const [caption, setCaption] = useState("");
    const [imagePrompt, setImagePrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [brief, setBrief] = useState<any>(null);
    const [workspaceId, setWorkspaceId] = useState("");
    const [hasKey, setHasKey] = useState<boolean | null>(null);
    const [presets, setPresets] = useState<any[]>([]);
    const [selectedPresetId, setSelectedPresetId] = useState("");
    const [isPro, setIsPro] = useState(true);

    useEffect(() => {
        if (briefId && workspaceId) {
            fetch(`/api/client-review/${workspaceId}/${briefId}`)
                .then(res => res.json())
                .then(data => setBrief(data))
                .catch(err => console.error("Failed to fetch brief", err));
        }
    }, [briefId, workspaceId]);

    useEffect(() => {
        // Fetch Project to get Workspace ID
        fetch(`/api/projects/${params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.workspace_id) {
                    setWorkspaceId(data.workspace_id);
                    // Check integration status
                    fetch(`/api/workspaces/${data.workspace_id}/integrations/status`)
                        .then(res => res.json())
                        .then(status => {
                            setHasKey(status.openai);
                        })
                        .catch(err => {
                            console.error("Failed to check integrations", err);
                            setHasKey(false);
                        });
                }
            })
            .catch(err => console.error("Failed to fetch project", err));

        // Fetch presets
        fetch(`/api/projects/${params.id}/presets`)
            .then(res => res.json())
            .then(data => setPresets(data))
            .catch(err => console.error("Failed to fetch presets", err));
    }, [params.id]);

    const handleGenerate = async () => {
        if (!hasKey) return;
        setGenerating(true);

        // Find selected preset
        const preset = presets.find(p => p.id === selectedPresetId);
        const captionContext = preset ? `Style: ${preset.aiCaptionPrompt}` : "";
        const imageContext = preset ? `Style: ${preset.aiImagePrompt}` : "";

        const res = await fetch("/api/integrations/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: "TEXT",
                workspaceId,
                briefId, // Pass briefId
                context: `Project context here. ${captionContext}`,
                imageContext: imageContext
            })
        });

        if (!res.ok) {
            alert("Generation failed. Check your OpenAI connection.");
            setGenerating(false);
            return;
        }

        const data = await res.json();

        setCaption(data.main_caption);
        setImagePrompt(data.prompt_image);
        setGenerating(false);

        // Refresh brief to get updated status if needed
        if (workspaceId && briefId) {
            fetch(`/api/client-review/${workspaceId}/${briefId}`)
                .then(res => res.json())
                .then(data => setBrief(data));
        }
    };

    const handleNext = () => {
        router.push(`/projects/${params.id}/design?briefId=${briefId}`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Step 2: AI Generation</h2>
                    <p className="text-muted-foreground">Generate captions and image prompts.</p>
                </div>
                {!isPro && (
                    <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-sm font-medium">
                        Free Plan: 5 generations/month. <Link href="/workspaces/workspace_123/plans" className="underline">Upgrade</Link>
                    </div>
                )}
            </div>

            {hasKey === false && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                    OpenAI integration is not configured.
                    <a href={`/workspaces/${workspaceId}/settings/integrations`} className="underline ml-1 font-medium">
                        Go to Settings
                    </a>
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Generate Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {presets.length > 0 && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Content Preset (Optional)</label>
                            <select
                                className="w-full p-2 border rounded-md bg-background"
                                value={selectedPresetId}
                                onChange={(e) => setSelectedPresetId(e.target.value)}
                            >
                                <option value="">Select a style...</option>
                                {presets.map(preset => (
                                    <option key={preset.id} value={preset.id}>{preset.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <Button
                        onClick={handleGenerate}
                        disabled={generating || hasKey === false}
                        className="w-full"
                    >
                        {generating ? "Generating..." : "Generate with AI"}
                    </Button>

                    {caption && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Generated Caption</label>
                                <div className="p-4 bg-slate-100 rounded-md text-sm">
                                    {caption}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Image Prompt</label>
                                <div className="p-4 bg-slate-100 rounded-md text-sm italic">
                                    {imagePrompt}
                                </div>
                            </div>

                            {brief && (
                                <div className="pt-4 border-t">
                                    <SendForApprovalButton
                                        briefId={brief.id}
                                        approvalStatus={brief.approvalStatus}
                                    />
                                </div>
                            )}

                            <div className="pt-4 flex justify-end">
                                <Button onClick={handleNext}>Next: Design</Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
