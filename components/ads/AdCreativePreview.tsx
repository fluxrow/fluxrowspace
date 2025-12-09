import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

interface AdCreativePreviewProps {
    url?: string | null;
}

export default function AdCreativePreview({ url }: AdCreativePreviewProps) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0 aspect-video flex items-center justify-center bg-slate-100">
                {url ? (
                    <img src={url} alt="Creative Preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center text-slate-400">
                        <ImageIcon className="h-10 w-10 mb-2" />
                        <span className="text-sm">No creative selected</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
