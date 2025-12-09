"use client";

import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui";
import { Check, Sparkles, Building2, Zap } from "lucide-react";

export default function PricingPage() {
    const handleSubscribe = (plan: string) => {
        console.log(`Initiating checkout for ${plan}`);
        // Mock checkout redirect
        window.location.href = `/api/billing/create-checkout-session?plan=${plan}`;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
                        <Sparkles className="h-6 w-6 text-blue-600" />
                        <Link href="/">FluxSpace</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                            Entrar
                        </Link>
                        <Link href="/register">
                            <Button>Começar Agora</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
                        Planos para cada fase do seu negócio
                    </h1>
                    <p className="text-lg text-slate-600">
                        Escolha o plano ideal para escalar sua criação de conteúdo.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {/* FREE Plan */}
                    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">FREE</CardTitle>
                            <div className="mt-2">
                                <span className="text-4xl font-extrabold text-slate-900">R$0</span>
                                <span className="text-slate-500">/mês</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">Para quem está começando.</p>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> 1 Workspace
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> 1 Projeto
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> 10 Gerações de IA/mês
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> Integração Canva Básica
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="/register" className="w-full">
                                <Button variant="outline" className="w-full">Começar</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* PRO Plan */}
                    <Card className="border-blue-200 shadow-lg ring-1 ring-blue-500 relative bg-white">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Mais Popular
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                PRO <Zap className="h-5 w-5 text-blue-600" />
                            </CardTitle>
                            <div className="mt-2">
                                <span className="text-4xl font-extrabold text-slate-900">R$49</span>
                                <span className="text-slate-500">/mês</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">Para criadores e pequenas empresas.</p>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> Workspaces Ilimitados
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> 10 Projetos
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> 1000 Gerações de IA/mês
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> Agendamento Meta Ilimitado
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> Templates & Presets
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                onClick={() => handleSubscribe('pro')}
                            >
                                Assinar PRO
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* AGENCY Plan */}
                    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-slate-50">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                AGENCY <Building2 className="h-5 w-5 text-slate-600" />
                            </CardTitle>
                            <div className="mt-2">
                                <span className="text-4xl font-extrabold text-slate-900">Sob Consulta</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">Para grandes times e agências.</p>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> Tudo do PRO
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> Projetos Ilimitados
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> Fluxo de Aprovação de Clientes
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> API Dedicada
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 text-green-500" /> Suporte Prioritário
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link href="mailto:vendas@fluxspace.ai" className="w-full">
                                <Button variant="outline" className="w-full">Fale com Vendas</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </main>

            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>&copy; {new Date().getFullYear()} FluxSpace. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
