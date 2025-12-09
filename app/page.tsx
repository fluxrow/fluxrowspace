import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Sparkles, Palette, Calendar, ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
                        <Sparkles className="h-6 w-6 text-blue-600" />
                        <span>FluxSpace</span>
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

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
                            Crie Conteúdos, Imagens e Designs com IA — <span className="text-blue-600">Tudo em um só lugar.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                            FluxSpace é a plataforma unificada para agências, criadores e empresas automatizarem conteúdo, designs e distribuição.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/register">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-12">
                                    Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <Card className="border-none shadow-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                <CardHeader>
                                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                        <Sparkles className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <CardTitle>Criação com IA</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600">
                                        Gere legendas, ideias e imagens originais em segundos com nossa integração avançada de IA.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Card 2 */}
                            <Card className="border-none shadow-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                <CardHeader>
                                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                        <Palette className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <CardTitle>Design no Canva</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600">
                                        Acesse seus templates e crie designs profissionais diretamente no FluxSpace com a integração Canva.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Card 3 */}
                            <Card className="border-none shadow-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                <CardHeader>
                                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                        <Calendar className="h-6 w-6 text-green-600" />
                                    </div>
                                    <CardTitle>Agendamento Meta</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600">
                                        Publique ou agende seus posts para Instagram e Facebook com um clique, sem sair da plataforma.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>&copy; {new Date().getFullYear()} FluxSpace. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
