"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default function BriefPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [objective, setObjective] = useState("");

    const [loading, setLoading] = useState(false);

    const handleNext = async () => {
        if (!title) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/projects/${params.id}/briefs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, objective })
            });

            if (res.ok) {
                const brief = await res.json();
                router.push(`/projects/${params.id}/ai?briefId=${brief.id}`);
            } else {
                alert("Failed to create brief");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating brief");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Step 1: Content Brief</h2>
                <span className="text-muted-foreground">Project ID: {params.id}</span>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Define your content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Summer Sale Announcement"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Objective</label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={objective}
                            onChange={(e) => setObjective(e.target.value)}
                            placeholder="What is the goal of this content?"
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button onClick={handleNext} disabled={loading}>
                            {loading ? "Saving..." : "Next: AI Generation"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
