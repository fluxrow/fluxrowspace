"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Plus } from "lucide-react";

interface Brief {
    id: string;
    title: string;
    status: 'DRAFT' | 'AI_DONE' | 'DESIGN_DONE' | 'SCHEDULED' | 'PUBLISHED';
    updated_at: string;
    requiresApproval: boolean;
    approvalStatus: string;
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [selectedBriefs, setSelectedBriefs] = useState<string[]>([]);
    const [isBulkActionLoading, setIsBulkActionLoading] = useState(false);
    const [workspaceId, setWorkspaceId] = useState("");

    const toggleSelect = (id: string) => {
        setSelectedBriefs(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleBulkDuplicate = async () => {
        setIsBulkActionLoading(true);
        try {
            await fetch("/api/content/bulk/duplicate", {
                method: "POST",
                body: JSON.stringify({
                    briefIds: selectedBriefs,
                    targetProjectId: params.id,
                    workspaceId: workspaceId
                })
            });
            alert("Items duplicated successfully");
            setSelectedBriefs([]);
            // Refresh list (mock)
        } catch (error) {
            alert("Failed to duplicate");
        } finally {
            setIsBulkActionLoading(false);
        }
    };

    const handleBulkStatus = async (status: string) => {
        setIsBulkActionLoading(true);
        try {
            await fetch("/api/content/bulk/status", {
                method: "POST",
                body: JSON.stringify({
                    briefIds: selectedBriefs,
                    status,
                    workspaceId: workspaceId
                })
            });
            alert("Status updated successfully");
            setSelectedBriefs([]);
            // Update local state (mock)
            setBriefs(briefs.map(b => selectedBriefs.includes(b.id) ? { ...b, status: status as any } : b));
        } catch (error) {
            alert("Failed to update status");
        } finally {
            setIsBulkActionLoading(false);
        }
    };

    const handleExportJson = () => {
        const selectedData = briefs.filter(b => selectedBriefs.includes(b.id));
        const blob = new Blob([JSON.stringify(selectedData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "content_export.json";
        a.click();
    };

    useEffect(() => {
        // Fetch Project to get Workspace ID
        fetch(`/api/projects/${params.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.workspace_id) {
                    setWorkspaceId(data.workspace_id);
                }
            })
            .catch(err => console.error("Failed to fetch project", err));

        // Fetch briefs for project
        // fetch(`/api/projects/${params.id}/briefs`)
        // Mock data
        setBriefs([
            {
                id: "1",
                title: "Summer Launch Post",
                status: "DRAFT",
                updated_at: new Date().toISOString(),
                requiresApproval: true,
                approvalStatus: "none"
            },
            {
                id: "2",
                title: "Weekend Sale",
                status: "SCHEDULED",
                updated_at: new Date().toISOString(),
                requiresApproval: false,
                approvalStatus: "none"
            },
            {
                id: "3",
                title: "Black Friday Teaser",
                status: "AI_DONE",
                updated_at: new Date().toISOString(),
                requiresApproval: true,
                approvalStatus: "none"
            },
            {
                id: "4",
                title: "New Year Promo",
                status: "DESIGN_DONE",
                updated_at: new Date().toISOString(),
                requiresApproval: true,
                approvalStatus: "none"
            }
        ]);
    }, [params.id]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DRAFT': return 'bg-slate-100 text-slate-700';
            case 'AI_DONE': return 'bg-blue-100 text-blue-700';
            case 'DESIGN_DONE': return 'bg-purple-100 text-purple-700';
            case 'SCHEDULED': return 'bg-orange-100 text-orange-700';
            case 'PUBLISHED': return 'bg-green-100 text-green-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const isReadyForApproval = (brief: Brief) => {
        return brief.requiresApproval &&
            brief.approvalStatus === "none" &&
            (brief.status === "AI_DONE" || brief.status === "DESIGN_DONE");
    };

    const readyForApprovalCount = briefs.filter(isReadyForApproval).length;

    return (
        <div className="space-y-8 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Project Content</h2>
                    <p className="text-muted-foreground">Manage your content pipeline.</p>
                </div>
                <div className="flex gap-2">
                    <Link href={`/projects/${params.id}/branding`}>
                        <Button variant="outline">Branding</Button>
                    </Link>
                    <Link href={`/projects/${params.id}/templates`}>
                        <Button variant="outline">Templates</Button>
                    </Link>
                    <Link href={`/projects/${params.id}/presets`}>
                        <Button variant="outline">Presets</Button>
                    </Link>
                    <Link href={`/projects/${params.id}/brief`}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Brief
                        </Button>
                    </Link>
                </div>
            </div>
            {
                readyForApprovalCount > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-center gap-3 text-amber-800">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <p className="text-sm font-medium">
                            Você tem {readyForApprovalCount} peça(s) pronta(s) para enviar para aprovação do cliente.
                        </p>
                    </div>
                )
            }

            {
                selectedBriefs.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-4 z-50 animate-in slide-in-from-bottom-4">
                        <span className="text-sm font-medium">{selectedBriefs.length} selected</span>
                        <div className="h-4 w-px bg-slate-700" />
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-slate-800"
                            onClick={handleBulkDuplicate}
                            disabled={isBulkActionLoading}
                        >
                            Duplicate
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-slate-800"
                            onClick={() => handleBulkStatus('DRAFT')}
                            disabled={isBulkActionLoading}
                        >
                            Set Draft
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-slate-800"
                            onClick={handleExportJson}
                        >
                            Export JSON
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-slate-400 hover:text-white hover:bg-slate-800"
                            onClick={() => setSelectedBriefs([])}
                        >
                            Cancel
                        </Button>
                    </div>
                )
            }

            <div className="grid gap-4">
                {briefs.map((brief) => (
                    <Card key={brief.id} className={`hover:bg-slate-50 transition-colors ${selectedBriefs.includes(brief.id) ? 'border-blue-500 bg-blue-50' : ''}`}>
                        <CardContent className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300"
                                    checked={selectedBriefs.includes(brief.id)}
                                    onChange={() => toggleSelect(brief.id)}
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{brief.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Last updated: {new Date(brief.updated_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(brief.status)}`}>
                                    {brief.status.replace('_', ' ')}
                                </span>
                                {isReadyForApproval(brief) && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                                        Pronto para enviar aprovação
                                    </span>
                                )}
                                <Link href={`/projects/${params.id}/ai?briefId=${brief.id}`}>
                                    <Button variant="outline" size="sm">Continue</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
