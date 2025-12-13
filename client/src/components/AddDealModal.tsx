import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, ArrowRight, Link as LinkIcon, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface AddDealModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddDealModal({ open, onOpenChange }: AddDealModalProps) {
    const [, setLocation] = useLocation();
    const [mode, setMode] = useState<"url" | "text">("url");
    const [input, setInput] = useState("");
    const [isScanning, setIsScanning] = useState(false);

    const ingestMutation = trpc.ingest.parse.useMutation({
        onSuccess: (data) => {
            setIsScanning(false);
            onOpenChange(false);
            toast.success("Deal Drafted Automatically!", {
                description: `Created "${data.metrics.name}"`
            });
            // Redirect to the new deal
            setLocation(`/opportunity/${data.dealId}`);
        },
        onError: (err) => {
            setIsScanning(false);
            toast.error("Ingestion Failed", {
                description: err.message
            });
        }
    });

    const handleIngest = () => {
        if (!input.trim()) return;
        setIsScanning(true);
        // Simulate a "scanning" delay for effect if API is too fast, or just call it.
        // For UX, immediate feedback is better, but the animation is cool.
        ingestMutation.mutate({ content: input, type: mode });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] border-primary/20 bg-background/95 backdrop-blur-xl shadow-2xl shadow-primary/10">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-light">
                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                        Signal Ingestion
                    </DialogTitle>
                    <DialogDescription>
                        Paste a URL or unstructured notes. Our Agent will parse the metrics, classify the asset, and draft the deal.
                    </DialogDescription>
                </DialogHeader>

                {!isScanning ? (
                    <div className="space-y-6 py-4">
                        <Tabs defaultValue="url" onValueChange={(v) => setMode(v as any)} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="url" className="gap-2">
                                    <LinkIcon className="w-4 h-4" /> Import from URL
                                </TabsTrigger>
                                <TabsTrigger value="text" className="gap-2">
                                    <FileText className="w-4 h-4" /> Paste Text / Email
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="url" className="mt-4">
                                <div className="space-y-2">
                                    <Textarea
                                        placeholder="https://www.bizbuysell.com/..."
                                        className="h-32 text-lg font-mono bg-secondary/30 resize-none focus-visible:ring-primary/50"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground text-right">Supported: Zillow, LoopNet, BizBuySell, LinkedIn</p>
                                </div>
                            </TabsContent>
                            <TabsContent value="text" className="mt-4">
                                <div className="space-y-2">
                                    <Textarea
                                        placeholder="Pasted email from broker: 'Off market deal in Atlanta, asking $2M, $400k EBITDA...'"
                                        className="h-32 text-base bg-secondary/30 resize-none"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button size="lg" onClick={handleIngest} disabled={!input} className="gap-2 shadow-lg shadow-primary/20">
                                <Sparkles className="w-4 h-4" />
                                {mode === 'url' ? 'Scan URL' : 'Process Notes'}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                            <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium text-foreground">Analyzing Signal...</h3>
                            <div className="h-2 w-64 bg-secondary rounded-full overflow-hidden mx-auto">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground">Extracting financials, identifying asset class...</p>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
