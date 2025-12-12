import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, TrendingUp, PieChart, Calculator, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

export default function CapitalStack() {
  // Purchase details
  const [purchasePrice, setPurchasePrice] = useState(900000);
  const [closingCosts, setClosingCosts] = useState(25000);

  // Financing structure (percentages)
  const [equityPercent, setEquityPercent] = useState(20);
  const [sellerNotePercent, setSellerNotePercent] = useState(10);
  const [sba7aPercent, setSba7aPercent] = useState(0);
  const [conventionalPercent, setConventionalPercent] = useState(70);

  // Loan terms
  const [sbaRate, setSbaRate] = useState(7.5);
  const [sbaTermYears, setSbaTermYears] = useState(10);
  const [conventionalRate, setConventionalRate] = useState(6.5);
  const [conventionalTermYears, setConventionalTermYears] = useState(15);
  const [sellerNoteRate, setSellerNoteRate] = useState(5.0);
  const [sellerNoteTermYears, setSellerNoteTermYears] = useState(5);

  // Operating assumptions
  const [annualRevenue, setAnnualRevenue] = useState(109425);
  const [annualCashFlow, setAnnualCashFlow] = useState(90000);
  const [revenueGrowthRate, setRevenueGrowthRate] = useState(5);
  const [exitMultiple, setExitMultiple] = useState(4.0);
  const [holdPeriodYears, setHoldPeriodYears] = useState(5);

  // Auto-balance percentages
  useEffect(() => {
    const total = equityPercent + sellerNotePercent + sba7aPercent + conventionalPercent;
    if (Math.abs(total - 100) > 0.01) {
      // Adjust conventional to balance
      const newConventional = 100 - equityPercent - sellerNotePercent - sba7aPercent;
      if (newConventional >= 0 && newConventional <= 100) {
        setConventionalPercent(newConventional);
      }
    }
  }, [equityPercent, sellerNotePercent, sba7aPercent]);

  // Calculate mutation
  const calculateMutation = trpc.capitalStack.calculate.useMutation({
    onError: (error) => {
      toast.error(`Calculation error: ${error.message}`);
    },
  });

  const handleCalculate = () => {
    calculateMutation.mutate({
      purchasePrice,
      closingCosts,
      equityPercent,
      sellerNotePercent,
      sba7aPercent,
      conventionalLoanPercent: conventionalPercent,
      sbaInterestRate: sbaRate,
      sbaTermYears,
      conventionalInterestRate: conventionalRate,
      conventionalTermYears,
      sellerNoteInterestRate: sellerNoteRate,
      sellerNoteTermYears,
      annualRevenue,
      annualCashFlow,
      revenueGrowthRate,
      exitMultiple,
      holdPeriodYears,
    });
  };

  // Auto-calculate on input change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleCalculate();
    }, 500);
    return () => clearTimeout(timer);
  }, [
    purchasePrice,
    closingCosts,
    equityPercent,
    sellerNotePercent,
    sba7aPercent,
    conventionalPercent,
    sbaRate,
    sbaTermYears,
    conventionalRate,
    conventionalTermYears,
    sellerNoteRate,
    sellerNoteTermYears,
    annualRevenue,
    annualCashFlow,
    revenueGrowthRate,
    exitMultiple,
    holdPeriodYears,
  ]);

  const result = calculateMutation.data;
  const totalInvestment = purchasePrice + closingCosts;

  // Stack Visualization Data
  const stackData = [
    { name: 'Equity', value: equityPercent, color: '#10b981' },       // Emerald-500
    { name: 'Seller Note', value: sellerNotePercent, color: '#f59e0b' }, // Amber-500
    { name: 'SBA 7(a)', value: sba7aPercent, color: '#3b82f6' },      // Blue-500
    { name: 'Conventional', value: conventionalPercent, color: '#6366f1' } // Indigo-500
  ].filter(item => item.value > 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation currentPage="/capital-stack" />

      <main className="pt-24 max-w-5xl mx-auto px-4 md:px-6 space-y-8">
        {/* Header Section */}
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-tracking-tight font-bold text-foreground">Capital Stack</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Design your optimal financing structure and visualize returns instantly.
          </p>
        </div>

        {/* Visual Stack & Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Visualizer (Left - 7 cols) */}
          <Card className="md:col-span-7 overflow-hidden border-0 shadow-lg bg-card/50 backdrop-blur-sm ring-1 ring-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Structure Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-16 w-full flex rounded-xl overflow-hidden mb-6 shadow-inner ring-1 ring-black/5 dark:ring-white/5">
                {stackData.map((item) => (
                  <div
                    key={item.name}
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    className="h-full transition-all duration-500 ease-in-out relative group"
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-white font-bold text-xs drop-shadow-md">{item.value.toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stackData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
                      <span className="text-sm font-bold">
                        ${((totalInvestment * item.value / 100) / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Outcome Metrics (Right - 5 cols) */}
          <Card className="md:col-span-5 bg-card border-0 shadow-lg ring-1 ring-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Projected Returns</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Cash-on-Cash</p>
                      <p className="text-4xl font-bold tracking-tighter text-green-600 dark:text-green-400">
                        {result.returns.cashOnCashReturn.toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground font-medium">IRR</p>
                      <p className="text-2xl font-bold text-primary">{result.returns.irr.toFixed(1)}%</p>
                    </div>
                  </div>

                  <Separator className="bg-border/60" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Total Equity</p>
                      <p className="text-lg font-semibold">${(result.capitalStack.equity / 1000).toFixed(1)}K</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold mb-1">DSCR</p>
                      <div className="flex items-center gap-2">
                        <p className={`text-lg font-semibold ${result.returns.dscr >= 1.25 ? 'text-green-600' : result.returns.dscr < 1 ? 'text-red-500' : 'text-yellow-600'}`}>
                          {result.returns.dscr.toFixed(2)}x
                        </p>
                        {result.returns.dscr >= 1.25 ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-yellow-600" />}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center text-muted-foreground animate-pulse">
                  Calculating...
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Configuration Cockpit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Investment & Debt Mix */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Investment Mix
            </h3>
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Purchase Price Input */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label className="text-base">Purchase Price</Label>
                    <span className="font-mono font-medium bg-secondary px-2 py-0.5 rounded text-sm text-foreground">
                      ${(purchasePrice).toLocaleString()}
                    </span>
                  </div>
                  <Input
                    type="range"
                    min={100000}
                    max={5000000}
                    step={5000}
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="accent-primary h-2"
                  />
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <Input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value))}
                      className="col-span-2"
                    />
                    <div className="col-span-1 border rounded-md flex items-center justify-center bg-secondary/30 text-xs text-muted-foreground">
                      + ${(closingCosts / 1000).toFixed(0)}K Close
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Equity Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Equity Contribution</Label>
                    <Badge variant="outline" className="font-mono">{equityPercent}%</Badge>
                  </div>
                  <Slider
                    value={[equityPercent]}
                    onValueChange={([val]) => setEquityPercent(val)}
                    max={100}
                    step={1}
                    className="py-2"
                  />
                </div>

                {/* Seller Note Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Seller Financing</Label>
                    <Badge variant="outline" className="font-mono">{sellerNotePercent}%</Badge>
                  </div>
                  <Slider
                    value={[sellerNotePercent]}
                    onValueChange={([val]) => setSellerNotePercent(val)}
                    max={100}
                    step={1}
                    className="py-2"
                  />
                </div>

                {/* SBA Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>SBA 7(a)</Label>
                    <Badge variant="outline" className="font-mono">{sba7aPercent}%</Badge>
                  </div>
                  <Slider
                    value={[sba7aPercent]}
                    onValueChange={([val]) => setSba7aPercent(val)}
                    max={100}
                    step={1}
                    className="py-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Assumptions */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Performance Assumptions
            </h3>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Annual Revenue</Label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                      <Input
                        type="number"
                        value={annualRevenue}
                        onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cash Flow (SDE)</Label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                      <Input
                        type="number"
                        value={annualCashFlow}
                        onChange={(e) => setAnnualCashFlow(Number(e.target.value))}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Growth & Exit Strategy</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-secondary/30 rounded-lg space-y-2">
                      <div className="text-xs text-muted-foreground uppercase font-bold">Annual Growth</div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={revenueGrowthRate}
                          onChange={(e) => setRevenueGrowthRate(Number(e.target.value))}
                          className="h-8 w-16 text-center"
                        />
                        <span className="text-sm font-medium">%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-secondary/30 rounded-lg space-y-2">
                      <div className="text-xs text-muted-foreground uppercase font-bold">Exit Multiple</div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={exitMultiple}
                          onChange={(e) => setExitMultiple(Number(e.target.value))}
                          className="h-8 w-16 text-center"
                        />
                        <span className="text-sm font-medium">x</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg flex items-start gap-3">
                  <Calculator className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900 dark:text-blue-100">
                    <p className="font-semibold mb-1">AI Insight</p>
                    <p className="opacity-90">
                      Based on your {equityPercent}% equity position, your leverage ratio is healthy.
                      Consider increasing SBA exposure if cash flow allows, to maximize IRRs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </main>
    </div>
  );
}
