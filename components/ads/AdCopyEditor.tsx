import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AdCopyEditorProps {
    value?: string | null;
    onChange?: (value: string) => void;
}

export default function AdCopyEditor({ value, onChange }: AdCopyEditorProps) {
    return (
        <div className="space-y-2">
            <Label>Primary Text</Label>
            <Textarea
                placeholder="Enter your ad copy here..."
                className="min-h-[100px]"
                value={value || ""}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </div>
    );
}
