import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  DollarSign,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Calendar,
  Target,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import { Link } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export default function PropertyComparison() {
  const [selectedScenario, setSelectedScenario] = useState("base");

  // Property Data
  const property514 = {
    name: "514 Whitehall St SW",
    price: 200000,
    size: 11500, // sq ft
    acres: 0.26,
    distance: 1.0, // miles to stadium
    parkingSpaces: 50,
    buildingCost: 2000000,
    totalInvestment: 2200000,
    downPayment: 440000, // 20%
    loanAmount: 1760000,
    interestRate: 7.0,
    year1Revenue: 620000,
    year1Expenses: 155000,
    year1NOI: 465000,
    annualDebtService: 147840,
    year1CashFlow: 317160,
    cashOnCashReturn: 72.1,
    irr: 42.7,
    exitValue: 4400000,
    ozTaxSavings: 260000,
    fifaRevenue: 85000,
    riskScore: 3.5, // out of 5
  };

  const assemblage = {
    name: "Whitehall Assemblage",
    price: 5500000,
    size: 100628, // sq ft
    acres: 2.31,
    distance: 0.6, // miles to stadium
    parkingSpaces: 250,
    buildingCost: 0, // Phase 1 parking only
    totalInvestment: 6000000, // including improvements
    downPayment: 1500000, // 25%
    loanAmount: 4500000,
    interestRate: 8.0,
    year1Revenue: 1730000, // FIFA year
    year1Expenses: 600000,
    year1NOI: 1130000,
    annualDebtService: 396000,
    year1CashFlow: 734000,
    cashOnCashReturn: 48.9,
    irr: 32.7,
    exitValue: 12000000,
    ozTaxSavings: 1900000,
    fifaRevenue: 940000,
    riskScore: 4.2, // out of 5
  };

  // Comparison Data
  const comparisonData = [
    {
      metric: "Price",
      property514: property514.price / 1000,
      assemblage: assemblage.price / 1000,
      unit: "K",
    },
    {
      metric: "Total Investment",
      property514: property514.totalInvestment / 1000,
      assemblage: assemblage.totalInvestment / 1000,
      unit: "K",
    },
    {
      metric: "Down Payment",
      property514: property514.downPayment / 1000,
      assemblage: assemblage.downPayment / 1000,
      unit: "K",
    },
    {
      metric: "Year 1 Cash Flow",
      property514: property514.year1CashFlow / 1000,
      assemblage: assemblage.year1CashFlow / 1000,
      unit: "K",
    },
    {
      metric: "Cash-on-Cash %",
      property514: property514.cashOnCashReturn,
      assemblage: assemblage.cashOnCashReturn,
      unit: "%",
    },
    {
      metric: "10-Year IRR %",
      property514: property514.irr,
      assemblage: assemblage.irr,
      unit: "%",
    },
  ];

  const riskComparisonData = [
    {
      category: "Market Risk",
      property514: 3.0,
      assemblage: 4.0,
    },
    {
      category: "Execution Risk",
      property514: 4.5,
      assemblage: 3.5,
    },
    {
      category: "Financial Risk",
      property514: 2.5,
      assemblage: 4.5,
    },
    {
      category: "Regulatory Risk",
      property514: 3.5,
      assemblage: 4.0,
    },
    {
      category: "Competition Risk",
      property514: 3.0,
      assemblage: 3.5,
    },
  ];

  const getBetterValue = (metric: string, val514: number, valAssemblage: number) => {
    const higherIsBetter = ["Year 1 Cash Flow", "Cash-on-Cash %", "10-Year IRR %"];
    const lowerIsBetter = ["Price", "Total Investment", "Down Payment"];
    
    if (higherIsBetter.includes(metric)) {
      return val514 > valAssemblage ? "514" : "assemblage";
    } else if (lowerIsBetter.includes(metric)) {
      return val514 < valAssemblage ? "514" : "assemblage";
    }
    return "neutral";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">Property Comparison Tool</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Compare
            <br />
            Your Options
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Side-by-side analysis of 514 Whitehall vs Assemblage to help you make the best investment decision
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Properties", value: "2", icon: Building2 },
              { label: "Total Capital", value: "$8.2M", icon: DollarSign },
              { label: "Combined Spaces", value: "300", icon: MapPin },
              { label: "Avg IRR", value: "37.7%", icon: TrendingUp },
            ].map((stat) => (
              <Card key={stat.label} className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
                <stat.icon className="w-5 h-5 text-blue-400 mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Side-by-Side Comparison */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Property Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* 514 Whitehall */}
            <Card className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-blue-500/20">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    514 Whitehall St SW
                  </h3>
                  <p className="text-gray-400">The Flex-Stack Opportunity</p>
                </div>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Lower Risk
                </Badge>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Asking Price", value: "$200K", icon: DollarSign },
                  { label: "Land Size", value: "0.26 acres", icon: MapPin },
                  { label: "Stadium Distance", value: "1.0 mile", icon: Building2 },
                  { label: "Parking Spaces", value: "50", icon: Target },
                  { label: "Total Investment", value: "$2.2M", icon: DollarSign },
                  { label: "Down Payment (20%)", value: "$440K", icon: DollarSign },
                  { label: "Year 1 Cash Flow", value: "$317K", icon: TrendingUp },
                  { label: "Cash-on-Cash", value: "72.1%", icon: Zap },
                  { label: "10-Year IRR", value: "42.7%", icon: BarChart3 },
                  { label: "FIFA Revenue", value: "$85K", icon: Trophy },
                  { label: "OZ Tax Savings", value: "$260K", icon: Shield },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{item.label}</span>
                    </div>
                    <span className="text-white font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>

              <Link href="/property/514-whitehall">
                <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700">
                  View Full Analysis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </Card>

            {/* Whitehall Assemblage */}
            <Card className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Whitehall Assemblage
                  </h3>
                  <p className="text-gray-400">The FIFA Catalyst</p>
                </div>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Higher Upside
                </Badge>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Asking Price", value: "$5.5M", icon: DollarSign },
                  { label: "Land Size", value: "2.31 acres", icon: MapPin },
                  { label: "Stadium Distance", value: "0.6 miles", icon: Building2 },
                  { label: "Parking Spaces", value: "250", icon: Target },
                  { label: "Total Investment", value: "$6.0M", icon: DollarSign },
                  { label: "Down Payment (25%)", value: "$1.5M", icon: DollarSign },
                  { label: "Year 1 Cash Flow", value: "$734K", icon: TrendingUp },
                  { label: "Cash-on-Cash", value: "48.9%", icon: Zap },
                  { label: "10-Year IRR", value: "32.7%", icon: BarChart3 },
                  { label: "FIFA Revenue", value: "$940K", icon: Trophy },
                  { label: "OZ Tax Savings", value: "$1.9M", icon: Shield },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">{item.label}</span>
                    </div>
                    <span className="text-white font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>

              <Link href="/property/whitehall-assemblage">
                <Button className="w-full mt-8 bg-purple-600 hover:bg-purple-700">
                  View Full Analysis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Charts */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Detailed Comparison
          </h2>

          <Tabs defaultValue="financial" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="financial">Financial Metrics</TabsTrigger>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
              <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            </TabsList>

            <TabsContent value="financial">
              <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Financial Metrics Comparison
                </h3>
                
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="metric" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="property514" fill="#3b82f6" name="514 Whitehall" />
                    <Bar dataKey="assemblage" fill="#8b5cf6" name="Assemblage" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-8 space-y-4">
                  {comparisonData.map((item) => {
                    const better = getBetterValue(item.metric, item.property514, item.assemblage);
                    return (
                      <div key={item.metric} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                        <span className="text-gray-300 font-medium">{item.metric}</span>
                        <div className="flex items-center gap-4">
                          <div className={`text-right ${better === "514" ? "text-blue-400 font-bold" : "text-gray-400"}`}>
                            {item.property514.toLocaleString()}{item.unit}
                            {better === "514" && <CheckCircle2 className="inline ml-2 w-4 h-4" />}
                          </div>
                          <div className="text-gray-600">vs</div>
                          <div className={`text-right ${better === "assemblage" ? "text-purple-400 font-bold" : "text-gray-400"}`}>
                            {item.assemblage.toLocaleString()}{item.unit}
                            {better === "assemblage" && <CheckCircle2 className="inline ml-2 w-4 h-4" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="risk">
              <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Risk Profile Comparison
                </h3>
                
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={riskComparisonData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="category" stroke="#9ca3af" />
                    <PolarRadiusAxis stroke="#9ca3af" domain={[0, 5]} />
                    <Radar name="514 Whitehall" dataKey="property514" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Assemblage" dataKey="assemblage" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-semibold text-blue-400 mb-4">
                      514 Whitehall Risks
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Higher execution complexity (construction)",
                        "Smaller scale limits revenue potential",
                        "Zoning approval required for mixed-use",
                        "Longer timeline to stabilization",
                      ].map((risk) => (
                        <li key={risk} className="flex items-start gap-2 text-gray-300">
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-purple-400 mb-4">
                      Assemblage Risks
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Higher capital requirement ($1.5M down)",
                        "Forge development execution uncertainty",
                        "Larger debt service ($396K/year)",
                        "FIFA timeline pressure (7 months)",
                      ].map((risk) => (
                        <li key={risk} className="flex items-start gap-2 text-gray-300">
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="scenarios">
              <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Investment Scenarios
                </h3>

                <div className="space-y-6">
                  {/* Conservative Investor */}
                  <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-blue-400" />
                      <h4 className="text-xl font-semibold text-white">
                        Conservative Investor
                      </h4>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Lower capital requirement, proven parking model, diversified revenue streams
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Recommended Property:</span>
                      <Badge className="bg-blue-500 text-white">514 Whitehall</Badge>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {[
                        "Only $440K down payment required",
                        "72% cash-on-cash return",
                        "Lower execution risk",
                        "Flex-Stack diversification",
                      ].map((reason) => (
                        <li key={reason} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Aggressive Growth */}
                  <div className="p-6 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-purple-400" />
                      <h4 className="text-xl font-semibold text-white">
                        Aggressive Growth Investor
                      </h4>
                    </div>
                    <p className="text-gray-300 mb-4">
                      FIFA catalyst, massive scale, $1.9M OZ tax savings, development upside
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Recommended Property:</span>
                      <Badge className="bg-purple-500 text-white">Whitehall Assemblage</Badge>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {[
                        "$940K FIFA revenue in Year 1",
                        "2.31 acres of development potential",
                        "$1.9M Opportunity Zone tax savings",
                        "Adjacent to $1.29B Forge project",
                      ].map((reason) => (
                        <li key={reason} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Portfolio Approach */}
                  <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-green-400" />
                      <h4 className="text-xl font-semibold text-white">
                        Portfolio Approach
                      </h4>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Acquire both properties for maximum diversification and market coverage
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Recommended Strategy:</span>
                      <Badge className="bg-green-500 text-white">Both Properties</Badge>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {[
                        "Combined $1.05M annual cash flow",
                        "Diversified risk across 2 assets",
                        "300 total parking spaces",
                        "$2.16M combined OZ tax savings",
                        "Multiple exit strategies",
                      ].map((reason) => (
                        <li key={reason} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 rounded-lg bg-white/5">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Total Investment</div>
                          <div className="text-2xl font-bold text-white">$8.2M</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Combined IRR</div>
                          <div className="text-2xl font-bold text-white">37.7%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Decision Helper */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Still Not Sure Which Property is Right for You?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Schedule a consultation to discuss your investment goals, capital availability, and risk tolerance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Schedule Consultation
                <Calendar className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Download Comparison PDF
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
