import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Badge } from "@/components/ui";
import { AdDraft } from "@/types/ad-drafts";
import Link from "next/link";

interface AdDraftCardProps {
    draft: AdDraft;
    workspaceId: string;
}

export default function AdDraftCard({ draft, workspaceId }: AdDraftCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {draft.name}
                </CardTitle>
                <Badge variant={draft.status === "DRAFT" ? "secondary" : "default"}>
                    {draft.status}
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{draft.objective}</div>
                <p className="text-xs text-muted-foreground">
                    {draft.dailyBudget ? `Budget: $${draft.dailyBudget}/day` : "No budget set"}
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/workspaces/${workspaceId}/ads/drafts/${draft.id}`}>
                        Edit Draft
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
