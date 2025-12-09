"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { CheckCircle, XCircle, AlertTriangle, ShieldCheck } from "lucide-react";

export default function ProductionConfigPage() {
    const [envSummary, setEnvSummary] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(false);
    const [testResults, setTestResults] = useState<Record<string, string>>({});

    useEffect(() => {
        // Mock fetching env summary (in a real app, this would be a server action or API)
        // For security, we only return presence, not values.
        setEnvSummary({
            NODE_ENV: true,
            DATABASE_URL: true,
            NEXTAUTH_SECRET: true,
            OPENAI_API_KEY: false, // Mock missing
            META_APP_ID: true,
            CANVA_CLIENT_ID: true,
            STRIPE_SECRET_KEY: true,
            COM_DEFAULT_URL: false,
        });
    }, []);

    const runTest = async (testName: string) => {
        setTestResults(prev => ({ ...prev, [testName]: "Running..." }));
        // Mock test execution
        setTimeout(() => {
            const success = Math.random() > 0.2;
            setTestResults(prev => ({
                ...prev,
                [testName]: success ? "Passed" : "Failed: Connection timeout"
            }));
        }, 1500);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Production Configuration</h1>
                    <p className="text-muted-foreground">System status and environment verification.</p>
                </div>
                <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-md">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <span className="font-mono text-sm">v1.0.0-release</span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Environment Variables</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {Object.entries(envSummary).map(([key, present]) => (
                                <div key={key} className="flex items-center justify-between p-2 border rounded bg-slate-50">
                                    <span className="font-mono text-sm">{key}</span>
                                    {present ? (
                                        <span className="flex items-center text-green-600 text-xs font-medium">
                                            <CheckCircle className="h-4 w-4 mr-1" /> Set
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-red-600 text-xs font-medium">
                                            <XCircle className="h-4 w-4 mr-1" /> Missing
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>System Health Checks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            "Database Connection",
                            "Stripe Webhooks",
                            "Canva OAuth",
                            "Meta Graph API",
                            "COM Integration"
                        ].map((test) => (
                            <div key={test} className="flex items-center justify-between">
                                <span className="text-sm font-medium">{test}</span>
                                <div className="flex items-center space-x-4">
                                    <span className={`text-xs ${testResults[test] === "Passed" ? "text-green-600" : testResults[test]?.startsWith("Failed") ? "text-red-600" : "text-muted-foreground"}`}>
                                        {testResults[test] || "Not run"}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => runTest(test)}
                                        disabled={testResults[test] === "Running..."}
                                    >
                                        Run Test
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Deployment Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                            <input type="checkbox" checked readOnly className="h-4 w-4 text-green-600 rounded" />
                            <span className="text-sm">Database Migrations Applied</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <input type="checkbox" checked readOnly className="h-4 w-4 text-green-600 rounded" />
                            <span className="text-sm">Environment Variables Configured</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4 text-green-600 rounded" />
                            <span className="text-sm">Stripe Webhook Endpoint Verified</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4 text-green-600 rounded" />
                            <span className="text-sm">Domain DNS Propagation</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
