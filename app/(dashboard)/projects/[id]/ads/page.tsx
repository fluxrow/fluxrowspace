"use client";

import { Card, CardHeader, CardTitle, CardContent, Button } from "@/components/ui";

export default function ProjectAdsPage({ params }: { params: { id: string } }) {
    const { id: projectId } = params;

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Anúncios (Meta)</h1>
                    <p className="text-sm text-slate-500">
                        Módulo em construção. Em breve você poderá criar rascunhos de campanhas
                        e anúncios usando os criativos já aprovados pelo cliente.
                    </p>
                </div>
            </div>

            <Card className="border-dashed border-slate-300">
                <CardHeader>
                    <CardTitle className="text-base">
                        Criar novo rascunho de anúncio
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-slate-600">
                        Nesta fase, esta página é apenas uma prévia visual.
                        A lógica de criação de anúncios e integração com a API do Meta Ads
                        será adicionada nas próximas etapas.
                    </p>
                    <Button disabled className="cursor-not-allowed opacity-60">
                        Criar anúncio (em breve)
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Rascunhos de anúncios</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-500">
                        Ainda não há rascunhos de anúncios. Assim que a integração for ativada,
                        eles aparecerão aqui.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
