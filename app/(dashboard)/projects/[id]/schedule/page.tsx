"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@/components/ui";

export default function SchedulePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const briefId = searchParams.get('briefId');

    const [date, setDate] = useState("");
    const [scheduled, setScheduled] = useState(false);
    const [isMetaConnected, setIsMetaConnected] = useState<boolean | null>(null);
    const [workspaceId, setWorkspaceId] = useState("");

    const [brief, setBrief] = useState<any>(null);
    const [loadingBrief, setLoadingBrief] = useState(true);

    useEffect(() => {
        if (briefId) {
            fetchBrief();
        }

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
                            setIsMetaConnected(status.meta);
                        })
                        .catch(err => {
                            console.error("Failed to check integrations", err);
                            setIsMetaConnected(false);
                        });
                }
            })
            .catch(err => console.error("Failed to fetch project", err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [briefId, params.id]);

    const fetchBrief = async () => {
        try {
            const res = await fetch(`/api/projects/${params.id}/briefs/${briefId}`);
            if (res.ok) {
                const data = await res.json();
                setBrief(data);
                if (data.project) setWorkspaceId(data.project.workspace_id);
            }
        } catch (error) {
            console.error("Failed to fetch brief", error);
        } finally {
            setLoadingBrief(false);
        }
    };

    const handleSchedule = async () => {
        const res = await fetch("/api/integrations/meta/schedule", {
            method: "POST",
            body: JSON.stringify({
                contentBriefId: briefId,
                platform: "META",
                scheduledAt: date,
                workspaceId
            }),
        });

        if (res.ok) {
            setScheduled(true);
        } else {
            alert("Scheduling failed");
        }
    };

    const copyApprovalLink = () => {
        if (!brief?.approvalToken) return;
        const url = `${window.location.origin}/share/${brief.approvalToken}`;
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    };

    if (loadingBrief) return <div className="p-8 text-center">Loading...</div>;

    const needsApproval = brief?.requiresApproval && brief?.approvalStatus !== 'approved';

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Step 4: Schedule</h2>
            </div>

            {isMetaConnected === false && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
                    Meta integration is not configured.
                    <a href={`/workspaces/${workspaceId}/settings/integrations`} className="underline ml-1 font-medium">
                        Go to Settings
                    </a>
                </div>
            )}

            {brief?.requiresApproval && (
                <Card className={brief.approvalStatus === 'approved' ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Client Approval
                            <span className={`text-xs px-2 py-1 rounded-full uppercase ${brief.approvalStatus === 'approved' ? 'bg-green-200 text-green-800' :
                                brief.approvalStatus === 'rejected' ? 'bg-red-200 text-red-800' :
                                    'bg-amber-200 text-amber-800'
                                }`}>
                                {brief.approvalStatus}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm mb-4">
                            {brief.approvalStatus === 'approved'
                                ? "Content has been approved and is ready for scheduling."
                                : "This content requires client approval before it can be scheduled."}
                        </p>
                        {brief.approvalStatus !== 'approved' && (
                            <Button variant="outline" onClick={copyApprovalLink}>
                                Copy Approval Link
                            </Button>
                        )}
                        {brief.approvalComment && (
                            <div className="mt-4 p-3 bg-white rounded border text-sm">
                                <span className="font-semibold">Client Comment:</span> {brief.approvalComment}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            <Card className={needsApproval ? "opacity-50 pointer-events-none" : ""}>
                <CardHeader>
                    <CardTitle>Schedule Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!scheduled ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Publication Date</label>
                                <Input
                                    type="datetime-local"
                                    value={date}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button
                                    onClick={handleSchedule}
                                    disabled={!date || isMetaConnected === false || needsApproval}
                                >
                                    {needsApproval ? "Waiting for Approval" : "Schedule Post"}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 space-y-4">
                            <div className="text-green-600 text-xl font-bold">Successfully Scheduled!</div>
                            <p className="text-muted-foreground">Your post is ready to go.</p>
                            <Button onClick={() => router.push("/projects")}>Back to Projects</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
