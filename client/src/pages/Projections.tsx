import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, PieChart, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

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
  const [aiAutomationSavings, setAiAutomationSavings] = useState(0);
  const [aiRevenueUplift, setAiRevenueUplift] = useState(0);

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
      aiAutomationSavings,
      aiRevenueUplift,
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
    aiAutomationSavings,
    aiRevenueUplift,
    opportunityZone,
    effectiveTaxRate,
  ]);

  const result = simulateMutation.data;

  // Prepare chart data
  const chartData = result ? result.scenarios[selectedScenario]?.projections.map((p: any) => ({
    year: `Year ${p.year}`,
    revenue: p.revenue / 1000, // Convert to thousands
    profit: p.profit / 1000,
    cashFlow: p.cashFlow / 1000,
    margin: p.margin,
  })) : [];

  // Comparison data for all scenarios
  const comparisonData = result ? [1, 2, 3, 4, 5].map(year => ({
    year: `Year ${year}`,
    conservative: result.scenarios.conservative?.projections[year - 1]?.revenue / 1000 || 0,
    moderate: result.scenarios.moderate?.projections[year - 1]?.revenue / 1000 || 0,
    aggressive: result.scenarios.aggressive?.projections[year - 1]?.revenue / 1000 || 0,
  })) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="/projections" />
      <div className="pt-16">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">5-Year Projections</h1>
                <p className="text-muted-foreground mt-1">
                  Model growth scenarios with AI optimization
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">Conservative</Badge>
                <Badge variant="default">Moderate</Badge>
                <Badge variant="outline">Aggressive</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Inputs */}
            <div className="space-y-6">
              {/* Base Financials */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Base Financials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Current Revenue</Label>
                    <Input
                      type="number"
                      value={currentRevenue}
                      onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Current Profit</Label>
                    <Input
                      type="number"
                      value={currentProfit}
                      onChange={(e) => setCurrentProfit(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Current Cash Flow</Label>
                    <Input
                      type="number"
                      value={currentCashFlow}
                      onChange={(e) => setCurrentCashFlow(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Current Margin (%)</Label>
                    <Input
                      type="number"
                      value={currentMargin}
                      onChange={(e) => setCurrentMargin(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Operating Assumptions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Cost Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Fixed Costs</Label>
                    <Input
                      type="number"
                      value={fixedCosts}
                      onChange={(e) => setFixedCosts(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Variable Cost (%)</Label>
                    <Input
                      type="number"
                      value={variableCostPercent}
                      onChange={(e) => setVariableCostPercent(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* AI Optimization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Optimization
                  </CardTitle>
                  <CardDescription>
                    Model automation and revenue uplift impact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Cost Automation Savings (%)</Label>
                    <Input
                      type="number"
                      value={aiAutomationSavings}
                      onChange={(e) => setAiAutomationSavings(Number(e.target.value))}
                      className="mt-1"
                      placeholder="0-100"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      AI-driven reduction in fixed costs
                    </p>
                  </div>
                  <div>
                    <Label>Revenue Uplift (%)</Label>
                    <Input
                      type="number"
                      value={aiRevenueUplift}
                      onChange={(e) => setAiRevenueUplift(Number(e.target.value))}
                      className="mt-1"
                      placeholder="0-100"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      AI-driven revenue growth boost
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax Assumptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="oz-toggle">Opportunity Zone</Label>
                    <Switch
                      id="oz-toggle"
                      checked={opportunityZone}
                      onCheckedChange={setOpportunityZone}
                    />
                  </div>
                  {opportunityZone && (
                    <div className="bg-green-50 p-3 rounded-lg text-sm">
                      <p className="font-semibold text-green-900">OZ Benefits:</p>
                      <ul className="text-green-700 mt-1 space-y-1 text-xs">
                        <li>• Year 5: 10% basis step-up</li>
                        <li>• Year 7: 15% basis step-up</li>
                        <li>• Year 10+: 100% tax-free appreciation</li>
                      </ul>
                    </div>
                  )}
                  <div>
                    <Label>Effective Tax Rate (%)</Label>
                    <Input
                      type="number"
                      value={effectiveTaxRate}
                      onChange={(e) => setEffectiveTaxRate(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Charts and Results */}
            <div className="lg:col-span-2 space-y-6">
              {result && (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    {(["conservative", "moderate", "aggressive"] as const).map((scenario) => {
                      const data = result.scenarios[scenario];
                      return (
                        <Card
                          key={scenario}
                          className={`cursor-pointer transition-all ${selectedScenario === scenario ? "ring-2 ring-primary" : ""
                            }`}
                          onClick={() => setSelectedScenario(scenario)}
                        >
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm capitalize">{scenario}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold">
                              ${(data.summary.finalYearRevenue / 1000).toFixed(0)}K
                            </p>
                            <p className="text-xs text-muted-foreground">Year 5 Revenue</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Scenario Comparison Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Comparison</CardTitle>
                      <CardDescription>All scenarios side-by-side</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis label={{ value: 'Revenue ($K)', angle: -90, position: 'insideLeft' }} />
                          <Tooltip formatter={(value: number) => `$${value.toFixed(0)}K`} />
                          <Legend />
                          <Line type="monotone" dataKey="conservative" stroke="#6b7280" strokeWidth={2} />
                          <Line type="monotone" dataKey="moderate" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="aggressive" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Selected Scenario Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="capitalize">{selectedScenario} Scenario</CardTitle>
                      <CardDescription>Detailed 5-year projections</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="revenue">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="revenue">Revenue</TabsTrigger>
                          <TabsTrigger value="profit">Profit</TabsTrigger>
                          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
                        </TabsList>

                        <TabsContent value="revenue" className="mt-4">
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis label={{ value: 'Revenue ($K)', angle: -90, position: 'insideLeft' }} />
                              <Tooltip formatter={(value: number) => `$${value.toFixed(0)}K`} />
                              <Bar dataKey="revenue" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </TabsContent>

                        <TabsContent value="profit" className="mt-4">
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis label={{ value: 'Profit ($K)', angle: -90, position: 'insideLeft' }} />
                              <Tooltip formatter={(value: number) => `$${value.toFixed(0)}K`} />
                              <Bar dataKey="profit" fill="#10b981" />
                            </BarChart>
                          </ResponsiveContainer>
                        </TabsContent>

                        <TabsContent value="cashflow" className="mt-4">
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis label={{ value: 'Cash Flow ($K)', angle: -90, position: 'insideLeft' }} />
                              <Tooltip formatter={(value: number) => `$${value.toFixed(0)}K`} />
                              <Line type="monotone" dataKey="cashFlow" stroke="#8b5cf6" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  {/* Summary Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Summary Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Revenue (5yr)</p>
                          <p className="text-xl font-bold">
                            ${(result.scenarios[selectedScenario].summary.totalRevenue / 1000000).toFixed(2)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Profit (5yr)</p>
                          <p className="text-xl font-bold">
                            ${(result.scenarios[selectedScenario].summary.totalProfit / 1000000).toFixed(2)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Cash Flow (5yr)</p>
                          <p className="text-xl font-bold">
                            ${(result.scenarios[selectedScenario].summary.totalCashFlow / 1000000).toFixed(2)}M
                          </p>
                        </div>
                        {opportunityZone && result.scenarios[selectedScenario].summary.totalTaxSavings > 0 && (
                          <div>
                            <p className="text-sm text-muted-foreground">OZ Tax Savings</p>
                            <p className="text-xl font-bold text-green-600">
                              ${(result.scenarios[selectedScenario].summary.totalTaxSavings / 1000).toFixed(0)}K
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {!result && simulateMutation.isPending && (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">Running simulations...</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
