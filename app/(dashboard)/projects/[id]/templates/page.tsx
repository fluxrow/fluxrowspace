"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { Plus, Search, Trash2, ExternalLink } from "lucide-react";
import Image from "next/image";

interface BrandTemplate {
    id: string;
    name: string;
    templateType: string;
    previewUrl: string;
    canvaTemplateId: string;
}

export default function TemplatesPage({ params }: { params: { id: string } }) {
    const [templates, setTemplates] = useState<BrandTemplate[]>([]);
    const [search, setSearch] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState("");
    const [newTemplateType, setNewTemplateType] = useState("FEED");
    const [canvaId, setCanvaId] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchTemplates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const fetchTemplates = async () => {
        const res = await fetch(`/api/projects/${params.id}/templates`);
        if (res.ok) {
            setTemplates(await res.json());
        }
    };

    const handleCreate = async () => {
        setCreating(true);
        try {
            const res = await fetch(`/api/projects/${params.id}/templates`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newTemplateName,
                    templateType: newTemplateType,
                    canvaTemplateId: canvaId,
                }),
            });

            if (res.ok) {
                setIsCreateOpen(false);
                setNewTemplateName("");
                setCanvaId("");
                fetchTemplates();
            }
        } catch (error) {
            console.error("Failed to create template", error);
        } finally {
            setCreating(false);
        }
    };

    const filteredTemplates = templates.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Template Library</h2>
                    <p className="text-muted-foreground">Manage your brand templates for quick content creation.</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create Template
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Brand Template</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Template Name</label>
                                <Input
                                    value={newTemplateName}
                                    onChange={(e) => setNewTemplateName(e.target.value)}
                                    placeholder="e.g. Summer Sale Feed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Type</label>
                                <Select value={newTemplateType} onValueChange={setNewTemplateType}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="FEED">Feed Post (1080x1080)</SelectItem>
                                        <SelectItem value="STORY">Story (1080x1920)</SelectItem>
                                        <SelectItem value="REELS">Reels Cover</SelectItem>
                                        <SelectItem value="CAROUSEL">Carousel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Canva Template ID (Optional)</label>
                                <Input
                                    value={canvaId}
                                    onChange={(e) => setCanvaId(e.target.value)}
                                    placeholder="Leave blank for empty canvas"
                                />
                            </div>
                            <Button onClick={handleCreate} disabled={creating} className="w-full">
                                {creating ? "Creating in Canva..." : "Create Template"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search templates..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {filteredTemplates.map((template) => (
                    <Card key={template.id} className="overflow-hidden group">
                        <div className="aspect-[3/4] bg-slate-100 relative">
                            {template.previewUrl && (
                                <Image
                                    src={template.previewUrl}
                                    alt={template.name}
                                    fill
                                    className="object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button variant="secondary" size="sm">
                                    <ExternalLink className="h-4 w-4 mr-1" /> Edit
                                </Button>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold truncate">{template.name}</h3>
                                    <p className="text-xs text-muted-foreground">{template.templateType}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
