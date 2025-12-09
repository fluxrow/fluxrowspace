"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@/components/ui";
import Image from "next/image";

export default function BrandingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [mainColor, setMainColor] = useState("#000000");
    const [secondaryColor, setSecondaryColor] = useState("#ffffff");
    const [fontHeading, setFontHeading] = useState("Inter");
    const [fontBody, setFontBody] = useState("Inter");
    const [logoUrl, setLogoUrl] = useState("");
    const [requiresApproval, setRequiresApproval] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.mainColor) setMainColor(data.mainColor);
                    if (data.secondaryColor) setSecondaryColor(data.secondaryColor);
                    if (data.logoUrl) setLogoUrl(data.logoUrl);
                    if (data.defaultRequiresApproval) setRequiresApproval(data.defaultRequiresApproval);
                    if (data.fonts) {
                        const fonts = JSON.parse(data.fonts);
                        setFontHeading(fonts.heading || "Inter");
                        setFontBody(fonts.body || "Inter");
                    }
                }
            } catch (error) {
                console.error("Failed to fetch project", error);
            }
        };
        fetchProject();
    }, [params.id]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/projects/${params.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mainColor,
                    secondaryColor,
                    logoUrl,
                    defaultRequiresApproval: requiresApproval,
                    fonts: JSON.stringify({ heading: fontHeading, body: fontBody }),
                }),
            });

            if (!res.ok) throw new Error("Failed to save");

            alert("Branding saved successfully!");
        } catch (error) {
            alert("Error saving branding settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Brand Settings</h2>
                <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Colors</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Primary Color</label>
                            <div className="flex gap-2">
                                <Input
                                    type="color"
                                    value={mainColor}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMainColor(e.target.value)}
                                    className="w-12 h-10 p-1 cursor-pointer"
                                />
                                <Input
                                    value={mainColor}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMainColor(e.target.value)}
                                    placeholder="#000000"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Secondary Color</label>
                            <div className="flex gap-2">
                                <Input
                                    type="color"
                                    value={secondaryColor}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondaryColor(e.target.value)}
                                    className="w-12 h-10 p-1 cursor-pointer"
                                />
                                <Input
                                    value={secondaryColor}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondaryColor(e.target.value)}
                                    placeholder="#ffffff"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Typography</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Heading Font</label>
                            <Input
                                value={fontHeading}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFontHeading(e.target.value)}
                                placeholder="e.g. Inter, Roboto"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Body Font</label>
                            <Input
                                value={fontBody}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFontBody(e.target.value)}
                                placeholder="e.g. Inter, Roboto"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Logo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Logo URL</label>
                            <Input
                                value={logoUrl}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogoUrl(e.target.value)}
                                placeholder="https://..."
                            />
                            <p className="text-xs text-muted-foreground">
                                Enter a direct URL to your logo image.
                            </p>
                        </div>
                        {logoUrl && (
                            <div className="mt-4 p-4 border rounded-md bg-slate-50 flex justify-center">
                                <Image src={logoUrl} alt="Brand Logo" width={500} height={500} className="max-h-32 object-contain" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Workflow Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="approval"
                                checked={requiresApproval}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequiresApproval(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="approval"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Require client approval before scheduling
                            </label>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 ml-6">
                            When enabled, new content briefs will be marked as &quot;Pending Approval&quot; and must be approved via a shared link before they can be scheduled.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
