import { Card, CardHeader, CardTitle } from "@/components/ui";
import { CheckCircle, XCircle } from "lucide-react";

export default function ApiStatusPage() {
    // Server-side check of environment variables
    const status = {
        stripe: !!process.env.STRIPE_SECRET_KEY,
        canva: !!process.env.CANVA_CLIENT_ID,
        meta: !!process.env.META_APP_ID,
        openai: !!process.env.OPENAI_API_KEY,
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">API Status</h1>
            <div className="grid gap-4">
                {Object.entries(status).map(([key, isConnected]) => (
                    <Card key={key}>
                        <CardHeader className="flex flex-row items-center justify-between py-4">
                            <CardTitle className="capitalize">{key} Integration</CardTitle>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${isConnected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}>
                                {isConnected ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                {isConnected ? "Connected" : "Not Configured"}
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
