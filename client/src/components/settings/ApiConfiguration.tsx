import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Info, Sparkles, Zap } from "lucide-react";

const apiSettingsSchema = z.object({
    geminiApiMode: z.enum(["beta", "ga"]),
    customPromptTemplate: z.string().optional(),
});

type ApiSettingsFormValues = z.infer<typeof apiSettingsSchema>;

const DEFAULT_PROMPT_TEMPLATE = `You are a business acquisition research assistant. Find businesses for sale that match these criteria:

**Target Sectors:** {{sectors}}
**Target Locations:** {{states}}
**Price Range:** {{priceRange}}
**Minimum Cash Flow:** {{minCashFlow}}

For each business found, provide:
1. Business Name
2. Asking Price
3. Annual Revenue
4. Cash Flow/SDE
5. Location
6. Industry/Sector
7. Brief Description
8. Contact Information (if available)

Format your response as a JSON array of objects with these exact keys:
[
  {
    "name": "Business Name",
    "price": 1500000,
    "revenue": 3000000,
    "cashFlow": 500000,
    "location": "Atlanta, GA",
    "industry": "Service",
    "description": "Brief description...",
    "contactName": "Broker Name",
    "contactType": "Broker"
  }
]`;

export default function ApiConfiguration() {
    const [useBeta, setUseBeta] = useState(true);

    const { data: preferences, isLoading } = trpc.preferences.get.useQuery();
    const updateMutation = trpc.preferences.update.useMutation({
        onSuccess: () => {
            toast.success("API settings saved successfully!");
        },
        onError: (error) => {
            toast.error(`Failed to save settings: ${error.message}`);
        },
    });

    const form = useForm<ApiSettingsFormValues>({
        resolver: zodResolver(apiSettingsSchema),
        defaultValues: {
            geminiApiMode: "beta",
            customPromptTemplate: DEFAULT_PROMPT_TEMPLATE,
        },
    });

    // Load preferences when data arrives
    useEffect(() => {
        if (preferences) {
            const mode = preferences.geminiApiMode || "beta";
            setUseBeta(mode === "beta");
            form.reset({
                geminiApiMode: mode,
                customPromptTemplate: preferences.customPromptTemplate || DEFAULT_PROMPT_TEMPLATE,
            });
        }
    }, [preferences, form]);

    const onSubmit = (data: ApiSettingsFormValues) => {
        updateMutation.mutate(data);
    };

    const handleToggle = (checked: boolean) => {
        setUseBeta(checked);
        form.setValue("geminiApiMode", checked ? "beta" : "ga");
    };

    const resetPrompt = () => {
        form.setValue("customPromptTemplate", DEFAULT_PROMPT_TEMPLATE);
        toast.info("Prompt template reset to default");
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">API Configuration</h2>
                <p className="text-muted-foreground mt-1">
                    Configure how the Market Discovery feature interacts with Google Gemini AI
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* API Mode Selection */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            Gemini API Mode
                        </CardTitle>
                        <CardDescription>
                            Choose between the latest Beta Interactions API or the stable GA API with custom prompts
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="api-mode" className="text-base font-medium">
                                        Use Beta Interactions API
                                    </Label>
                                    {useBeta && (
                                        <Badge variant="secondary" className="text-xs">
                                            <Zap className="w-3 h-3 mr-1" />
                                            Latest
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {useBeta
                                        ? "Advanced reasoning with built-in research capabilities (may be unstable)"
                                        : "Stable API with customizable prompt templates (recommended for production)"}
                                </p>
                            </div>
                            <Switch
                                id="api-mode"
                                checked={useBeta}
                                onCheckedChange={handleToggle}
                            />
                        </div>

                        {/* Beta API Info */}
                        {useBeta && (
                            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-blue-900 dark:text-blue-100">
                                    <p className="font-medium mb-1">About Beta Interactions API</p>
                                    <p>
                                        The Interactions API (deep-research-pro-preview-12-2025) provides advanced reasoning
                                        and autonomous research capabilities. It may take 2-5 minutes per scan and is currently
                                        in preview. If you experience errors, switch to GA mode.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* GA API Custom Prompt */}
                        {!useBeta && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="custom-prompt" className="text-base font-medium">
                                        Custom Prompt Template
                                    </Label>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={resetPrompt}
                                    >
                                        Reset to Default
                                    </Button>
                                </div>
                                <Textarea
                                    id="custom-prompt"
                                    {...form.register("customPromptTemplate")}
                                    rows={16}
                                    className="font-mono text-sm"
                                    placeholder={DEFAULT_PROMPT_TEMPLATE}
                                />
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium mb-1">Available Variables:</p>
                                        <ul className="list-disc list-inside space-y-0.5">
                                            <li><code className="text-xs bg-secondary px-1 py-0.5 rounded">{"{{sectors}}"}</code> - Selected business sectors</li>
                                            <li><code className="text-xs bg-secondary px-1 py-0.5 rounded">{"{{states}}"}</code> - Target states/locations</li>
                                            <li><code className="text-xs bg-secondary px-1 py-0.5 rounded">{"{{priceRange}}"}</code> - Min/max price range</li>
                                            <li><code className="text-xs bg-secondary px-1 py-0.5 rounded">{"{{minCashFlow}}"}</code> - Minimum cash flow requirement</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex items-center justify-end gap-3">
                    <Button
                        type="submit"
                        disabled={updateMutation.isPending || isLoading}
                        className="gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {updateMutation.isPending ? "Saving..." : "Save Settings"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
