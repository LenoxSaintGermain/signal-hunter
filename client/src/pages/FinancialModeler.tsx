import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "../components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calculator, Download, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Save } from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    Legend
} from "recharts";

export default function FinancialModeler() {
    const [downPayment, setDownPayment] = useState(400000); // Default 20%
    const [purchasePrice, setPurchasePrice] = useState(2000000);
    const [revenue, setRevenue] = useState(500000);
    const [growthRate, setGrowthRate] = useState(5);
    const [expenseRatio, setExpenseRatio] = useState(40);
    const [capRate, setCapRate] = useState(7);
    const [holdingPeriod, setHoldingPeriod] = useState(5);

    // "SUSS OUT" ENGINE: Spy on user intent
    useEffect(() => {
        const timer = setTimeout(() => {
            // 1. Calculate Persona Signals
            const leverageRatio = (purchasePrice - downPayment) / purchasePrice;
            const isCashHeavy = leverageRatio < 0.5;
            const isAggressive = growthRate > 10;

            // 2. Define Profiles
            const financialProfile = isCashHeavy ? "Cash Heavy Investor" : "Leverage Optimizer";
            const riskProfile = isAggressive ? "Aggressive Growth" : "Conservative/Stable";

            // 3. Save to "Deep Storage" (Local for now, DB later)
            const signals = {
                inferredBudget: purchasePrice,
                preferredDownPayment: downPayment,
                riskProfile: riskProfile,
                investorType: financialProfile,
                lastActive: new Date().toISOString()
            };

            localStorage.setItem("signal_spark_user_intent", JSON.stringify(signals));
            console.log("🕵️‍♂️ Signal Spark Intelligence Captured:", signals);

        }, 1500); // 1.5s debounce - only capture "settled" thoughts

        return () => clearTimeout(timer);
    }, [purchasePrice, downPayment, growthRate]);

    // Calculate Projections
    const generateProjections = () => {
        const data = [];
        let currentRevenue = revenue;

        for (let year = 1; year <= holdingPeriod; year++) {
            const expenses = currentRevenue * (expenseRatio / 100);
            const noi = currentRevenue - expenses;
            const value = noi / (capRate / 100);

            // Debt Service (Mock: 7% Interest, 25yr Amortization on Loan Amount)
            const loanAmount = purchasePrice - downPayment;
            const monthlyRate = 0.07 / 12;
            const numPayments = 25 * 12;
            const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
            const anualDebtService = monthlyPayment * 12;
            const cashFlow = noi - anualDebtService;

            data.push({
                year: `Year ${year}`,
                revenue: Math.round(currentRevenue),
                expenses: Math.round(expenses),
                noi: Math.round(noi),
                value: Math.round(value),
                cashFlow: Math.round(cashFlow)
            });

            currentRevenue = currentRevenue * (1 + growthRate / 100);
        }
        return data;
    };

    const projections = generateProjections();
    const exitValue = projections[projections.length - 1].value;
    const totalCashFlow = projections.reduce((sum, p) => sum + p.cashFlow, 0);
    const totalReturn = (exitValue - purchasePrice) + totalCashFlow;
    const roi = (totalReturn / downPayment) * 100; // Return on Equity

    // Gamification Badges
    const leverage = ((purchasePrice - downPayment) / purchasePrice) * 100;
    let badgeType = "Standard";
    if (leverage < 20) badgeType = "Cash King 👑";
    else if (leverage > 80) badgeType = "Leverage Lover 🚀";

    let growthBadge = "Conservative";
    if (growthRate > 8) growthBadge = "Growth Hacker 📈";
    if (growthRate > 15) growthBadge = "Moonshot 🌕";

    const saveMutation = trpc.projections.save.useMutation({
        onSuccess: () => {
            toast.success("Scenario saved to your portfolio!");
        },
        onError: (err) => {
            toast.error("Failed to save scenario: " + err.message);
        }
    });

    const handleSave = () => {
        const results = generateProjections();
        const lastYear = results[results.length - 1];

        saveMutation.mutate({
            name: `Scenario ${new Date().toLocaleDateString()} - ${riskProfile}`,
            assumptions: {
                dealId: 0, // 0 for scratchpad
                scenarioType: isAggressive ? "aggressive" : isCashHeavy ? "conservative" : "moderate",
                currentRevenue: revenue,
                currentProfit: revenue * (1 - expenseRatio / 100), // Approximate
                currentCashFlow: revenue * (1 - expenseRatio / 100) * 0.9,
                currentMargin: 100 - expenseRatio,
                revenueGrowthRate: growthRate,
                marginImprovement: 0,
                fixedCosts: 0,
                variableCostPercent: expenseRatio,
                aiAutomationSavings: 0,
                aiRevenueUplift: 0,
                opportunityZone: false,
                effectiveTaxRate: 25
            },
            results: results.map((r, i) => ({
                year: i + 1,
                revenue: r.revenue,
                profit: r.noi, // Approximation for this scratchpad view
                cashFlow: r.cashFlow,
                margin: r.revenue > 0 ? (r.noi / r.revenue) * 100 : 0,
                taxSavings: 0
            }))
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background">
            <Navigation currentPage="/financial-modeler" />

            <main className="container mx-auto px-4 pt-24 pb-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="mb-2 -ml-2 text-muted-foreground">
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Calculator className="w-8 h-8 text-primary" />
                            Advanced Financial Modeler
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Construct distinct 5-year pro formas and stress test your assumptions.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleSave} disabled={saveMutation.isPending}>
                            <Save className="w-4 h-4 mr-2" />
                            {saveMutation.isPending ? "Saving..." : "Save Scenario"}
                        </Button>
                        <Button>
                            <Download className="w-4 h-4 mr-2" />
                            Export PDF Report
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls Panel */}
                    <Card className="p-6 h-fit lg:col-span-1 space-y-8">
                        <div>
                            <h3 className="font-semibold mb-4">Deal Assumptions</h3>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Purchase Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input
                                            type="number"
                                            value={purchasePrice}
                                            onChange={(e) => setPurchasePrice(Number(e.target.value))}
                                            className="pl-7"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Year 1 Revenue</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input
                                            type="number"
                                            value={revenue}
                                            onChange={(e) => setRevenue(Number(e.target.value))}
                                            className="pl-7"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Label>Down Payment ({Math.round((downPayment / purchasePrice) * 100)}%)</Label>
                                        <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full animate-in fade-in zoom-in">
                                            {badgeType}
                                        </div>
                                    </div>
                                    <Slider
                                        value={[downPayment]}
                                        onValueChange={(val) => setDownPayment(val[0])}
                                        min={0}
                                        max={purchasePrice}
                                        step={10000}
                                    />
                                    <div className="text-right text-sm font-mono text-muted-foreground">
                                        ${downPayment.toLocaleString()}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <Label>Annual Growth Rate</Label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-muted-foreground">{growthBadge}</span>
                                            <span className="text-sm font-medium text-primary">{growthRate}%</span>
                                        </div>
                                    </div>
                                    <Slider
                                        value={[growthRate]}
                                        onValueChange={(val) => setGrowthRate(val[0])}
                                        min={0}
                                        max={20}
                                        step={0.5}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <Label>Expense Ratio</Label>
                                        <span className="text-sm font-medium text-destructive">{expenseRatio}%</span>
                                    </div>
                                    <Slider
                                        value={[expenseRatio]}
                                        onValueChange={(val) => setExpenseRatio(val[0])}
                                        min={10}
                                        max={80}
                                        step={1}
                                    />
                                    <p className="text-xs text-muted-foreground">Typical range: 35-50% for commercial assets.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <Label>Exit Cap Rate</Label>
                                        <span className="text-sm font-medium text-primary">{capRate}%</span>
                                    </div>
                                    <Slider
                                        value={[capRate]}
                                        onValueChange={(val) => setCapRate(val[0])}
                                        min={3}
                                        max={12}
                                        step={0.25}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-secondary/30 p-3 rounded-lg">
                                    <div className="text-xs text-muted-foreground uppercase">Projected ROI</div>
                                    <div className="text-2xl font-bold text-green-600">+{roi.toFixed(1)}%</div>
                                </div>
                                <div className="bg-secondary/30 p-3 rounded-lg">
                                    <div className="text-xs text-muted-foreground uppercase">Exit Value</div>
                                    <div className="text-2xl font-bold text-primary">${(exitValue / 1000000).toFixed(1)}M</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Visualization Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-6">
                            <Tabs defaultValue="cashflow">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-lg">Financial Performance</h3>
                                    <TabsList>
                                        <TabsTrigger value="cashflow">NOI Growth</TabsTrigger>
                                        <TabsTrigger value="value">Asset Value</TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="cashflow" className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={projections}>
                                            <defs>
                                                <linearGradient id="colorNoi" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorCf" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="year" />
                                            <YAxis tickFormatter={(val) => `$${val / 1000}k`} />
                                            <Tooltip formatter={(val: number) => `$${val.toLocaleString()}`} />
                                            <Area type="monotone" dataKey="noi" stroke="#3b82f6" fillOpacity={1} fill="url(#colorNoi)" name="Net Operating Income" />
                                            <Area type="monotone" dataKey="cashFlow" stroke="#10b981" fillOpacity={1} fill="url(#colorCf)" name="Cash Flow (Post Debt)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </TabsContent>

                                <TabsContent value="value" className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={projections}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="year" />
                                            <YAxis tickFormatter={(val) => `$${val / 1000000}M`} />
                                            <Tooltip formatter={(val: number) => `$${val.toLocaleString()}`} />
                                            <Bar dataKey="value" fill="#8b5cf6" name="Projected Asset Value" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </TabsContent>
                            </Tabs>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Sensitivity Matrix: Exit Value vs Cap Rate
                            </h3>
                            <div className="grid grid-cols-5 gap-2 text-center text-sm">
                                <div className="col-span-1 text-muted-foreground font-medium py-2">Exit Cap</div>
                                {[capRate - 1, capRate - 0.5, capRate, capRate + 0.5, capRate + 1].map(rate => (
                                    <div key={rate} className={`font-medium py-2 ${rate === capRate ? 'bg-primary/10 rounded' : ''}`}>
                                        {rate.toFixed(2)}%
                                    </div>
                                ))}

                                <div className="col-span-1 text-muted-foreground font-medium py-2 border-t">Value</div>
                                {[capRate - 1, capRate - 0.5, capRate, capRate + 0.5, capRate + 1].map(rate => {
                                    const val = projections[holdingPeriod - 1].noi / (rate / 100);
                                    return (
                                        <div key={rate} className={`py-2 border-t ${rate === capRate ? 'bg-primary/10 rounded font-bold text-primary' : ''}`}>
                                            ${(val / 1000000).toFixed(1)}M
                                        </div>
                                    )
                                })}
                            </div>
                        </Card>
                    </div>
                </div>
            </main >
        </div >
    );
}
