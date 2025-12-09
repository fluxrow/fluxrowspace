export default function CommonErrorsHelpPage() {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">Common Errors & Troubleshooting</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Integration Issues</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-medium mb-2">Invalid or Expired Tokens</h3>
                        <p className="mb-2">
                            If you see errors related to &quot;Invalid Token&quot; or &quot;Authentication Failed&quot; when using OpenAI, Canva, or Meta:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Go to Workspace Settings &gt; Integrations.</li>
                            <li>Disconnect and reconnect the affected service.</li>
                            <li>For OpenAI, generate a new API key in your OpenAI dashboard and update it here.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Plan & Usage Limits</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-medium mb-2">Paywall Restrictions</h3>
                        <p className="mb-2">
                            Some features like Brand Templates, Content Presets, and Scheduling are available only on the <strong>PRO</strong> plan.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            If you are blocked from accessing these, please upgrade your workspace subscription.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-2">AI Limit Reached</h3>
                        <p className="mb-2">
                            Each plan has a monthly limit on AI generations (text and images).
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Free:</strong> 10 generations/month</li>
                            <li><strong>Pro:</strong> 1000 generations/month</li>
                        </ul>
                        <p className="mt-2">
                            Usage resets at the start of your billing cycle. You can view your current usage in the Analytics dashboard.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Content Creation</h2>
                <div>
                    <h3 className="text-xl font-medium mb-2">Missing Templates or Presets</h3>
                    <p className="mb-2">
                        If you don&apos;t see any templates or presets in the Wizard:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Ensure you have created them in the Project &gt; Templates or Project &gt; Presets pages.</li>
                        <li>Verify that you are in the correct Project context.</li>
                        <li>Check if your subscription plan allows access to these features.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
