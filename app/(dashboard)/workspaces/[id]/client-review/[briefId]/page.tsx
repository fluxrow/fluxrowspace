import { DynamicReviewHistory } from "../components";

interface Props {
    params: { workspaceId: string; briefId: string };
}

export default async function ClientReviewDetailPage({ params }: Props) {
    const { workspaceId, briefId } = params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/client-review/${workspaceId}/${briefId}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        return <div className="p-6 text-center">Erro ao carregar o brief.</div>;
    }

    const data = await res.json();

    return (
        <DynamicReviewHistory
            workspaceId={workspaceId}
            briefId={briefId}
            initialHistory={data.history}
        />
    );
}
