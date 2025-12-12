import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, Sparkles, Zap, ArrowRight, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ScenarioType = "conservative" | "moderate" | "aggressive";

export default function Projections() {
  // Base financials
  const [currentRevenue, setCurrentRevenue] = useState(1000000);
  const [currentProfit, setCurrentProfit] = useState(200000);
  const [currentCashFlow, setCurrentCashFlow] = useState(180000);
  const [currentMargin, setCurrentMargin] = useState(20);

  // Operating assumptions
  const [fixedCosts, setFixedCosts] = useState(200000);
  const [variableCostPercent, setVariableCostPercent] = useState(60);

  // AI optimization toggles
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiAutomationSavings, setAiAutomationSavings] = useState(15);
  const [aiRevenueUplift, setAiRevenueUplift] = useState(10);

  // Tax assumptions
  const [opportunityZone, setOpportunityZone] = useState(false);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(25);

  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>("moderate");

  // Simulate all scenarios
  const simulateMutation = trpc.projections.simulate.useMutation({
    onError: (error) => {
      toast.error(`Simulation error: ${error.message}`);
    },
  });

  const handleSimulate = () => {
    simulateMutation.mutate({
      dealId: 1, // Placeholder
      currentRevenue,
      currentProfit,
      currentCashFlow,
      currentMargin,
      fixedCosts,
      variableCostPercent,
      aiAutomationSavings: aiEnabled ? aiAutomationSavings : 0,
      aiRevenueUplift: aiEnabled ? aiRevenueUplift : 0,
      opportunityZone,
      effectiveTaxRate,
    });
  };

  // Auto-simulate on input change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSimulate();
    }, 500);
    return () => clearTimeout(timer);
  }, [
    currentRevenue,
    currentProfit,
    currentCashFlow,
    currentMargin,
    fixedCosts,
    variableCostPercent,
    aiEnabled,
    aiAutomationSavings,
    aiRevenueUplift,
    opportunityZone,
    effectiveTaxRate,
  ]);

  const result = simulateMutation.data;

  // Prepare chart data
  const chartData = result ? result.scenarios[selectedScenario]?.projections.map((p: any) => ({
    year: `Y${p.year}`,
    revenue: p.revenue / 1000, // Convert to thousands
    profit: p.profit / 1000,
    cashFlow: p.cashFlow / 1000,
  })) : [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation currentPage="/projections" />

      <main className="pt-24 max-w-7xl mx-auto px-4 md:px-6 space-y-8">

        {/* Header & Scenario Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-tracking-tight font-bold text-foreground">Future Value</h1>
            <p className="text-muted-foreground text-lg">
              Model growth, AI impact, and exit scenarios.
            </p>
          </div>
          <div className="bg-secondary/50 p-1 rounded-lg inline-flex">
            {(["conservative", "moderate", "aggressive"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSelectedScenario(s)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${selectedScenario === s ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  } capitalize`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Chart & Big Metrics (Top Left - 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-0 shadow-lg ring-1 ring-border/50 h-[400px] flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Revenue & Cash Flow</CardTitle>
                </div>
                {aiEnabled && (
                  <Badge variant="secondary" className="gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    <Sparkles className="w-3 h-3" />
                    AI Optimized
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="flex-1 min-h-0 pl-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(val: number) => [`$${val.toFixed(0)}k`, '']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                    <Area type="monotone" dataKey="cashFlow" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" name="Cash Flow" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="bg-card/50 ring-1 ring-border/50">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground uppercase">5-Yr Revenue</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {result ? `$${(result.scenarios[selectedScenario].summary.totalRevenue / 1000000).toFixed(1)}M` : "..."}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 ring-1 ring-border/50">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground uppercase">5-Yr Profit</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {result ? `$${(result.scenarios[selectedScenario].summary.totalProfit / 1000000).toFixed(1)}M` : "..."}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 ring-1 ring-border/50">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Exit Value</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {result ? `$${(result.scenarios[selectedScenario].projections[4].revenue * 4 / 1000000).toFixed(1)}M` : "..."}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">@ 4.0x Multiple</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Controls (Right - 4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* AI Lever Card */}
            <Card className={`transition-all duration-500 border-2 ${aiEnabled ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-transparent ring-1 ring-border/50'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className={`w-4 h-4 ${aiEnabled ? 'text-blue-500 fill-blue-500' : 'text-muted-foreground'}`} />
                    AI Optimization
                  </CardTitle>
                  <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
                </div>
                <CardDescription>
                  Simulate the impact of autonomous agents on margins and growth.
                </CardDescription>
              </CardHeader>
              {aiEnabled && (
                <CardContent className="space-y-5 animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <Label>Cost Reduction</Label>
                      <span className="font-mono text-xs bg-secondary px-1.5 py-0.5 rounded">{aiAutomationSavings}%</span>
                    </div>
                    <Slider
                      value={[aiAutomationSavings]}
                      onValueChange={([v]) => setAiAutomationSavings(v)}
                      max={40}
                      step={1}
                      className="[&>.relative>.bg-primary]:bg-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <Label>Revenue Uplift</Label>
                      <span className="font-mono text-xs bg-secondary px-1.5 py-0.5 rounded">+{aiRevenueUplift}%</span>
                    </div>
                    <Slider
                      value={[aiRevenueUplift]}
                      onValueChange={([v]) => setAiRevenueUplift(v)}
                      max={50}
                      step={1}
                      className="[&>.relative>.bg-primary]:bg-blue-500"
                    />
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Base Fundamentals */}
            <Card className="ring-1 ring-border/50 border-0">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Growth Levers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Rev */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase font-bold">Base Revenue</Label>
                  <div className="relative">
                    <DollarSign className="w-3 h-3 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      type="number"
                      value={currentRevenue}
                      onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                      className="pl-8 font-mono"
                    />
                  </div>
                </div>

                {/* Margin Slider */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <Label>Operating Margin</Label>
                    <span className="font-mono text-xs bg-secondary px-1.5 py-0.5 rounded">{currentMargin}%</span>
                  </div>
                  <Slider
                    value={[currentMargin]}
                    onValueChange={([v]) => setCurrentMargin(v)}
                    max={60}
                    step={1}
                  />
                </div>

                {/* Tax Strategy */}
                <div className="pt-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Opportunity Zone</Label>
                    <p className="text-xs text-muted-foreground">Apply tax incentives</p>
                  </div>
                  <Switch checked={opportunityZone} onCheckedChange={setOpportunityZone} />
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </main>
    </div>
  );
}
