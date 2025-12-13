import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Maximize2, Minimize2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AgentAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello, I'm your Signal Hunter AI. How can I assist with your deal analysis today?" }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [location, setLocation] = useLocation();

    // Determine context from URL (e.g. /opportunity/123)
    const dealId = location.match(/\/opportunity\/(\d+)/)?.[1]
        ? parseInt(location.match(/\/opportunity\/(\d+)/)![1])
        : undefined;

    const chatMutation = trpc.analysis.chat.useMutation({
        onSuccess: (data) => {
            // Check for navigation commands
            if (data.response.includes("[[NAVIGATE:")) {
                const navMatch = data.response.match(/\[\[NAVIGATE:(.*?)\]\]/);
                if (navMatch && navMatch[1]) {
                    const url = navMatch[1];
                    setLocation(url); // wouter hook
                    // Remove the command from the visible message
                    const cleanResponse = data.response.replace(/\[\[NAVIGATE:.*?\]\]/g, "").trim();
                    if (cleanResponse) {
                        setMessages(prev => [...prev, { role: "assistant", content: cleanResponse }]);
                    }
                    return;
                }
            }
            setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
        },
        onError: (error) => {
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error connecting to the neural network." }]);
        }
    });

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setInput("");

        // CAPTURE INTELLIGENCE: Read the "Spy" signals
        let userSignals = null;
        try {
            const stored = localStorage.getItem("signal_spark_user_intent");
            if (stored) userSignals = JSON.parse(stored);
        } catch (e) {
            // ignore
        }

        chatMutation.mutate({
            message: userMsg,
            dealId: dealId,
            history: messages.map(m => ({ role: m.role, content: m.content })),
            // We need to update the TRPC router to accept this new input, 
            // OR we can hack it into the message history context for now if schema change is too heavy.
            // Let's go with the schema change for robustness, or append to message if we want to be sneaky.
            // For Phase 17 speed, we'll append it to the hidden context in the prompt via a special "System Note" in the Router? 
            // Actually, best way is to send it as a separate field. I need to update `analysis.ts` schema.
            userSignals: userSignals
        } as any); // Casting as any until I update the `analysis.ts` schema below
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto mb-4 w-[350px] md:w-[400px]"
                    >
                        <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur-md overflow-hidden flex flex-col h-[500px]">
                            {/* Header */}
                            <div className="p-3 border-b flex items-center justify-between bg-secondary/30">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <Sparkles className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Agent Assistant</h3>
                                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            Online • {dealId ? `Deal #${dealId} Context` : "General Context"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                                        <Minimize2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-br-none"
                                                : "bg-secondary text-secondary-foreground rounded-bl-none"
                                                }`}
                                        >
                                            {msg.role === "assistant" ? (
                                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                </div>
                                            ) : (
                                                msg.content
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Typing Indicator */}
                                {chatMutation.isPending && (
                                    <div className="flex justify-start">
                                        <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-3 border-t bg-background">
                                <div className="relative">
                                    <Input
                                        placeholder="Ask about this deal..."
                                        className="pr-10"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute right-0 top-0 h-10 w-10 text-muted-foreground hover:text-primary"
                                        onClick={handleSend}
                                        disabled={chatMutation.isPending || !input.trim()}
                                    >
                                        {chatMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                layout
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow border-2 border-white/20"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7" />}
            </motion.button>
        </div>
    );
}
