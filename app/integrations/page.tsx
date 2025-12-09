"use client";

import { useState } from "react";
import { Button, Input, Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui";
import { CheckCircle, XCircle, Zap, Image as ImageIcon, MessageSquare } from "lucide-react";

export default function IntegrationsPage() {
    // Mock state for demonstration
    const [openaiKey, setOpenaiKey] = useState("");
    const [isCanvaConnected, setIsCanvaConnected] = useState(false);
    const [isMetaConnected, setIsMetaConnected] = useState(false);
    const [isOpenAIConnected, setIsOpenAIConnected] = useState(false);

    const handleSaveOpenAI = () => {
        if (openaiKey) {
            setIsOpenAIConnected(true);
            alert("API Key saved (mock)!");
        }
    };

    const handleConnectCanva = () => {
        setIsCanvaConnected(!isCanvaConnected);
    };

    const handleConnectMeta = () => {
        setIsMetaConnected(!isMetaConnected);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Integrações</h1>
                    <p className="text-slate-600">Gerencie suas conexões com ferramentas externas.</p>
                </div>

                <div className="grid gap-6">
                    {/* OpenAI Integration */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Zap className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">OpenAI</CardTitle>
                                    <CardDescription>Geração de texto e ideias com IA.</CardDescription>
                                </div>
                            </div>
                            <StatusChip isConnected={isOpenAIConnected} />
                        </CardHeader>
                        <CardContent className="mt-4">
                            <div className="flex gap-4">
                                <Input
                                    type="password"
                                    placeholder="sk-..."
                                    value={openaiKey}
                                    onChange={(e) => setOpenaiKey(e.target.value)}
                                    className="max-w-md"
                                />
                                <Button onClick={handleSaveOpenAI}>Salvar API Key</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Canva Integration */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <ImageIcon className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">Canva</CardTitle>
                                    <CardDescription>Crie e importe designs diretamente.</CardDescription>
                                </div>
                            </div>
                            <StatusChip isConnected={isCanvaConnected} />
                        </CardHeader>
                        <CardContent className="mt-4">
                            <Button
                                variant={isCanvaConnected ? "outline" : "default"}
                                onClick={handleConnectCanva}
                                className={isCanvaConnected ? "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" : "bg-purple-600 hover:bg-purple-700"}
                            >
                                {isCanvaConnected ? "Desconectar Canva" : "Conectar Canva"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Meta Integration */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <MessageSquare className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">Meta (Facebook & Instagram)</CardTitle>
                                    <CardDescription>Agendamento e publicação automática.</CardDescription>
                                </div>
                            </div>
                            <StatusChip isConnected={isMetaConnected} />
                        </CardHeader>
                        <CardContent className="mt-4">
                            <Button
                                variant={isMetaConnected ? "outline" : "default"}
                                onClick={handleConnectMeta}
                                className={isMetaConnected ? "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" : "bg-blue-600 hover:bg-blue-700"}
                            >
                                {isMetaConnected ? "Desconectar Meta" : "Conectar Meta"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function StatusChip({ isConnected }: { isConnected: boolean }) {
    return (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${isConnected
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-slate-100 text-slate-600 border-slate-200"
            }`}>
            {isConnected ? (
                <>
                    <CheckCircle className="h-3.5 w-3.5" />
                    Conectado
                </>
            ) : (
                <>
                    <XCircle className="h-3.5 w-3.5" />
                    Não Conectado
                </>
            )}
        </div>
    );
}
