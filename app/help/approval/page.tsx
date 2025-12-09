export default function ApprovalHelpPage() {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">Client Approval Workflow</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Enabling Approvals</h2>
                <p className="mb-4">
                    You can require client approval before any content is scheduled.
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Go to Project &gt; Branding &gt; Workflow Settings.</li>
                    <li>Toggle &quot;Require client approval&quot;.</li>
                </ol>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Sending for Review</h2>
                <p className="mb-4">
                    When you finish creating content in the Wizard:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>The content status will be &quot;Pending Approval&quot;.</li>
                    <li>Go to the Schedule tab.</li>
                    <li>Click &quot;Copy Approval Link&quot;.</li>
                    <li>Send this link to your client via email or chat.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Client Review Interface</h2>
                <p className="mb-4">
                    Clients see a simplified, branded page where they can:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>View the caption and image.</li>
                    <li><strong>Approve:</strong> Content becomes ready to schedule.</li>
                    <li><strong>Request Changes:</strong> They can leave a comment explaining what needs to be fixed.</li>
                </ul>
            </section>
        </div>
    );
}
