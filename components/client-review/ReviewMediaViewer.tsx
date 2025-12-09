"use client";
import Image from "next/image";

export function ReviewMediaViewer({ media }: { media: any[] }) {
    return (
        <div className="bg-slate-100 p-4 rounded-md min-h-[280px] flex items-center justify-center">
            {media && media.length > 0 ? (
                <Image
                    src={media[0].url}
                    alt="Content Asset"
                    width={500}
                    height={500}
                    className="max-w-full max-h-[340px] rounded-md shadow object-contain"
                />
            ) : (
                <div className="text-slate-400">Nenhuma mídia disponível</div>
            )}
        </div>
    );
}
