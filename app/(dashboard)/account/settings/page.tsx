"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent, Input, Label } from "@/components/ui";

export default function AccountSettingsPage() {
    const [name, setName] = useState("Demo User");
    const [email, setEmail] = useState("user@example.com");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        // Mock save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        alert("Settings saved!");
    };

    return (
        <div className="space-y-8 p-8 max-w-2xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
                <p className="text-muted-foreground">Manage your account preferences.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </CardContent>
            </Card>

            <Card className="border-red-200">
                <CardHeader>
                    <CardTitle className="text-red-500">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete your account and all of your content. This action cannot be undone.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                </CardContent>
            </Card>
        </div>
    );
}
