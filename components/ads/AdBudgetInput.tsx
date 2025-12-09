import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdBudgetInputProps {
    value?: number | null;
    onChange?: (value: number) => void;
}

export default function AdBudgetInput({ value, onChange }: AdBudgetInputProps) {
    return (
        <div className="space-y-2">
            <Label>Daily Budget</Label>
            <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                    type="number"
                    className="pl-7"
                    placeholder="0.00"
                    value={value || ""}
                    onChange={(e) => onChange?.(parseFloat(e.target.value))}
                />
            </div>
        </div>
    );
}
