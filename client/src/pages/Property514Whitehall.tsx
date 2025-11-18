import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  MapPin,
  Trophy,
  TrendingUp,
  Calendar,
  Users,
  Building2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Download,
} from "lucide-react";
import { Link } from "wouter";
import { PropertyMap } from "@/components/PropertyMap";
import AIAssistant from "@/components/AIAssistant";
import { generatePropertyPDF, PropertyData } from "@/utils/pdfGenerator";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Property514Whitehall() {
  // Calculator state
  const [purchasePrice, setPurchasePrice] = useState(200000);
  const [downPayment, setDownPayment] = useState(25);
  const [interestRate, setInterestRate] = useState(10);
  const [holdPeriod, setHoldPeriod] = useState(10);
  const [scenario, setScenario] = useState<"parking" | "flexstack">("flexstack");

  // Calculated values
  const downPaymentAmount = purchasePrice * (downPayment / 100);
  const loanAmount = purchasePrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = holdPeriod * 12;
  const monthlyPayment =
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const annualDebtService = monthlyPayment * 12;

  // Revenue scenarios
  const parkingRevenue = 92000;
  const eventSpaceRevenue = 210000;
  const airbnbRevenue = 17000;
  const flexStackRevenue = parkingRevenue + eventSpaceRevenue + airbnbRevenue;

  const selectedRevenue = scenario === "parking" ? parkingRevenue : flexStackRevenue;
  const propertyTax = purchasePrice * 0.0157; // Fulton County rate
  const insurance = 5000;
  const maintenance = scenario === "parking" ? 10000 : 35000;
  const totalExpenses = annualDebtService + propertyTax + insurance + maintenance;
  const noi = selectedRevenue - (propertyTax + insurance + maintenance);
  const cashFlow = noi - annualDebtService;
  const cashOnCashReturn = (cashFlow / downPaymentAmount) * 100;

  // Opportunity Zone savings
  const ozSavings10Year = 386000;
  const ozSavingsWithTAD = 543000;

  // 10-year projection
  const projectionData = Array.from({ length: holdPeriod }, (_, i) => {
    const year = i + 1;
    const yearlyRevenue = selectedRevenue * Math.pow(1.03, i);
    const yearlyExpenses = totalExpenses * Math.pow(1.02, i);
    const yearlyCashFlow = yearlyRevenue - yearlyExpenses;
    return {
      year: `Year ${year}`,
      revenue: Math.round(yearlyRevenue),
      expenses: Math.round(yearlyExpenses),
      cashFlow: Math.round(yearlyCashFlow),
    };
  });

  // Revenue breakdown
  const revenueBreakdown = scenario === "flexstack" ? [
    { name: "Parking", value: parkingRevenue, color: "#3b82f6" },
    { name: "Event Space", value: eventSpaceRevenue, color: "#8b5cf6" },
    { name: "Airbnb", value: airbnbRevenue, color: "#ec4899" },
  ] : [
    { name: "Parking", value: parkingRevenue, color: "#3b82f6" },
  ];  const handleDownloadPDF = async () => {
    const propertyData: PropertyData = {
      name: "514 Whitehall St SW",
      price: purchasePrice,
      size: 11500,
      acres: 0.26,
      distance: 1.0,
      parkingSpaces: scenario === "flexstack" ? 50 : 50,
      totalInvestment: scenario === "flexstack" ? 2000000 : purchasePrice + 50000,
      downPayment: downPaymentAmount,
      loanAmount,
      interestRate,
      year1Revenue: scenario === "flexstack" ? 620000 : 298000,
      year1Expenses: scenario === "flexstack" ? 186000 : 89400,
      year1NOI: scenario === "flexstack" ? 434000 : 208600,
      annualDebtService: monthlyPayment * 12,
      year1CashFlow: (scenario === "flexstack" ? 434000 : 208600) - monthlyPayment * 12,
      cashOnCashReturn: scenario === "flexstack" ? 95.5 : 59.7,
      irr: scenario === "flexstack" ? 42.7 : 28.3,
      exitValue: scenario === "flexstack" ? 8680000 : 3130000,
      ozTaxSavings: scenario === "flexstack" ? 543000 : 260000,
      fifaRevenue: scenario === "flexstack" ? 156000 : 78000,
    };
    
    await generatePropertyPDF(propertyData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <AIAssistant propertyContext={{ name: "514 Whitehall St SW", price: purchasePrice, location: "Atlanta, GA - 1.0 mile from Mercedes-Benz Stadium" }} />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
              <Trophy className="w-4 h-4" />
              Prime Stadium-Adjacent Opportunity
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              514 Whitehall St SW
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              11,500 sq ft lot, 1.0 mile from Mercedes-Benz Stadium.
              <span className="text-blue-400"> Transform into a revenue-generating asset.</span>
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                <DollarSign className="w-8 h-8 text-blue-400 mb-2" />
                <div className="text-3xl font-bold">${(purchasePrice / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-400">Asking Price</div>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                <MapPin className="w-8 h-8 text-purple-400 mb-2" />
                <div className="text-3xl font-bold">11,500</div>
                <div className="text-sm text-gray-400">Sq Ft Lot</div>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                <Building2 className="w-8 h-8 text-pink-400 mb-2" />
                <div className="text-3xl font-bold">1.0 mi</div>
                <div className="text-sm text-gray-400">To Stadium</div>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
                <div className="text-3xl font-bold">{cashOnCashReturn.toFixed(0)}%</div>
                <div className="text-sm text-gray-400">Cash-on-Cash</div>
              </Card>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Investment Calculator
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Download Pro Forma
              </Button>
              <Link href="/property/comparison">
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                  Compare Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* The Opportunity */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">The Opportunity</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 p-8">
              <Trophy className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">FIFA 2026 Catalyst</h3>
              <p className="text-gray-300">
                Generate $40K-$60K during the 30-day FIFA World Cup tournament with premium parking and fan experiences
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 p-8">
              <CheckCircle2 className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Opportunity Zone</h3>
              <p className="text-gray-300">
                Defer and reduce capital gains taxes. Save ${(ozSavingsWithTAD / 1000).toFixed(0)}K over 10 years with OZ + TAD benefits
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20 p-8">
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Flex-Stack Design</h3>
              <p className="text-gray-300">
                Triple revenue streams: parking + event space + Airbnb. ${(flexStackRevenue / 1000).toFixed(0)}K annual revenue potential
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Investment Calculator */}
      <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Investment Calculator</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Adjust the variables below to model your investment scenario
          </p>

          <Tabs defaultValue="financing" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="financing">Financing</TabsTrigger>
              <TabsTrigger value="scenario">Scenario</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="financing" className="space-y-8">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-lg font-medium">Purchase Price</label>
                      <span className="text-xl font-bold text-blue-400">
                        ${(purchasePrice / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <Slider
                      value={[purchasePrice]}
                      onValueChange={([value]) => setPurchasePrice(value)}
                      min={150000}
                      max={300000}
                      step={10000}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-lg font-medium">Down Payment</label>
                      <span className="text-xl font-bold text-blue-400">{downPayment}%</span>
                    </div>
                    <Slider
                      value={[downPayment]}
                      onValueChange={([value]) => setDownPayment(value)}
                      min={10}
                      max={50}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-lg font-medium">Interest Rate</label>
                      <span className="text-xl font-bold text-blue-400">{interestRate}%</span>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={([value]) => setInterestRate(value)}
                      min={5}
                      max={15}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-lg font-medium">Hold Period</label>
                      <span className="text-xl font-bold text-blue-400">{holdPeriod} years</span>
                    </div>
                    <Slider
                      value={[holdPeriod]}
                      onValueChange={([value]) => setHoldPeriod(value)}
                      min={1}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 pt-4">
                    <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-sm text-gray-400 mb-1">Down Payment</div>
                      <div className="text-2xl font-bold">${(downPaymentAmount / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                      <div className="text-sm text-gray-400 mb-1">Loan Amount</div>
                      <div className="text-2xl font-bold">${(loanAmount / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="bg-pink-500/10 rounded-lg p-4 border border-pink-500/20">
                      <div className="text-sm text-gray-400 mb-1">Monthly Payment</div>
                      <div className="text-2xl font-bold">${monthlyPayment.toFixed(0)}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="scenario" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card
                  className={`cursor-pointer transition-all ${
                    scenario === "parking"
                      ? "bg-blue-500/20 border-blue-500"
                      : "bg-white/5 border-white/10"
                  } p-8`}
                  onClick={() => setScenario("parking")}
                >
                  <h3 className="text-2xl font-bold mb-4">Basic Parking Lot</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Annual Revenue:</span>
                      <span className="font-bold">${(parkingRevenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Construction Cost:</span>
                      <span className="font-bold">$50K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Build Time:</span>
                      <span className="font-bold">2-3 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parking Spaces:</span>
                      <span className="font-bold">50 spaces</span>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${
                    scenario === "flexstack"
                      ? "bg-purple-500/20 border-purple-500"
                      : "bg-white/5 border-white/10"
                  } p-8`}
                  onClick={() => setScenario("flexstack")}
                >
                  <h3 className="text-2xl font-bold mb-4">Flex-Stack Development</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Annual Revenue:</span>
                      <span className="font-bold">${(flexStackRevenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Construction Cost:</span>
                      <span className="font-bold">$1.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Build Time:</span>
                      <span className="font-bold">6-8 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Streams:</span>
                      <span className="font-bold">3 (Parking + Event + Airbnb)</span>
                    </div>
                  </div>
                </Card>
              </div>

              {scenario === "flexstack" && (
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
                  <h3 className="text-2xl font-bold mb-6">Revenue Breakdown</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}K`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {revenueBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="returns" className="space-y-8">
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 p-6">
                  <div className="text-sm text-gray-400 mb-2">Annual Revenue</div>
                  <div className="text-3xl font-bold text-blue-400">
                    ${(selectedRevenue / 1000).toFixed(0)}K
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 p-6">
                  <div className="text-sm text-gray-400 mb-2">Net Operating Income</div>
                  <div className="text-3xl font-bold text-purple-400">
                    ${(noi / 1000).toFixed(0)}K
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20 p-6">
                  <div className="text-sm text-gray-400 mb-2">Annual Cash Flow</div>
                  <div className="text-3xl font-bold text-pink-400">
                    ${(cashFlow / 1000).toFixed(0)}K
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 p-6">
                  <div className="text-sm text-gray-400 mb-2">Cash-on-Cash Return</div>
                  <div className="text-3xl font-bold text-green-400">
                    {cashOnCashReturn.toFixed(1)}%
                  </div>
                </Card>
              </div>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
                <h3 className="text-2xl font-bold mb-6">10-Year Cash Flow Projection</h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
                        formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Revenue"
                      />
                      <Line
                        type="monotone"
                        dataKey="cashFlow"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Cash Flow"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Opportunity Zone Benefits */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Opportunity Zone Tax Advantages</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Defer and reduce capital gains taxes with Qualified Opportunity Zone investment
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 p-8 text-center">
              <div className="text-sm text-blue-400 font-semibold mb-2">Year 5</div>
              <h3 className="text-2xl font-bold mb-3">10% Basis Step-Up</h3>
              <p className="text-gray-300 mb-4">
                Reduce taxable gain by 10% of original investment
              </p>
              <div className="text-4xl font-bold text-blue-400">$38K</div>
              <div className="text-sm text-gray-400">Tax Savings</div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 p-8 text-center">
              <div className="text-sm text-purple-400 font-semibold mb-2">Year 7</div>
              <h3 className="text-2xl font-bold mb-3">15% Total Step-Up</h3>
              <p className="text-gray-300 mb-4">
                Additional 5% step-up for total 15% reduction
              </p>
              <div className="text-4xl font-bold text-purple-400">$58K</div>
              <div className="text-sm text-gray-400">Tax Savings</div>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20 p-8 text-center">
              <div className="text-sm text-pink-400 font-semibold mb-2">Year 10+</div>
              <h3 className="text-2xl font-bold mb-3">100% Exclusion</h3>
              <p className="text-gray-300 mb-4">
                Pay ZERO tax on appreciation after 10 years
              </p>
              <div className="text-4xl font-bold text-pink-400">${(ozSavingsWithTAD / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-400">Tax Savings</div>
            </Card>
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-6">Cumulative Tax Savings Over Time</h3>
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">Capital Gain</div>
                <div className="text-2xl font-bold">$1.3M</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Tax Rate</div>
                <div className="text-2xl font-bold">29.57%</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Without OZ</div>
                <div className="text-2xl font-bold text-red-400">${(ozSavingsWithTAD / 1000).toFixed(0)}K</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">With OZ (10yr)</div>
                <div className="text-2xl font-bold text-green-400">$0</div>
              </div>
            </div>
            <p className="text-gray-300">
              By holding this investment in a Qualified Opportunity Fund for 10+ years, you could save{" "}
              <span className="font-bold text-green-400">${(ozSavingsWithTAD / 1000).toFixed(0)}K</span> in capital gains taxes.
              This represents a 100% exclusion of all appreciation from taxation.
            </p>
          </Card>
        </div>
      </div>

      {/* Location & Proximity */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Location & Proximity</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Prime stadium-adjacent location with easy access to Mercedes-Benz Stadium and major developments
          </p>
          <PropertyMap property="514-whitehall" />
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Risk Analysis & Mitigation</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Transparent assessment of risks and how to address them
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border-yellow-500/20 p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">FIFA Timeline Pressure</h3>
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                      Medium Risk
                    </span>
                  </div>
                  <p className="text-gray-300">
                    Must close by February 2026. Hard money bridge loan enables fast closing.
                    Parking lot can be developed in 2-3 months.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-yellow-500/20 p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">High Capital Requirements</h3>
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                      Medium Risk
                    </span>
                  </div>
                  <p className="text-gray-300">
                    Flex-Stack requires $1.8M construction. Phased approach starts with parking lot,
                    uses FIFA profits to fund Phase 2.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-green-500/20 p-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">Forge Development Uncertainty</h3>
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
                      Low Risk
                    </span>
                  </div>
                  <p className="text-gray-300">
                    Investment thesis doesn't depend on Forge. Stadium events alone justify parking revenue.
                    Multiple exit strategies available.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-green-500/20 p-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">Market Demand</h3>
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
                      Low Risk
                    </span>
                  </div>
                  <p className="text-gray-300">
                    75-100 stadium events annually. Proven parking demand. Event space serves corporate market.
                    Airbnb has strong downtown Atlanta performance.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* 3D Renderings Gallery */}
      <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Architectural Visualizations</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Explore photorealistic renderings of the Flex-Stack building design
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="/renderings/514-whitehall-flex-stack-exterior.png" 
                  alt="Flex-Stack Building Exterior" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Exterior View</h3>
                <p className="text-gray-300">
                  Three-story Flex-Stack building with ground-level parking, mezzanine event space, and rooftop Airbnb unit
                </p>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="/renderings/514-whitehall-event-space-interior.png" 
                  alt="Event Space Interior" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Event Space Interior</h3>
                <p className="text-gray-300">
                  7,500 sq ft open floor plan with floor-to-ceiling windows and Mercedes-Benz Stadium views
                </p>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="/renderings/514-whitehall-rooftop-airbnb.png" 
                  alt="Rooftop Airbnb Unit" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Luxury Rooftop Airbnb</h3>
                <p className="text-gray-300">
                  2BR/2BA condo with private terrace, hot tub, and panoramic stadium views
                </p>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="/renderings/assemblage-fifa-fan-zone.png" 
                  alt="FIFA Fan Zone Concept" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">FIFA 2026 Fan Zone</h3>
                <p className="text-gray-300">
                  Temporary event venue concept for World Cup with massive LED screens and festival seating
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Capitalize on This Opportunity?
          </h2>
          <p className="text-xl text-gray-300">
            Download the complete pro forma, schedule a site visit, or connect with our investment team
            to discuss financing options.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleDownloadPDF}>
              <Download className="w-5 h-5 mr-2" />
              Download Full Analysis
            </Button>
            <Link href="/property/comparison">
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                Compare with Assemblage
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
              Contact Investment Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
