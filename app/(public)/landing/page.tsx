import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight, Sparkles, Zap, BarChart } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <header className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
                        <Sparkles className="h-6 w-6 text-blue-600" />
                        <span>FluxSpace</span>
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                        <a href="#features" className="hover:text-slate-900">Features</a>
                        <a href="#pricing" className="hover:text-slate-900">Pricing</a>
                        <a href="/help" className="hover:text-slate-900">Resources</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                            Log in
                        </Link>
                        <Link href="/register">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero */}
                <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
                            Social Media Management,<br />
                            <span className="text-blue-600">Reimagined with AI.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                            Create, design, and schedule content in minutes. FluxSpace combines the power of OpenAI, Canva, and Meta into one seamless workflow.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/register">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="#demo">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                                    Watch Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Sparkles className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold">AI Content Generation</h3>
                                <p className="text-slate-600">
                                    Generate engaging captions and image prompts tailored to your brand voice instantly.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Zap className="h-6 w-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold">Canva Integration</h3>
                                <p className="text-slate-600">
                                    Design beautiful visuals without leaving the platform. Sync your designs with one click.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <BarChart className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold">Analytics & Insights</h3>
                                <p className="text-slate-600">
                                    Track performance and optimize your strategy with real-time data from your campaigns.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>&copy; 2024 FluxSpace. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
