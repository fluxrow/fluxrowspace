"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@/components/ui";
import { Send } from "lucide-react";
import Image from "next/image";

interface Brief {
    id: string;
    title: string;
    project: { name: string };
    ai_generated?: { main_caption: string };
    media_assets: { url: string }[];
}

export default function WhatsAppPreviewPage() {
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [selectedBriefs, setSelectedBriefs] = useState<string[]>([]);
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchBriefs = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/workspaces/${workspaceId}/content`);
                if (res.ok) {
                    const data = await res.json();
                    setBriefs(data);
                }
            } catch (error) {
                console.error("Failed to fetch briefs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBriefs();
    }, [workspaceId]);

    const handleToggleBrief = (id: string) => {
        setSelectedBriefs(prev =>
            prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
        );
    };

    const handleSend = async () => {
        if (!phone) {
            alert("Please enter a phone number");
            return;
        }
        if (selectedBriefs.length === 0) {
            alert("Please select at least one content piece");
            return;
        }

        setSending(true);
        try {
            const res = await fetch("/api/whatsapp/send-preview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    workspaceId,
                    phone,
                    message,
                    briefIds: selectedBriefs
                }),
            });

            if (!res.ok) throw new Error("Failed to send");

            alert("Preview sent successfully!");
            setSelectedBriefs([]);
            setMessage("");
        } catch (error) {
            alert("Error sending preview");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">WhatsApp Preview</h2>
                    <p className="text-muted-foreground">Send content previews to a WhatsApp number for review.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Recipient Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone Number</label>
                            <Input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 234 567 8900"
                            />
                            <p className="text-xs text-muted-foreground">
                                Include country code.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Custom Message (Optional)</label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Hey, check out these drafts..."
                            />
                        </div>
                        <Button className="w-full" onClick={handleSend} disabled={sending}>
                            <Send className="mr-2 h-4 w-4" />
                            {sending ? "Sending..." : "Send Preview"}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Select Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div>Loading content...</div>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {briefs.map(brief => (
                                    <div
                                        key={brief.id}
                                        className={`flex items-start space-x-4 p-4 border rounded-lg cursor-pointer transition-colors ${selectedBriefs.includes(brief.id) ? "bg-blue-50 border-blue-200" : "hover:bg-slate-50"}`}
                                        onClick={() => handleToggleBrief(brief.id)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedBriefs.includes(brief.id)}
                                            onChange={() => { }} // Handled by parent div click
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-semibold">{brief.title}</h4>
                                                <span className="text-xs text-muted-foreground bg-slate-100 px-2 py-1 rounded">
                                                    {brief.project.name}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {brief.ai_generated?.main_caption || "No caption generated yet."}
                                            </p>
                                            {brief.media_assets[0] && (
                                                <Image
                                                    src={brief.media_assets[0].url}
                                                    alt="Preview"
                                                    width={80}
                                                    height={80}
                                                    className="mt-2 object-cover rounded-md"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {briefs.length === 0 && (
                                    <div className="text-center text-muted-foreground py-8">
                                        No content found in this workspace.
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
