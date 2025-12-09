"use client";

export function ReviewCaptionBox({ text }: { text: string | null }) {
    return (
        <div>
            <h3 className="text-sm font-semibold text-slate-600 mb-2">
                Texto gerado
            </h3>
            <div className="whitespace-pre-wrap text-slate-700 text-sm border rounded-md p-4 bg-white min-h-[120px]">
                {text || "Nenhum texto gerado ainda."}
            </div>
        </div>
    );
}
