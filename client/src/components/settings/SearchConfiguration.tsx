import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Search, Filter, Globe, DollarSign, Briefcase, CheckCircle, AlertCircle, Save } from "lucide-react";

// Schema for search configuration
const searchSchema = z.object({
    source: z.enum(["bizbuysell", "all"]),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    minCashFlow: z.number().min(0).optional(),
    sectors: z.array(z.string()),
    locations: z.array(z.string()),
    keywords: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const SECTORS = [
    "Service", "Construction", "Manufacturing", "Retail", "Healthcare",
    "Tech/SaaS", "Hospitality", "Automotive", "Distribution"
];

// const LOCATIONS = [
//     "Atlanta, GA", "Miami, FL", "Austin, TX", "Nashville, TN",
//     "Charlotte, NC", "Phoenix, AZ", "Denver, CO"
// ];

export default function SearchConfiguration() {
    const [jobId, setJobId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"config" | "saved">("config");
    const [thoughts, setThoughts] = useState<string[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [scanStatus, setScanStatus] = useState<"idle" | "running" | "completed" | "failed">("idle");
    const [scanResult, setScanResult] = useState<string | null>(null);

    const form = useForm<SearchFormValues>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            source: "all" as const,
            sectors: [],
            locations: [],
            keywords: "",
        },
    });

    const scanMutation = trpc.market.scan.useMutation({
        onSuccess: (data) => {
            toast.success("Market scan started successfully!");
            console.log("Job ID:", data.jobId);
            setJobId(data.jobId);
            setScanStatus("running");
            setThoughts(["Initializing Gemini Deep Research Agent..."]);
            setProgress(5);
        },
        onError: (error) => {
            toast.error(`Scan failed: ${error.message}`);
            setScanStatus("failed");
        },
    });

    const statusQuery = trpc.market.getScanStatus.useQuery(
        { jobId: jobId! },
        {
            enabled: !!jobId && scanStatus === "running",
            refetchInterval: 10000, // Poll every 10 seconds
        }
    );

    // Watch for status changes
    useEffect(() => {
        if (!statusQuery.data) return;

        const data = statusQuery.data;
        if (data.status === "completed") {
            setScanStatus("completed");
            setProgress(100);
            setScanResult(data.result || "Scan completed successfully");
            toast.success("Market scan completed!");
            setJobId(null); // Stop polling
        } else if (data.status === "failed") {
            setScanStatus("failed");
            setScanResult(data.result || "Unknown error occurred");
            toast.error("Market scan failed");
            setJobId(null);
        } else {
            // Update thoughts and progress
            if (data.thoughts && data.thoughts.length > 0) {
                setThoughts(data.thoughts);
            }
            if (data.progress !== undefined) {
                setProgress(data.progress);
            }
        }
    }, [statusQuery.data]);

    const onSubmit = (data: SearchFormValues) => {
        toast.info("Configuring market scanner...");
        setThoughts([]);
        setProgress(0);
        setScanStatus("idle");
        scanMutation.mutate({
            source: data.source,
            filters: {
                minPrice: data.minPrice,
                maxPrice: data.maxPrice,
                industries: data.sectors,
                states: data.locations, // Mapping locations to states for now
            },
        });
    };

    const handleSectorToggle = (sector: string) => {
        const current = form.getValues("sectors");
        if (current.includes(sector)) {
            form.setValue("sectors", current.filter(s => s !== sector));
        } else {
            form.setValue("sectors", [...current, sector]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Market Discovery</h2>
                    <p className="text-muted-foreground mt-1">
                        Configure your automated search agents and managing scraping parameters.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={activeTab === "config" ? "default" : "outline"}
                        onClick={() => setActiveTab("config")}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Query Builder
                    </Button>
                    <Button
                        variant={activeTab === "saved" ? "default" : "outline"}
                        onClick={() => setActiveTab("saved")}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Saved Searches
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Query Builder */}
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={form.handleSubmit(onSubmit as any)}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" />
                                    Search Parameters
                                </CardTitle>
                                <CardDescription>
                                    Define the criteria for the AI to scout across marketplaces.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Source Selection */}
                                <div className="space-y-3">
                                    <Label>Data Source</Label>
                                    <Select
                                        defaultValue="bizbuysell"
                                        onValueChange={(val) => form.setValue("source", val as any)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select source" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bizbuysell">BizBuySell.com (Primary)</SelectItem>
                                            <SelectItem value="all">Global Aggregation (All Sources)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Financial Range */}
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        Financial Criteria
                                    </Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-xs text-muted-foreground">Min Asking Price ($)</Label>
                                            <Input
                                                type="number"
                                                {...form.register("minPrice", { valueAsNumber: true })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-muted-foreground">Max Asking Price ($)</Label>
                                            <Input
                                                type="number"
                                                {...form.register("maxPrice", { valueAsNumber: true })}
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <Label className="text-xs text-muted-foreground">Min Cash Flow / SDE ($)</Label>
                                            <Input
                                                type="number"
                                                {...form.register("minCashFlow", { valueAsNumber: true })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Sectors */}
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        Target Sectors
                                    </Label>
                                    <div className="flex flex-wrap gap-2">
                                        {SECTORS.map(sector => {
                                            const isSelected = form.watch("sectors").includes(sector);
                                            return (
                                                <Badge
                                                    key={sector}
                                                    variant={isSelected ? "default" : "outline"}
                                                    className="cursor-pointer hover:bg-primary/20 transition-colors py-1 px-3"
                                                    onClick={() => handleSectorToggle(sector)}
                                                >
                                                    {sector}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Keywords */}
                                <div className="space-y-3">
                                    <Label>Keywords (Optional)</Label>
                                    <Input
                                        placeholder="e.g. 'recurring revenue', 'absentee owner', 'SaaS'"
                                        {...form.register("keywords")}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="outline" type="button" onClick={() => form.reset()}>
                                Reset
                            </Button>
                            <Button type="submit" disabled={scanMutation.isPending} className="w-40">
                                {scanMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Scanning...
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-4 h-4 mr-2" />
                                        Start Scan
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Active Agents / Status */}
                <div className="space-y-6">
                    <Card className="bg-secondary/20 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg">Scanner Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                    Active
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Last Scan</span>
                                <span className="text-sm font-medium">12 mins ago</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Deals Found</span>
                                <span className="text-sm font-medium">8 new</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Live Thought Streaming */}
                    {scanStatus === "running" && (
                        <Card className="border-primary/50">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                    Agent Thinking...
                                </CardTitle>
                                <CardDescription>
                                    Gemini Deep Research Agent is analyzing the market
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">{progress}%</span>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Thought Stream */}
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {thoughts.map((thought, i) => (
                                        <div key={i} className="flex items-start gap-2 p-2 bg-secondary/50 rounded text-sm">
                                            <span className="text-primary font-mono text-xs mt-0.5">{i + 1}.</span>
                                            <p className="text-muted-foreground flex-1">{thought}</p>
                                        </div>
                                    ))}
                                    {thoughts.length === 0 && (
                                        <p className="text-sm text-muted-foreground italic">Waiting for agent thoughts...</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Completion State */}
                    {scanStatus === "completed" && scanResult && (
                        <Card className="border-green-500/50">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2 text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                    Scan Complete
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        Deep research completed successfully. Results:
                                    </p>
                                    <div className="p-3 bg-secondary/50 rounded text-sm font-mono max-h-64 overflow-y-auto">
                                        {scanResult}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Error State */}
                    {scanStatus === "failed" && scanResult && (
                        <Card className="border-red-500/50">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2 text-red-600">
                                    <AlertCircle className="w-5 h-5" />
                                    Scan Failed
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        The deep research task encountered an error:
                                    </p>
                                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded text-sm text-red-600">
                                        {scanResult}
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setJobId(null);
                                            setScanStatus("idle");
                                            setScanResult(null);
                                            setThoughts([]);
                                            setProgress(0);
                                        }}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

            </div>
        </div>
    );
}
