"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@/components/ui";
import { Trash2, UserPlus } from "lucide-react";

export default function TeamPage({ params }: { params: { id: string } }) {
    const [members, setMembers] = useState<any[]>([]);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const fetchMembers = async () => {
        const res = await fetch(`/api/workspaces/${params.id}/team`);
        if (res.ok) {
            const data = await res.json();
            setMembers(data);
        }
    };

    const handleInvite = async () => {
        if (!email) return;
        setLoading(true);
        setError("");

        const res = await fetch(`/api/workspaces/${params.id}/team`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, role: "member" })
        });

        if (res.ok) {
            setEmail("");
            fetchMembers();
        } else {
            const msg = await res.text();
            setError(msg);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-8 p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
                    <p className="text-muted-foreground">Manage your workspace members.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Invite Member</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Input
                            placeholder="colleague@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button onClick={handleInvite} disabled={loading}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            {loading ? "Inviting..." : "Invite"}
                        </Button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Members ({members.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                        {member.user.name[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium">{member.user.name}</p>
                                        <p className="text-sm text-muted-foreground">{member.user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm bg-slate-100 px-2 py-1 rounded capitalize">{member.role}</span>
                                    {member.role !== 'owner' && (
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
