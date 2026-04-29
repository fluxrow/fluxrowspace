"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { formatDistanceToNow } from "date-fns";

export default function ActivityPage({ params }: { params: { workspaceId: string } }) {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const fetchLogs = async () => {
        try {
            const res = await fetch(`/api/workspaces/${params.id}/activity`);
            if (res.ok) {
                const data = await res.json();
                setLogs(data);
            }
        } catch (error) {
            console.error("Failed to fetch logs", error);
        } finally {
            setLoading(false);
        }
    };

    const formatAction = (action: string) => {
        return action.replace(/_/g, ' ').toLowerCase();
    };

    return (
        <div className="space-y-8 p-8 max-w-5xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Activity Log</h2>
                <p className="text-muted-foreground">Audit trail of actions in this workspace.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">Loading activity...</div>
                    ) : logs.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No activity recorded yet.</div>
                    ) : (
                        <div className="space-y-4">
                            {logs.map((log) => (
                                <div key={log.id} className="flex items-start justify-between p-4 border-b last:border-0">
                                    <div className="flex gap-4">
                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {log.user ? log.user.name[0].toUpperCase() : 'S'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                <span className="font-bold text-slate-900">
                                                    {log.user ? log.user.name : 'System/Client'}
                                                </span>
                                                <span className="text-slate-600 mx-1">
                                                    {formatAction(log.action)}
                                                </span>
                                                <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-xs">
                                                    {log.targetType}
                                                </span>
                                            </p>
                                            {log.metadata && Object.keys(log.metadata).length > 0 && (
                                                <p className="text-xs text-slate-500 mt-1 font-mono">
                                                    {JSON.stringify(log.metadata)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-xs text-slate-400 whitespace-nowrap">
                                        {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
