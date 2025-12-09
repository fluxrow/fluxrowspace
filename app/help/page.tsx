import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { BookOpen, Zap, Settings } from "lucide-react";

export default function HelpIndexPage() {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">How can we help you?</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Browse our documentation to learn how to get the most out of FluxSpace.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/help/workspace-setup">
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                            <Settings className="h-8 w-8 text-blue-600 mb-2" />
                            <CardTitle>Setup Guide</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Learn how to configure your workspace, invite team members, and set up branding.
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/help/integrations">
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                            <Zap className="h-8 w-8 text-orange-600 mb-2" />
                            <CardTitle>Integrations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Connect OpenAI, Canva, and Meta to supercharge your content workflow.
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/help/approval">
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                            <BookOpen className="h-8 w-8 text-green-600 mb-2" />
                            <CardTitle>Workflows</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Master the content creation wizard, approval flows, and scheduling.
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
