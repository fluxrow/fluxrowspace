export default function SchedulingHelpPage() {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">Scheduling Content</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">The Scheduler</h2>
                <p className="mb-4">
                    FluxSpace allows you to schedule posts to Meta (Facebook & Instagram) directly from the Content Wizard.
                </p>
                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-4">
                    <strong>Prerequisite:</strong> You must have a Meta account connected in Workspace Settings &gt; Integrations.
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How to Schedule</h2>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Create your content using the Wizard (Brief &gt; AI &gt; Design).</li>
                    <li>Proceed to <strong>Step 4: Schedule</strong>.</li>
                    <li>Select the date and time for your post.</li>
                    <li>Choose the target platform (e.g., Instagram Feed, Facebook Page).</li>
                    <li>Click <strong>Schedule Post</strong>.</li>
                </ol>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Calendar View</h2>
                <p className="mb-4">
                    View all your scheduled content in one place.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Navigate to the <strong>Calendar</strong> tab in the sidebar.</li>
                    <li>Drag and drop posts to reschedule them (coming soon).</li>
                    <li>Click on a post to view details or make edits.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Post Statuses</h2>
                <ul className="space-y-2">
                    <li><span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">SCHEDULED</span> - Post is queued for publishing.</li>
                    <li><span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-medium">PUBLISHED</span> - Post is live.</li>
                    <li><span className="inline-block px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-medium">FAILED</span> - Publishing failed. Check the error message for details.</li>
                </ul>
            </section>
        </div>
    );
}
