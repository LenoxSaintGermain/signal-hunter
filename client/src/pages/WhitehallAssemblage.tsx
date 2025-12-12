import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  TrendingUp,
  DollarSign,
  Calendar,
  MapPin,
  Trophy,
  Calculator,
  PiggyBank,
  BarChart3,
  Timer,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PropertyMap } from "@/components/PropertyMap";
import Navigation from "@/components/Navigation";

export default function WhitehallAssemblage() {
  // FIFA Countdown Timer
  const [timeToFIFA, setTimeToFIFA] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fifaDate = new Date("2026-06-15T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const diff = fifaDate.getTime() - now.getTime();

      if (diff > 0) {
        setTimeToFIFA({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculator State
  const [purchasePrice, setPurchasePrice] = useState(5500000);
  const [downPayment, setDownPayment] = useState(25);
  const [interestRate, setInterestRate] = useState(8);
  const [holdPeriod, setHoldPeriod] = useState(10);
  const [parkingSpaces, setParkingSpaces] = useState(250);
  const [parkingPrice, setParkingPrice] = useState(100);
  const [fanZoneCapacity, setFanZoneCapacity] = useState(1000);
  const [fanZoneTicket, setFanZoneTicket] = useState(75);

  // Financial Calculations
  const downPaymentAmount = purchasePrice * (downPayment / 100);
  const loanAmount = purchasePrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = holdPeriod * 12;
  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const annualDebtService = monthlyPayment * 12;

  // FIFA Revenue Calculation
  const fifaMatches = 8;
  const fifaParkingRevenue = parkingSpaces * parkingPrice * fifaMatches * 0.95;
  const fifaFanZoneRevenue = fanZoneCapacity * fanZoneTicket * fifaMatches * 0.80;
  const fifaHospitalityRevenue = 100000;
  const fifaAdvertisingRevenue = 50000;
  const totalFIFARevenue = fifaParkingRevenue + fifaFanZoneRevenue + fifaHospitalityRevenue + fifaAdvertisingRevenue;

  // Annual Revenue (Post-FIFA)
  const annualParkingRevenue = parkingSpaces * 40 * 70 * 0.75;
  const annualEventRevenue = 300000;
  const totalAnnualRevenue = annualParkingRevenue + annualEventRevenue;

  // NOI and Returns
  const year1Revenue = totalFIFARevenue;
  const year1Expenses = 400000;
  const year1NOI = year1Revenue - year1Expenses;
  const cashOnCashReturn = (year1NOI - annualDebtService) / downPaymentAmount;

  // Opportunity Zone Benefits
  const exitValue = purchasePrice * 2.18; // 118% appreciation over 10 years
  const capitalGain = exitValue - purchasePrice;
  const ozTaxSavings = capitalGain * 0.2957; // 29.57% combined federal + state rate

  // Chart Data
  const cashFlowData = Array.from({ length: 10 }, (_, i) => {
    const year = i + 1;
    const revenue = year === 1 ? year1Revenue : totalAnnualRevenue * Math.pow(1.03, year - 2);
    const expenses = year1Expenses * Math.pow(1.02, year - 1);
    const noi = revenue - expenses;
    const cashFlow = noi - annualDebtService;
    return {
      year,
      revenue: Math.round(revenue),
      expenses: Math.round(expenses),
      noi: Math.round(noi),
      cashFlow: Math.round(cashFlow),
    };
  });

  const revenueBreakdownData = [
    { name: "FIFA Parking", value: fifaParkingRevenue, color: "#3b82f6" },
    { name: "FIFA Fan Zone", value: fifaFanZoneRevenue, color: "#8b5cf6" },
    { name: "Hospitality", value: fifaHospitalityRevenue, color: "#10b981" },
    { name: "Advertising", value: fifaAdvertisingRevenue, color: "#f59e0b" },
  ];

  const scenarioComparisonData = [
    { scenario: "FIFA Quick Flip", roi: 65.8, irr: 0, exitValue: 7500000 },
    { scenario: "Parking + Events", roi: 42.7, irr: 28.5, exitValue: 12000000 },
    { scenario: "Mixed-Use Dev", roi: 44.8, irr: 32.7, exitValue: 35000000 },
    { scenario: "Land Banking", roi: 36.6, irr: 24.5, exitValue: 12000000 },
  ];

  const ozBenefitsData = [
    { year: 1, savings: 0, cumulative: 0 },
    { year: 5, savings: capitalGain * 0.10 * 0.2957, cumulative: capitalGain * 0.10 * 0.2957 },
    { year: 7, savings: capitalGain * 0.05 * 0.2957, cumulative: capitalGain * 0.15 * 0.2957 },
    { year: 10, savings: capitalGain * 0.85 * 0.2957, cumulative: ozTaxSavings },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="/property/whitehall-assemblage" />
      {/* Hero Section with FIFA Countdown */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 " />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border mb-8">
            <Trophy className="w-4 h-4 text-foreground" />
            <span className="text-sm text-foreground font-medium">FIFA World Cup 2026 Host City</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-foreground">
            Whitehall
            <br />
            Assemblage
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            2.31 acres of prime stadium-adjacent land. 8 FIFA World Cup matches.
            <br />
            <span className="text-foreground font-semibold">One extraordinary opportunity.</span>
          </p>

          {/* FIFA Countdown */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Timer className="w-6 h-6 text-foreground" />
            <div className="flex gap-4">
              {[
                { label: "Days", value: timeToFIFA.days },
                { label: "Hours", value: timeToFIFA.hours },
                { label: "Min", value: timeToFIFA.minutes },
                { label: "Sec", value: timeToFIFA.seconds },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-foreground tabular-nums">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <span className="text-muted-foreground">until FIFA 2026</span>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { label: "Asking Price", value: "$5.5M", icon: DollarSign },
              { label: "Land Area", value: "2.31 AC", icon: MapPin },
              { label: "FIFA Matches", value: "8", icon: Trophy },
              { label: "Stadium Distance", value: "0.6 mi", icon: Building2 },
            ].map((metric) => (
              <Card key={metric.label} className="p-4 bg-secondary backdrop-blur-sm border border-border">
                <metric.icon className="w-5 h-5 text-foreground mb-2" />
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground text-lg px-8 hover:bg-primary/90">
              View Investment Calculator
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border border-border text-foreground hover:bg-secondary text-lg px-8">
              Download Pro Forma
            </Button>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6 text-center">
              The Opportunity
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              A rare assemblage of four properties totaling 2.31 acres with 600 feet of Whitehall Street frontage,
              located just 0.6 miles from Mercedes-Benz Stadium in Atlanta's rapidly gentrifying Mechanicsville corridor.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "FIFA 2026 Catalyst",
                  description: "Generate $230K-$1.7M in revenue during the 30-day tournament period",
                  icon: Trophy,
                  color: "text-yellow-600",
                },
                {
                  title: "Opportunity Zone",
                  description: `Defer and reduce capital gains taxes. Save up to $${(ozTaxSavings / 1000).toFixed(0)}K over 10 years`,
                  icon: PiggyBank,
                  color: "text-green-600",
                },
                {
                  title: "Development Upside",
                  description: "Adjacent to $1.29B Forge Atlanta project. Multiple exit strategies available",
                  icon: TrendingUp,
                  color: "text-foreground",
                },
              ].map((feature) => (
                <Card key={feature.title} className="p-6 bg-card backdrop-blur-sm border border-border">
                  <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Calculator className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Investment Calculator
              </h2>
              <p className="text-xl text-muted-foreground">
                Adjust the variables below to model your investment scenario
              </p>
            </div>

            <Card className="p-8 bg-secondary/30 backdrop-blur-sm border border-border">
              <Tabs defaultValue="financing" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary">
                  <TabsTrigger value="financing" className="data-[state=active]:bg-background">Financing</TabsTrigger>
                  <TabsTrigger value="fifa" className="data-[state=active]:bg-background">FIFA Revenue</TabsTrigger>
                  <TabsTrigger value="returns" className="data-[state=active]:bg-background">Returns</TabsTrigger>
                </TabsList>

                <TabsContent value="financing" className="space-y-6">
                  <div>
                    <label className="text-foreground font-medium mb-2 block">
                      Purchase Price: ${(purchasePrice / 1000000).toFixed(2)}M
                    </label>
                    <Slider
                      value={[purchasePrice]}
                      onValueChange={(v) => setPurchasePrice(v[0])}
                      min={4500000}
                      max={6500000}
                      step={100000}
                      className="mb-4"
                    />
                  </div>

                  <div>
                    <label className="text-foreground font-medium mb-2 block">
                      Down Payment: {downPayment}%
                    </label>
                    <Slider
                      value={[downPayment]}
                      onValueChange={(v) => setDownPayment(v[0])}
                      min={10}
                      max={50}
                      step={5}
                      className="mb-4"
                    />
                  </div>

                  <div>
                    <label className="text-foreground font-medium mb-2 block">
                      Interest Rate: {interestRate}%
                    </label>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(v) => setInterestRate(v[0])}
                      min={5}
                      max={15}
                      step={0.5}
                      className="mb-4"
                    />
                  </div>

                  <div>
                    <label className="text-foreground font-medium mb-2 block">
                      Hold Period: {holdPeriod} years
                    </label>
                    <Slider
                      value={[holdPeriod]}
                      onValueChange={(v) => setHoldPeriod(v[0])}
                      min={2}
                      max={20}
                      step={1}
                      className="mb-4"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Down Payment</div>
                      <div className="text-2xl font-bold text-foreground">
                        ${(downPaymentAmount / 1000000).toFixed(2)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Loan Amount</div>
                      <div className="text-2xl font-bold text-foreground">
                        ${(loanAmount / 1000000).toFixed(2)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Monthly Payment</div>
                      <div className="text-2xl font-bold text-foreground">
                        ${monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Annual Debt Service</div>
                      <div className="text-2xl font-bold text-foreground">
                        ${(annualDebtService / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="fifa" className="space-y-6">
                  <div>
                    <label className="text-foreground font-medium mb-2 block">
                      Parking Spaces: {parkingSpaces}
                    </label>
                    <Slider
                      value={[parkingSpaces]}
                      onValueChange={(v) => setParkingSpaces(v[0])}
                      min={150}
                      max={350}
                      step={25}
                      className="mb-4"
                    />
                  </div>

                  <div>
                    <label className="text-foreground font-medium mb-2 block">
                      Parking Price per Space: ${parkingPrice}
                    </label>
                    <Slider
                      value={[parkingPrice]}
                      onValueChange={(v) => setParkingPrice(v[0])}
                      min={50}
                      max={200}
                      step={10}
                      className="mb-4"
                    />
                  </div>

                  <div>
                    <label className="text-foreground font-medium mb-2 block">
                      Fan Zone Capacity: {fanZoneCapacity}
                    </label>
                    <Slider
                      value={[fanZoneCapacity]}
                      onValueChange={(v) => setFanZoneCapacity(v[0])}
                      min={500}
                      max={2000}
                      step={100}
                      className="mb-4"
                    />
                  </div>

                  <div>
                    <label className="text-foreground font-medium mb-2 block">
                      Fan Zone Ticket Price: ${fanZoneTicket}
                    </label>
                    <Slider
                      value={[fanZoneTicket]}
                      onValueChange={(v) => setFanZoneTicket(v[0])}
                      min={30}
                      max={150}
                      step={5}
                      className="mb-4"
                    />
                  </div>

                  <div className="mt-8 pt-8 border-t border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">FIFA 2026 Revenue Breakdown</h3>
                    <div className="h-64 mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={revenueBreakdownData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {revenueBreakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Total FIFA Revenue</div>
                        <div className="text-3xl font-bold text-green-600">
                          ${(totalFIFARevenue / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Per Match Average</div>
                        <div className="text-3xl font-bold text-foreground">
                          ${(totalFIFARevenue / fifaMatches / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="returns" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 bg-green-50 border-green-200">
                      <div className="text-sm text-green-700 mb-2">Year 1 Cash-on-Cash</div>
                      <div className="text-4xl font-bold text-foreground mb-1">
                        {(cashOnCashReturn * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">FIFA year returns</div>
                    </Card>

                    <Card className="p-6 bg-blue-50 border-blue-200">
                      <div className="text-sm text-foreground mb-2">Year 1 NOI</div>
                      <div className="text-4xl font-bold text-foreground mb-1">
                        ${(year1NOI / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Net operating income</div>
                    </Card>

                    <Card className="p-6 bg-purple-50 border-purple-200">
                      <div className="text-sm text-foreground mb-2">10-Year Exit Value</div>
                      <div className="text-4xl font-bold text-foreground mb-1">
                        ${(exitValue / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-muted-foreground">118% appreciation</div>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">10-Year Cash Flow Projection</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cashFlowData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="year" stroke="#6b7280" />
                          <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                            formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                          <Line type="monotone" dataKey="noi" stroke="#10b981" strokeWidth={2} name="NOI" />
                          <Line type="monotone" dataKey="cashFlow" stroke="#8b5cf6" strokeWidth={2} name="Cash Flow" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </section>

      {/* Location & Proximity */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6 text-center">
              Prime Stadium Location
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              2.31 acres just 0.6 miles from Mercedes-Benz Stadium with 600 feet of Whitehall Street frontage
            </p>
            <PropertyMap property="assemblage" />
          </div>
        </div>
      </section>

      {/* Opportunity Zone Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <PiggyBank className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Opportunity Zone Tax Advantages
              </h2>
              <p className="text-xl text-muted-foreground">
                Defer and reduce capital gains taxes with Qualified Opportunity Zone investment
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  year: "Year 5",
                  benefit: "10% Basis Step-Up",
                  description: "Reduce taxable gain by 10% of original investment",
                  savings: `$${((capitalGain * 0.10 * 0.2957) / 1000).toFixed(0)}K`,
                },
                {
                  year: "Year 7",
                  benefit: "15% Total Step-Up",
                  description: "Additional 5% step-up for total 15% reduction",
                  savings: `$${((capitalGain * 0.15 * 0.2957) / 1000).toFixed(0)}K`,
                },
                {
                  year: "Year 10+",
                  benefit: "100% Exclusion",
                  description: "Pay ZERO tax on appreciation after 10 years",
                  savings: `$${(ozTaxSavings / 1000).toFixed(0)}K`,
                },
              ].map((milestone) => (
                <Card key={milestone.year} className="p-6 bg-green-50 border-green-200">
                  <div className="text-sm text-green-700 font-semibold mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{milestone.benefit}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{milestone.description}</p>
                  <div className="text-3xl font-bold text-green-600">{milestone.savings}</div>
                  <div className="text-xs text-muted-foreground mt-1">Tax Savings</div>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-secondary/30 backdrop-blur-sm border border-border">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Cumulative Tax Savings Over Time</h3>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ozBenefitsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#6b7280" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                    <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                      formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Legend />
                    <Bar dataKey="cumulative" fill="#10b981" name="Cumulative Tax Savings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Capital Gain</div>
                  <div className="text-xl font-bold text-foreground">${(capitalGain / 1000000).toFixed(2)}M</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Tax Rate</div>
                  <div className="text-xl font-bold text-foreground">29.57%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Without OZ</div>
                  <div className="text-xl font-bold text-red-500">${(capitalGain * 0.2957 / 1000).toFixed(0)}K</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">With OZ (10yr)</div>
                  <div className="text-xl font-bold text-green-600">$0</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Total Tax Savings Potential</div>
                    <div className="text-sm text-muted-foreground">
                      By holding this investment in a Qualified Opportunity Fund for 10+ years, you could save{" "}
                      <span className="text-green-600 font-semibold">${(ozTaxSavings / 1000).toFixed(0)}K</span> in capital gains taxes.
                      This represents a <span className="text-green-600 font-semibold">100% exclusion</span> of all appreciation from taxation.
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Scenario Comparison */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <BarChart3 className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Investment Scenarios
              </h2>
              <p className="text-xl text-muted-foreground">
                Compare different strategies to find the optimal path forward
              </p>
            </div>

            <div className="h-96 mb-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scenarioComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="scenario" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }} />
                  <Legend />
                  <Bar dataKey="roi" fill="#8b5cf6" name="Year 1 ROI (%)" />
                  <Bar dataKey="irr" fill="#3b82f6" name="10-Year IRR (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {scenarioComparisonData.map((scenario) => (
                <Card key={scenario.scenario} className="p-6 bg-card backdrop-blur-sm border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">{scenario.scenario}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Year 1 ROI</span>
                      <span className="text-2xl font-bold text-foreground">{scenario.roi}%</span>
                    </div>
                    {scenario.irr > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">10-Year IRR</span>
                        <span className="text-2xl font-bold text-foreground">{scenario.irr}%</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Exit Value</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${(scenario.exitValue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Analysis */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Risk Analysis & Mitigation
              </h2>
              <p className="text-xl text-muted-foreground">
                Transparent assessment of risks and how to address them
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  risk: "FIFA Timeline Pressure",
                  level: "Medium",
                  mitigation: "Must close by February 2026. Hard money bridge loan enables fast closing. Parking lot can be developed in 2-3 months.",
                },
                {
                  risk: "High Acquisition Cost",
                  level: "Medium",
                  mitigation: "Creative financing (HELOC + syndication) reduces capital requirements. FIFA revenue provides immediate ROI. OZ benefits offset long-term costs.",
                },
                {
                  risk: "Forge Development Uncertainty",
                  level: "Low",
                  mitigation: "Investment thesis doesn't depend on Forge. Stadium events alone justify parking revenue. Multiple exit strategies available.",
                },
                {
                  risk: "Old Building Condition",
                  level: "Medium",
                  mitigation: "Buildings built 1940-1959 need inspection. Can be demolished if not viable. Land value alone supports investment.",
                },
              ].map((item) => (
                <Card key={item.risk} className="p-6 bg-secondary/30 backdrop-blur-sm border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{item.risk}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${item.level === "High"
                          ? "bg-red-500/10 text-red-600"
                          : item.level === "Medium"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : "bg-green-500/10 text-green-600"
                        }`}
                    >
                      {item.level} Risk
                    </span>
                  </div>
                  <p className="text-muted-foreground">{item.mitigation}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Ready to Capitalize on This Opportunity?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Download the complete pro forma, schedule a site visit, or connect with our investment team to discuss financing options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground btn-apple-primary text-lg px-8 hover:bg-primary/90">
              Download Full Analysis
            </Button>
            <Button size="lg" variant="outline" className="border border-border text-foreground hover:bg-secondary text-lg px-8">
              Schedule Site Visit
            </Button>
            <Button size="lg" variant="outline" className="border border-border text-foreground hover:bg-secondary text-lg px-8">
              Contact Investment Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
