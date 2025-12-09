export default function IntegrationsHelpPage() {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">Connecting Integrations</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">OpenAI</h2>
                <p className="mb-4">
                    FluxSpace uses OpenAI to generate creative captions and image prompts. To connect:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Go to your Workspace Settings.</li>
                    <li>Navigate to the &quot;Integrations&quot; tab.</li>
                    <li>Enter your OpenAI API Key (starts with <code>sk-</code>).</li>
                    <li>Click &quot;Connect&quot;.</li>
                </ol>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Canva</h2>
                <p className="mb-4">
                    Connect your Canva account to create and import designs directly within FluxSpace.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Click &quot;Connect Canva&quot; in the Integrations tab.</li>
                    <li>You will be redirected to Canva to authorize FluxSpace.</li>
                    <li>Once authorized, you can select templates and export designs.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Meta (Facebook & Instagram)</h2>
                <p className="mb-4">
                    To schedule posts, you need to connect a Facebook Page associated with your Instagram Business account.
                </p>
                <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                    <strong>Note:</strong> Ensure your Instagram account is switched to a Professional/Business account.
                </div>
            </section>
        </div>
    );
}
