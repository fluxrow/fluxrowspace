export default function ComIntegrationHelpPage() {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">COM / CRM Integration</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="mb-4">
                    FluxSpace can integrate with your external Content Operating Model (COM) or CRM system to push content updates and sync statuses.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Navigate to your Workspace Settings.</li>
                    <li>Click on the <strong>Integrations</strong> tab and select <strong>COM Integration</strong>.</li>
                    <li>Toggle &quot;Enable COM Integration&quot;.</li>
                    <li>Enter your <strong>COM Webhook URL</strong>. This is where FluxSpace will send content payloads.</li>
                    <li>Enter your <strong>API Key</strong> for authentication.</li>
                    <li>Click &quot;Save Changes&quot;.</li>
                </ol>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How it works</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Push Content:</strong> When content is approved or scheduled, FluxSpace sends a payload containing the caption, image URL, and status to your configured Webhook URL.
                    </li>
                    <li>
                        <strong>Sync Status:</strong> Your external system can call the FluxSpace API to update the status of content briefs (e.g., moving them to &quot;Published&quot; or &quot;Archived&quot;).
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
                <p className="mb-4">
                    If content is not syncing:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Verify the Webhook URL is reachable and correct.</li>
                    <li>Ensure the API Key matches what your system expects.</li>
                    <li>Check the Activity Log for any failed &quot;PUSH_TO_COM&quot; events.</li>
                </ul>
            </section>
        </div>
    );
}
