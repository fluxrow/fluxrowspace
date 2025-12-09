export default function WorkspaceSetupHelpPage() {
    return (
        <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">Workspace Setup Guide</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Creating your first Project</h2>
                <p className="mb-4">
                    Projects help you organize content for different brands or campaigns.
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Click &quot;Create Project&quot; on the dashboard.</li>
                    <li>Enter a name (e.g., &quot;Summer Campaign&quot;).</li>
                    <li>(Optional) Add a description.</li>
                </ol>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Setting up Branding</h2>
                <p className="mb-4">
                    Define your brand identity to ensure consistent content generation.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Go to Project &gt; Branding.</li>
                    <li>Set your primary and secondary colors.</li>
                    <li>Upload your logo.</li>
                    <li>Choose your brand fonts.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Templates & Presets</h2>
                <p className="mb-4">
                    Speed up your workflow by setting up reusable assets.
                </p>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-medium mb-2">Brand Templates</h3>
                        <p className="mb-2">
                            Import designs from Canva to use as starting points for your posts.
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Go to Project &gt; Templates.</li>
                            <li>Click &quot;Create Template&quot;.</li>
                            <li>Select a design from Canva or start from scratch.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-2">Content Presets</h3>
                        <p className="mb-2">
                            Save common AI prompts for captions and image generation.
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Go to Project &gt; Presets.</li>
                            <li>Click &quot;New Preset&quot;.</li>
                            <li>Define your caption tone and image style prompts.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Inviting Team Members</h2>
                <p className="mb-4">
                    Collaborate with your team by inviting them to your workspace.
                </p>
                <p>
                    Go to <strong>Team</strong> in the sidebar and enter their email address. They will receive an invite link.
                </p>
            </section>
        </div>
    );
}
