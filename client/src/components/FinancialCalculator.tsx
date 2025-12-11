import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Percent, Calendar, Trophy } from "lucide-react";

export default function FinancialCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(907500); // Mid-point of $900-915K
  const [downPayment, setDownPayment] = useState(181500); // 20%
  const [monthlyRent, setMonthlyRent] = useState(12000);
  const [capexBudget, setCapexBudget] = useState(25000);
  const [investorCash, setInvestorCash] = useState(100000);

  // Calculations
  const loanAmount = purchasePrice - downPayment;
  const monthlyPayment = (loanAmount * 0.07) / 12 + (loanAmount * 0.0015); // 7% rate + insurance/tax estimate
  const monthlyExpenses = monthlyPayment + 500; // Add $500 for utilities/maintenance
  const monthlyCashFlow = monthlyRent - monthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const cashOnCash = (annualCashFlow / (downPayment + capexBudget)) * 100;
  const dscr = (monthlyRent * 12) / (monthlyPayment * 12);
  
  // Investor equity calculation
  const totalCashNeeded = downPayment + capexBudget;
  const investorEquityPercent = (investorCash / totalCashNeeded) * 100;
  const investorAnnualReturn = (annualCashFlow * investorEquityPercent) / 100;

  // 5-year projection
  const year5Value = purchasePrice * 1.15; // Conservative 3% annual appreciation
  const year5Equity = year5Value - (loanAmount * 0.85); // Assume 15% principal paydown
  const totalReturn5Year = (year5Equity - totalCashNeeded + (annualCashFlow * 5));
  const annualizedReturn = ((totalReturn5Year / totalCashNeeded) / 5) * 100;

  return (
    <div className="space-y-8">
      {/* Input Controls */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            Investment Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <Label>Purchase Price</Label>
              <span className="text-sm font-mono text-green-400">
                ${purchasePrice.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[purchasePrice]}
              onValueChange={([value]) => setPurchasePrice(value)}
              min={850000}
              max={950000}
              step={5000}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label>Down Payment ({((downPayment / purchasePrice) * 100).toFixed(0)}%)</Label>
              <span className="text-sm font-mono text-green-400">
                ${downPayment.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[downPayment]}
              onValueChange={([value]) => setDownPayment(value)}
              min={50000}
              max={300000}
              step={10000}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label>Monthly Rental Income (All 3 Units)</Label>
              <span className="text-sm font-mono text-green-400">
                ${monthlyRent.toLocaleString()}/mo
              </span>
            </div>
            <Slider
              value={[monthlyRent]}
              onValueChange={([value]) => setMonthlyRent(value)}
              min={9000}
              max={15000}
              step={500}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label>CapEx Budget (Tree + Garage Finish)</Label>
              <span className="text-sm font-mono text-orange-400">
                ${capexBudget.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[capexBudget]}
              onValueChange={([value]) => setCapexBudget(value)}
              min={15000}
              max={40000}
              step={1000}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label>Your Cash Investment</Label>
              <span className="text-sm font-mono text-blue-400">
                ${investorCash.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[investorCash]}
              onValueChange={([value]) => setInvestorCash(value)}
              min={50000}
              max={250000}
              step={10000}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="text-sm text-slate-400 mb-1">Monthly Cash Flow</div>
            <div className="text-3xl font-bold text-green-400">
              ${monthlyCashFlow.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              ${annualCashFlow.toLocaleString()}/year
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="text-sm text-slate-400 mb-1">Cash-on-Cash Return</div>
            <div className="text-3xl font-bold text-blue-400">
              {cashOnCash.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Annual yield on cash invested
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-purple-500/30">
          <CardContent className="p-6">
            <div className="text-sm text-slate-400 mb-1">DSCR</div>
            <div className="text-3xl font-bold text-purple-400">
              {dscr.toFixed(2)}x
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Debt service coverage ratio
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/10 border-orange-500/30">
          <CardContent className="p-6">
            <div className="text-sm text-slate-400 mb-1">Your Equity Stake</div>
            <div className="text-3xl font-bold text-orange-400">
              {investorEquityPercent.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Of total deal
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cap Table */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-blue-400" />
            Capitalization Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <div className="font-semibold">Total Cash Required</div>
                <div className="text-sm text-slate-400">Down Payment + CapEx</div>
              </div>
              <div className="text-2xl font-bold text-white">
                ${totalCashNeeded.toLocaleString()}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-blue-400">Your Investment</div>
                <div className="text-sm text-slate-400">Cash contribution</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-400">
                  ${investorCash.toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">
                  {investorEquityPercent.toFixed(1)}% equity
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-purple-400">Hard Money / Partners</div>
                <div className="text-sm text-slate-400">Gap financing</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-purple-400">
                  ${(totalCashNeeded - investorCash).toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">
                  {(100 - investorEquityPercent).toFixed(1)}% equity
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-green-400">Your Annual Return</div>
                  <div className="text-sm text-slate-400">Based on your equity stake</div>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  ${investorAnnualReturn.toLocaleString()}/yr
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Year Projection */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            5-Year Projection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-slate-400 mb-1">Cumulative Cash Flow</div>
                <div className="text-2xl font-bold text-green-400">
                  ${(annualCashFlow * 5).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Projected Property Value</div>
                <div className="text-2xl font-bold text-blue-400">
                  ${year5Value.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Total Equity Built</div>
                <div className="text-2xl font-bold text-purple-400">
                  ${year5Equity.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold text-white">Total 5-Year Return</div>
                  <div className="text-sm text-slate-400">Cash flow + Equity + Appreciation</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400">
                    ${totalReturn5Year.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-400">
                    {annualizedReturn.toFixed(1)}% annualized
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <div className="font-semibold text-yellow-400 mb-1">World Cup Bonus (2026)</div>
                  <div className="text-sm text-slate-300">
                    Not included in projections: Potential $60K-$90K windfall from 30-day corporate buyout
                    could recover 100% of CapEx + significant portion of down payment in Year 2.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deal Structure Comparison */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Deal Structure Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
              <div className="text-lg font-bold text-blue-400 mb-4">Equity Partner</div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Your Investment</span>
                  <span className="font-semibold">${investorCash.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Equity Stake</span>
                  <span className="font-semibold text-blue-400">{investorEquityPercent.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual Return</span>
                  <span className="font-semibold text-green-400">${investorAnnualReturn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Exit Share</span>
                  <span className="font-semibold text-purple-400">
                    {investorEquityPercent.toFixed(1)}% of sale proceeds
                  </span>
                </div>
              </div>
              <Badge className="mt-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
                Recommended for $50K-$200K investors
              </Badge>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg">
              <div className="text-lg font-bold text-orange-400 mb-4">Hard Money Lender</div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Loan Amount</span>
                  <span className="font-semibold">${investorCash.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Interest Rate</span>
                  <span className="font-semibold text-orange-400">10-12% APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual Return</span>
                  <span className="font-semibold text-green-400">
                    ${(investorCash * 0.11).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Exit Share</span>
                  <span className="font-semibold text-slate-400">
                    Principal + Interest only
                  </span>
                </div>
              </div>
              <Badge className="mt-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
                Fixed return, no equity upside
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
