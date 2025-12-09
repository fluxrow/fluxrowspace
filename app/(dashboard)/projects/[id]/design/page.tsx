"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import Image from "next/image";

export default function DesignPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const briefId = searchParams.get('briefId');

    const [designUrl, setDesignUrl] = useState("");
    const [designId, setDesignId] = useState("");
    const [isCanvaConnected, setIsCanvaConnected] = useState<boolean | null>(null);
    const [workspaceId, setWorkspaceId] = useState("");
    const [syncing, setSyncing] = useState(false);
    const [finalAsset, setFinalAsset] = useState("");

    const [templates, setTemplates] = useState<any[]>([]);
    const [isPro, setIsPro] = useState(true);

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
                            setIsCanvaConnected(status.canva);
                        })
                        .catch(err => {
                            console.error("Failed to check integrations", err);
                            setIsCanvaConnected(false);
                        });

                    // Fetch subscription using real workspace ID
                    fetch(`/api/workspaces/${data.workspace_id}/subscription`)
                        .then(res => res.json())
                        .then(subData => {
                            setIsPro(subData.plan.features.templates);
                        })
                        .catch(err => console.error("Failed to fetch subscription", err));
                }
            })
            .catch(err => console.error("Failed to fetch project", err));

        // Fetch templates
        fetch(`/api/projects/${params.id}/templates`)
            .then(res => res.json())
            .then(data => setTemplates(data))
            .catch(err => console.error("Failed to fetch templates", err));
    }, [params.id]);

    const handleCreateCanvaDesign = async (templateId?: string) => {
        // Call /api/integrations/canva/design/create
        const res = await fetch("/api/integrations/canva/design/create", {
            method: "POST",
            body: JSON.stringify({
                title: "FluxSpace Design",
                workspaceId,
                briefId,
                sourceTemplateId: templateId
            }),
        });
        const data = await res.json();
        setDesignUrl(data.url);
        setDesignId(data.id);
    };

    const handleSync = async () => {
        setSyncing(true);
        const res = await fetch("/api/integrations/canva/design/export", {
            method: "POST",
            body: JSON.stringify({ designId, workspaceId, briefId }),
        });
        const data = await res.json();

        // Mock polling and completion
        setTimeout(() => {
            setFinalAsset("https://via.placeholder.com/1080x1350?text=Final+Canva+Design");
            setSyncing(false);
        }, 2000);
    };

    const handleNext = () => {
        router.push(`/projects/${params.id}/schedule?briefId=${briefId}`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Step 3: Design</h2>
            </div>

            {isCanvaConnected === false && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-4">
                    Connect Canva in Workspace Settings to enable in-editor design.
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Create Visuals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!designUrl && !finalAsset ? (
                        <div className="space-y-8">
                            {/* Templates Section */}
                            {templates.length > 0 && (
                                <div className="grid gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                                <span>Use Brand Template</span>
                                                {!isPro && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Pro Feature</span>}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {!isPro ? (
                                                <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed">
                                                    <p className="text-muted-foreground mb-4">Upgrade to Pro to use Brand Templates.</p>
                                                    <Link href="/workspaces/workspace_123/plans">
                                                        <Button variant="default">Upgrade Now</Button>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {templates.map((template) => (
                                                        <div
                                                            key={template.id}
                                                            className="border rounded-lg p-2 cursor-pointer hover:border-blue-500 transition-all"
                                                            onClick={() => handleCreateCanvaDesign(template.canvaTemplateId)}
                                                        >
                                                            <div className="aspect-[9/16] bg-slate-100 mb-2 rounded overflow-hidden">
                                                                {template.previewUrl ? (
                                                                    <Image src={template.previewUrl} alt={template.name} width={500} height={500} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Preview</div>
                                                                )}
                                                            </div>
                                                            <p className="text-sm font-medium truncate">{template.name}</p>
                                                        </div>
                                                    ))}
                                                    {templates.length === 0 && (
                                                        <div className="col-span-full text-center py-8 text-muted-foreground">
                                                            No templates found. <Link href={`/projects/${params.id}/templates`} className="underline">Create one in the library.</Link>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card></div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-32 flex flex-col gap-2" onClick={() => alert("AI Image Generation Mock")}>
                                    <span>Generate AI Image</span>
                                </Button>
                                <Button
                                    className="h-32 flex flex-col gap-2 bg-[#00C4CC] hover:bg-[#00B0B8] text-white"
                                    onClick={() => handleCreateCanvaDesign()}
                                    disabled={isCanvaConnected === false}
                                >
                                    <span>Start Blank Design</span>
                                </Button>
                            </div>
                        </div>
                    ) : !finalAsset ? (
                        <div className="space-y-4">
                            <div className="p-4 border rounded-md bg-slate-50 text-center">
                                <p className="mb-4 text-sm text-muted-foreground">Design created in Canva</p>
                                <a href={designUrl} target="_blank" rel="noopener noreferrer">
                                    <Button variant="default">Open Editor in Canva</Button>
                                </a>
                            </div>

                            <div className="flex justify-center">
                                <Button onClick={handleSync} disabled={syncing}>
                                    {syncing ? "Syncing..." : "Sync with FluxSpace"}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="border rounded-md overflow-hidden">
                                <Image src={finalAsset} alt="Final Design" width={1080} height={1350} className="w-full h-auto" />
                            </div>
                            <div className="pt-4 flex justify-end gap-2">
                                <Button onClick={handleNext}>Next: Schedule</Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
