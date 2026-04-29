"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default function AnalyticsPage({ params }: { params: { id: string } }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch(`/api/workspaces/${params.id}/analytics`);
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch (error) {
            console.error("Failed to fetch analytics", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading analytics...</div>;
    if (!data) return <div className="p-8 text-center">Failed to load data</div>;

    return (
        <div className="space-y-8 p-8 max-w-6xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
                <p className="text-muted-foreground">Overview of your workspace performance.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Content Briefs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalBriefs}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Scheduled Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.scheduledPosts}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.publishedPosts}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Generations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.aiGenerations}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Project Stats */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Content by Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.projectStats.map((project: any) => (
                                <div key={project.name} className="flex items-center">
                                    <div className="w-full space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">{project.name}</span>
                                            <span className="text-sm text-muted-foreground">{project.count} briefs</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500"
                                                style={{ width: `${(project.count / Math.max(1, data.totalBriefs)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {data.projectStats.length === 0 && (
                                <p className="text-sm text-muted-foreground">No projects found.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Placeholder for future charts */}
                <Card className="col-span-1 flex items-center justify-center bg-slate-50 border-dashed">
                    <div className="text-center p-8">
                        <p className="text-muted-foreground">More charts coming soon...</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
