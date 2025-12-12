import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, TrendingUp, PieChart, Calculator } from "lucide-react";
import { toast } from "sonner";

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
  const totalPercent = equityPercent + sellerNotePercent + sba7aPercent + conventionalPercent;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Capital Stack Calculator</h1>
              <p className="text-muted-foreground mt-1">
                Model financing scenarios and calculate returns
              </p>
            </div>
            <Badge variant={Math.abs(totalPercent - 100) < 0.01 ? "default" : "destructive"}>
              Total: {totalPercent.toFixed(1)}%
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            {/* Purchase Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Purchase Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Purchase Price</Label>
                  <Input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Closing Costs</Label>
                  <Input
                    type="number"
                    value={closingCosts}
                    onChange={(e) => setClosingCosts(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                  <p className="text-2xl font-bold">${((purchasePrice + closingCosts) / 1000).toFixed(0)}K</p>
                </div>
              </CardContent>
            </Card>

            {/* Financing Structure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Financing Structure
                </CardTitle>
                <CardDescription>
                  Adjust percentages to model different scenarios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Equity</Label>
                    <span className="text-sm font-semibold">{equityPercent}%</span>
                  </div>
                  <Slider
                    value={[equityPercent]}
                    onValueChange={([value]) => setEquityPercent(value)}
                    max={100}
                    step={1}
                    className="mb-1"
                  />
                  <p className="text-xs text-muted-foreground">
                    ${((purchasePrice + closingCosts) * equityPercent / 100 / 1000).toFixed(0)}K
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Seller Note</Label>
                    <span className="text-sm font-semibold">{sellerNotePercent}%</span>
                  </div>
                  <Slider
                    value={[sellerNotePercent]}
                    onValueChange={([value]) => setSellerNotePercent(value)}
                    max={100}
                    step={1}
                    className="mb-1"
                  />
                  <p className="text-xs text-muted-foreground">
                    ${((purchasePrice + closingCosts) * sellerNotePercent / 100 / 1000).toFixed(0)}K @ {sellerNoteRate}% for {sellerNoteTermYears}yr
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>SBA 7(a) Loan</Label>
                    <span className="text-sm font-semibold">{sba7aPercent}%</span>
                  </div>
                  <Slider
                    value={[sba7aPercent]}
                    onValueChange={([value]) => setSba7aPercent(value)}
                    max={100}
                    step={1}
                    className="mb-1"
                  />
                  <p className="text-xs text-muted-foreground">
                    ${((purchasePrice + closingCosts) * sba7aPercent / 100 / 1000).toFixed(0)}K @ {sbaRate}% for {sbaTermYears}yr
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Conventional Loan</Label>
                    <span className="text-sm font-semibold">{conventionalPercent.toFixed(1)}%</span>
                  </div>
                  <Slider
                    value={[conventionalPercent]}
                    onValueChange={([value]) => setConventionalPercent(value)}
                    max={100}
                    step={1}
                    className="mb-1"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    ${((purchasePrice + closingCosts) * conventionalPercent / 100 / 1000).toFixed(0)}K @ {conventionalRate}% for {conventionalTermYears}yr (auto-balanced)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Operating Assumptions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Operating Assumptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Annual Revenue</Label>
                    <Input
                      type="number"
                      value={annualRevenue}
                      onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Annual Cash Flow</Label>
                    <Input
                      type="number"
                      value={annualCashFlow}
                      onChange={(e) => setAnnualCashFlow(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Growth Rate (%)</Label>
                    <Input
                      type="number"
                      value={revenueGrowthRate}
                      onChange={(e) => setRevenueGrowthRate(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Exit Multiple</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={exitMultiple}
                      onChange={(e) => setExitMultiple(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Hold Period (years)</Label>
                  <Input
                    type="number"
                    value={holdPeriodYears}
                    onChange={(e) => setHoldPeriodYears(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Results */}
          <div className="space-y-6">
            {result && (
              <>
                {/* Capital Stack Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Capital Stack Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Equity</span>
                      <span className="font-semibold">${(result.capitalStack.equity / 1000).toFixed(0)}K</span>
                    </div>
                    {result.capitalStack.sellerNote > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Seller Note</span>
                        <span className="font-semibold">${(result.capitalStack.sellerNote / 1000).toFixed(0)}K</span>
                      </div>
                    )}
                    {result.capitalStack.sba7a > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm">SBA 7(a)</span>
                        <span className="font-semibold">${(result.capitalStack.sba7a / 1000).toFixed(0)}K</span>
                      </div>
                    )}
                    {result.capitalStack.conventional > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Conventional</span>
                        <span className="font-semibold">${(result.capitalStack.conventional / 1000).toFixed(0)}K</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Investment</span>
                      <span className="text-lg font-bold">${(result.capitalStack.totalInvestment / 1000).toFixed(0)}K</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Debt Service */}
                <Card>
                  <CardHeader>
                    <CardTitle>Debt Service</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monthly Payment</span>
                      <span className="font-semibold">${result.debtService.totalMonthly.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Annual Payment</span>
                      <span className="font-semibold">${(result.debtService.totalAnnual / 1000).toFixed(0)}K</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Returns */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Return Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Cash-on-Cash Return</p>
                      <p className="text-3xl font-bold text-green-600">
                        {result.returns.cashOnCashReturn.toFixed(1)}%
                      </p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">IRR</p>
                        <p className="text-xl font-semibold">{result.returns.irr.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Equity Multiple</p>
                        <p className="text-xl font-semibold">{result.returns.equityMultiple.toFixed(2)}x</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">DSCR</p>
                      <p className="text-xl font-semibold">
                        {result.returns.dscr.toFixed(2)}x
                        {result.returns.dscr >= 1.25 && (
                          <Badge variant="default" className="ml-2">Strong</Badge>
                        )}
                        {result.returns.dscr < 1.25 && result.returns.dscr >= 1.0 && (
                          <Badge variant="secondary" className="ml-2">Acceptable</Badge>
                        )}
                        {result.returns.dscr < 1.0 && (
                          <Badge variant="destructive" className="ml-2">Weak</Badge>
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Cash Flow */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cash Flow Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Annual Cash Flow</span>
                      <span className="font-semibold">${(result.cashFlow.annualCashFlow / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Annual Debt Service</span>
                      <span className="font-semibold">${(result.cashFlow.annualDebtService / 1000).toFixed(0)}K</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Cash Flow After Debt</span>
                      <span className={`text-lg font-bold ${result.cashFlow.annualCashFlowAfterDebt > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${(result.cashFlow.annualCashFlowAfterDebt / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">Break-even</span>
                      <span className="text-sm font-semibold">{result.cashFlow.monthsToBreakEven} months</span>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {!result && calculateMutation.isPending && (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">Calculating...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
