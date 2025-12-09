"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AdCreativeDraftSchema, AdCreativePlacement } from "@/types/ad-campaign-draft";

interface AdCreativeDraftFormProps {
    workspaceId: string;
    draftId: string;
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export function AdCreativeDraftForm({ workspaceId, draftId, initialData, onSuccess, onCancel }: AdCreativeDraftFormProps) {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof AdCreativeDraftSchema>>({
        resolver: zodResolver(AdCreativeDraftSchema),
        defaultValues: initialData || {
            campaignId: draftId,
            placement: "FEED",
            primaryText: "",
            headline: "",
            description: "",
            callToAction: "LEARN_MORE",
        },
    });

    const onSubmit = async (values: z.infer<typeof AdCreativeDraftSchema>) => {
        setLoading(true);
        try {
            const url = initialData
                ? `/api/ad-campaigns/${workspaceId}/${draftId}/creatives/${initialData.id}`
                : `/api/ad-campaigns/${workspaceId}/${draftId}/creatives`;

            const method = initialData ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error("Failed to save creative");
            }

            onSuccess();
        } catch (error) {
            console.error(error);
            // TODO: Show toast error
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="placement"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Placement</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select placement" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(AdCreativePlacement).map((placement) => (
                                        <SelectItem key={placement} value={placement}>
                                            {placement}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="primaryText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Primary Text</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Ad primary text..." {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="headline"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Headline</FormLabel>
                            <FormControl>
                                <Input placeholder="Ad headline..." {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Link description..." {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="callToAction"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Call To Action</FormLabel>
                            <FormControl>
                                <Input placeholder="LEARN_MORE" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? "Update Creative" : "Add Creative"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
