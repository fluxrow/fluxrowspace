import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AdObjectiveSelectProps {
    value?: string;
    onChange?: (value: string) => void;
}

export default function AdObjectiveSelect({ value, onChange }: AdObjectiveSelectProps) {
    return (
        <div className="space-y-2">
            <Label>Objective</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="AWARENESS">Awareness</SelectItem>
                    <SelectItem value="TRAFFIC">Traffic</SelectItem>
                    <SelectItem value="ENGAGEMENT">Engagement</SelectItem>
                    <SelectItem value="LEADS">Leads</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
