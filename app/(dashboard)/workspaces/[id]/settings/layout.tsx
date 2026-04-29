export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold tracking-tight">Workspace Settings</h2>
                <p className="text-muted-foreground">Manage your workspace integrations and preferences.</p>
            </div>
            {children}
        </div>
    );
}
