"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default function ReviewHistory({ history }: { history: any[] }) {
    if (!history || history.length === 0) {
        return (
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Histórico</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-500">
                    Nenhuma interação registrada ainda.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Histórico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {history.map((item) => (
                    <div key={item.id} className="border-b pb-3">
                        <p className="font-medium">{item.action}</p>
                        {item.comment && (
                            <p className="text-slate-700 mt-1">{item.comment}</p>
                        )}
                        <p className="text-xs text-slate-500 mt-1">
                            {new Date(item.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
