"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@/components/ui";
import Image from "next/image";

export default function SharePage({ params }: { params: { token: string } }) {
    const [brief, setBrief] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [showReject, setShowReject] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [completedAction, setCompletedAction] = useState<string | null>(null);

    useEffect(() => {
        fetchBrief();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.token]);

    const fetchBrief = async () => {
        try {
            const res = await fetch(`/api/approval/${params.token}`);
            if (res.ok) {
                const data = await res.json();
                setBrief(data);
                if (data.approvalStatus === 'approved' || data.approvalStatus === 'rejected') {
                    setCompletedAction(data.approvalStatus);
                }
            }
        } catch (error) {
            console.error("Failed to fetch brief", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        setActionLoading(true);
        try {
            const res = await fetch(`/api/approval/${params.token}/approve`, { method: "POST" });
            if (res.ok) {
                setCompletedAction("approved");
                setBrief({ ...brief, approvalStatus: 'approved' });
            }
        } catch (error) {
            alert("Failed to approve");
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        if (!comment) return;
        setActionLoading(true);
        try {
            const res = await fetch(`/api/approval/${params.token}/reject`, {
                method: "POST",
                body: JSON.stringify({ comment })
            });
            if (res.ok) {
                setCompletedAction("rejected");
                setBrief({ ...brief, approvalStatus: 'rejected' });
            }
        } catch (error) {
            alert("Failed to reject");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!brief) return <div className="min-h-screen flex items-center justify-center">Invalid Link</div>;

    const project = brief.project;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header with Branding */}
                <div className="text-center space-y-4">
                    {project.logoUrl && (
                        <Image src={project.logoUrl} alt={project.name} width={200} height={64} className="h-16 mx-auto object-contain" />
                    )}
                    <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
                    <p className="text-slate-500">Content Approval Request</p>
                </div>

                {/* Content Card */}
                <Card className="overflow-hidden shadow-lg">
                    <CardHeader className="bg-white border-b">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">{brief.title}</CardTitle>
                                <p className="text-sm text-slate-500 mt-1">{brief.objective}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${brief.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' :
                                brief.approvalStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-amber-100 text-amber-800'
                                }`}>
                                {brief.approvalStatus}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Image Side */}
                            <div className="bg-slate-100 p-8 flex items-center justify-center min-h-[300px]">
                                {brief.media_assets && brief.media_assets.length > 0 ? (
                                    <Image
                                        src={brief.media_assets[0].url}
                                        alt="Content Asset"
                                        width={500}
                                        height={500}
                                        className="max-w-full max-h-[400px] rounded shadow-sm object-contain"
                                    />
                                ) : (
                                    <div className="text-slate-400 text-center">
                                        <p>No image generated</p>
                                    </div>
                                )}
                            </div>

                            {/* Text Side */}
                            <div className="p-8 space-y-6 bg-white">
                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Generated Caption</h3>
                                    <div className="prose prose-sm max-w-none text-slate-800 whitespace-pre-wrap">
                                        {brief.ai_generated
                                            ? brief.ai_generated.main_caption
                                            : "No text generated yet."}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Area */}
                <div className="flex justify-center">
                    {completedAction === 'approved' ? (
                        <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200 w-full">
                            <h3 className="text-xl font-bold text-green-800 mb-2">Content Approved!</h3>
                            <p className="text-green-700">Thank you. The team has been notified and will proceed with scheduling.</p>
                        </div>
                    ) : completedAction === 'rejected' ? (
                        <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200 w-full">
                            <h3 className="text-xl font-bold text-red-800 mb-2">Changes Requested</h3>
                            <p className="text-red-700">Your feedback has been sent to the team.</p>
                        </div>
                    ) : (
                        <div className="w-full space-y-4">
                            {!showReject ? (
                                <div className="flex gap-4 justify-center">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-40 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                                        onClick={() => setShowReject(true)}
                                        disabled={actionLoading}
                                    >
                                        Request Changes
                                    </Button>
                                    <Button
                                        size="lg"
                                        className="w-40 bg-green-600 hover:bg-green-700"
                                        onClick={handleApprove}
                                        disabled={actionLoading}
                                    >
                                        {actionLoading ? "Processing..." : "Approve Content"}
                                    </Button>
                                </div>
                            ) : (
                                <Card className="border-red-200 shadow-sm">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-red-800 text-lg">Request Changes</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <textarea
                                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Please describe what needs to be changed..."
                                            value={comment}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                                        />
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" onClick={() => setShowReject(false)}>Cancel</Button>
                                            <Button
                                                variant="destructive"
                                                onClick={handleReject}
                                                disabled={!comment || actionLoading}
                                            >
                                                {actionLoading ? "Sending..." : "Submit Feedback"}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
