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
import Navigation from "@/components/Navigation";

const apiSettingsSchema = z.object({
  aiProvider: z.enum(["manus", "personal"]),
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

export default function ApiSettings() {
  const [useManusTokens, setUseManusTokens] = useState(true);
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
      aiProvider: "manus",
      geminiApiMode: "beta",
      customPromptTemplate: DEFAULT_PROMPT_TEMPLATE,
    },
  });

  // Load preferences when data arrives
  useEffect(() => {
    if (preferences) {
      const provider = preferences.aiProvider || "manus";
      const mode = preferences.geminiApiMode || "beta";
      setUseManusTokens(provider === "manus");
      setUseBeta(mode === "beta");
      form.reset({
        aiProvider: provider,
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
    <div className="min-h-screen bg-background">
      <Navigation currentPage="/settings/api" />
      <main className="pt-20 pb-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">API Configuration</h1>
            <p className="text-muted-foreground mt-2">
              Configure how the Market Discovery feature interacts with Google Gemini AI
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* AI Provider Selection */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Provider
                </CardTitle>
                <CardDescription>
                  Choose between Manus free tokens (1 Trillion campaign) or your personal API keys
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="ai-provider" className="text-base font-medium">
                        Use Manus Free Tokens
                      </Label>
                      {useManusTokens && (
                        <Badge variant="default" className="text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          Free
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {useManusTokens
                        ? "Using Manus Forge API - $0 cost during 1 Trillion Tokens campaign 🎉"
                        : "Using your personal API keys - charges apply from each provider"}
                    </p>
                  </div>
                  <Switch
                    id="ai-provider"
                    checked={useManusTokens}
                    onCheckedChange={(checked) => {
                      setUseManusTokens(checked);
                      form.setValue("aiProvider", checked ? "manus" : "personal");
                    }}
                  />
                </div>

                {/* Manus Free Tokens Info */}
                {useManusTokens && (
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <Info className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-green-900 dark:text-green-100">
                      <p className="font-medium mb-1">🎁 1 Trillion Free Tokens Campaign</p>
                      <p className="mb-2">
                        Your app qualifies for Manus's free AI tokens! All analysis features use the Forge API at no cost.
                        Save $10-30/month per user during the campaign.
                      </p>
                      <p className="text-xs opacity-80">
                        Supported models: GPT-4, Claude Sonnet 4.5, Gemini 2.5 Flash, Perplexity Sonar Pro, Grok Beta
                      </p>
                    </div>
                  </div>
                )}

                {/* Personal Keys Info */}
                {!useManusTokens && (
                  <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-900 dark:text-amber-100">
                      <p className="font-medium mb-1">Using Personal API Keys</p>
                      <p>
                        Analysis will use your configured API keys (OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY, etc.).
                        Charges apply from each provider based on usage.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

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
      </main>
    </div>
  );
}
