import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft, Book, HelpCircle } from "lucide-react";

export default function HelpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/workspaces/ws_123/projects" className="text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
                            <HelpCircle className="h-6 w-6 text-blue-600" />
                            <span>FluxSpace Help Center</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-12 gap-8">
                    <aside className="col-span-12 md:col-span-3 space-y-6">
                        <nav className="space-y-1">
                            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                Getting Started
                            </p>
                            <Link href="/help/workspace-setup" className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100">
                                Workspace Setup
                            </Link>
                            <Link href="/help/integrations" className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100">
                                Connecting Integrations
                            </Link>
                        </nav>

                        <nav className="space-y-1">
                            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                Features
                            </p>
                            <Link href="/help/scheduling" className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100">
                                Scheduling Content
                            </Link>
                            <Link href="/help/approval" className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100">
                                Client Approval
                            </Link>
                            <Link href="/help/com-integration" className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100">
                                COM Integration
                            </Link>
                        </nav>

                        <nav className="space-y-1">
                            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                Support
                            </p>
                            <Link href="/help/common-errors" className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100">
                                Common Errors
                            </Link>
                        </nav>
                    </aside>

                    <main className="col-span-12 md:col-span-9 bg-white rounded-lg shadow-sm border p-8 min-h-[500px]">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
