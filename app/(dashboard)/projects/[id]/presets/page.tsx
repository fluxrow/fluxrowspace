"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import { Plus, Trash2 } from "lucide-react";

interface ContentPreset {
    id: string;
    name: string;
    description: string;
    aiCaptionPrompt: string;
    aiImagePrompt: string;
}

export default function PresetsPage({ params }: { params: { id: string } }) {
    const [presets, setPresets] = useState<ContentPreset[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newCaptionPrompt, setNewCaptionPrompt] = useState("");
    const [newImagePrompt, setNewImagePrompt] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchPresets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const fetchPresets = async () => {
        const res = await fetch(`/api/projects/${params.id}/presets`);
        if (res.ok) {
            setPresets(await res.json());
        }
    };

    const handleCreate = async () => {
        setCreating(true);
        try {
            const res = await fetch(`/api/projects/${params.id}/presets`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newName,
                    description: newDescription,
                    aiCaptionPrompt: newCaptionPrompt,
                    aiImagePrompt: newImagePrompt,
                }),
            });

            if (res.ok) {
                setIsCreateOpen(false);
                setNewName("");
                setNewDescription("");
                setNewCaptionPrompt("");
                setNewImagePrompt("");
                fetchPresets();
            }
        } catch (error) {
            console.error("Failed to create preset", error);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Content Presets</h2>
                    <p className="text-muted-foreground">Define AI styles and prompts for consistent content generation.</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create Preset
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <DialogTitle>New Content Preset</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Preset Name</label>
                                <Input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="e.g. Educational Reel"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Input
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    placeholder="Brief description of this style"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">AI Caption Modifier</label>
                                <Textarea
                                    value={newCaptionPrompt}
                                    onChange={(e) => setNewCaptionPrompt(e.target.value)}
                                    placeholder="e.g. Use a professional tone, include 3 hashtags, focus on value."
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">AI Image Modifier</label>
                                <Textarea
                                    value={newImagePrompt}
                                    onChange={(e) => setNewImagePrompt(e.target.value)}
                                    placeholder="e.g. Minimalist style, bright lighting, high contrast."
                                    rows={3}
                                />
                            </div>
                            <Button onClick={handleCreate} disabled={creating} className="w-full">
                                {creating ? "Creating..." : "Save Preset"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {presets.map((preset) => (
                    <Card key={preset.id}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-semibold">{preset.name}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{preset.description}</p>
                            <div className="space-y-2">
                                <div className="text-xs font-medium uppercase text-slate-500">Caption Prompt</div>
                                <div className="text-sm bg-slate-50 p-2 rounded border truncate">{preset.aiCaptionPrompt}</div>
                                <div className="text-xs font-medium uppercase text-slate-500 mt-2">Image Prompt</div>
                                <div className="text-sm bg-slate-50 p-2 rounded border truncate">{preset.aiImagePrompt}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
