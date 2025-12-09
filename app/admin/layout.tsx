export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-slate-900 text-white p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="font-bold text-lg">FluxSpace Admin</h1>
                    <nav className="space-x-4 text-sm">
                        <a href="/admin/production-config" className="hover:text-blue-400">Config</a>
                        <a href="/workspaces" className="hover:text-blue-400">App</a>
                    </nav>
                </div>
            </header>
            <main className="py-8">
                {children}
            </main>
        </div>
    );
}
