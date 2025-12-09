"use client";

import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface IntegrationStatusProps {
    name: string;
    description: string;
    status: "CONNECTED" | "NOT_CONNECTED" | "ERROR";
    onConnect?: () => void;
    onDisconnect?: () => void;
    onTest?: () => void;
    children?: React.ReactNode; // For custom fields like API Key input
}

export function IntegrationStatus({
    name,
    description,
    status,
    onConnect,
    onDisconnect,
    onTest,
    children
}: IntegrationStatusProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                    {name}
                </CardTitle>
                {status === "CONNECTED" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                {status === "NOT_CONNECTED" && <XCircle className="h-5 w-5 text-slate-300" />}
                {status === "ERROR" && <AlertCircle className="h-5 w-5 text-red-500" />}
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>

                <div className="mb-4">
                    {children}
                </div>

                <div className="flex items-center gap-2">
                    {status === "NOT_CONNECTED" ? (
                        <Button onClick={onConnect}>Connect</Button>
                    ) : (
                        <>
                            {onTest && <Button variant="outline" onClick={onTest}>Test Connection</Button>}
                            {onDisconnect && <Button variant="destructive" onClick={onDisconnect}>Disconnect</Button>}
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
