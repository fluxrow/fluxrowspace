"use client";

export default function AdsDraftCard({ draft }: { draft: any }) {
    return (
        <div className="border rounded p-4 bg-white shadow-sm">
            <h3 className="font-semibold">{draft.title}</h3>
            <p className="text-sm text-slate-500">{draft.objective}</p>
            <p className="text-xs mt-2 text-slate-400">{draft.status}</p>
        </div>
    );
}
