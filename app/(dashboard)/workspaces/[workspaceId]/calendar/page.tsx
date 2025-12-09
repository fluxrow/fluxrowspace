"use client";

import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Download } from "lucide-react";

export default function CalendarPage({ params }: { params: { workspaceId: string } }) {
    const workspaceId = params.workspaceId;

    const handleExport = (type: 'csv' | 'ics') => {
        window.location.href = `/api/export/calendar.${type}?workspaceId=${workspaceId}`;
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
                    <p className="text-muted-foreground">View and manage your scheduled content.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport('csv')}>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExport('ics')}>
                        <Download className="mr-2 h-4 w-4" /> Export ICS
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 gap-4 text-center text-sm font-medium text-muted-foreground mb-4">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    {/* Mock Calendar Grid */}
                    <div className="grid grid-cols-7 gap-4 h-96">
                        {Array.from({ length: 35 }).map((_, i) => (
                            <div key={i} className="border rounded p-2 h-full relative hover:bg-slate-50">
                                <span className="text-xs text-slate-400">{i + 1}</span>
                                {i === 15 && (
                                    <div className="mt-2 text-xs bg-blue-100 text-blue-800 p-1 rounded font-medium truncate">
                                        Summer Sale
                                    </div>
                                )}
                                {i === 18 && (
                                    <div className="mt-2 text-xs bg-orange-100 text-orange-800 p-1 rounded font-medium truncate">
                                        Weekend Promo
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
