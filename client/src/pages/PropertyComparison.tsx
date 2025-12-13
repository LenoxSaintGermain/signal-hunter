import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Loader2
} from "lucide-react";
import { Link } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { trpc } from "@/lib/trpc";
import Navigation from "../components/Navigation"; // Assumed path

// Helper to safely parse numbers
const safeNum = (val: any) => (typeof val === 'number' ? val : parseFloat(val) || 0);

export default function PropertyComparison() {
  const [selectedId1, setSelectedId1] = useState<string>("90005"); // Default 514
  const [selectedId2, setSelectedId2] = useState<string>("90004"); // Default Assemblage

  // Fallback Mock Data for Demo (if DB is empty or connection fails)
  const mockDeals = [
    {
      id: 90005,
      name: "514 Whitehall St SW",
      price: 1200000,
      revenue: 200000,
      score: 85,
      risks: ["Mixed-use complexity", "Tenant verification needed"],
      strengths: ["Opportunity Zone", "Downtown location"],
      capex: 1000000
    },
    {
      id: 90004,
      name: "Whitehall Assemblage",
      price: 5500000,
      revenue: 0,
      score: 88,
      risks: ["Development risk", "Zoning analysis required"],
      strengths: ["Massive scale", "High upside"],
      capex: 0
    }
  ];

  // Fetch all deals
  const { data: dealsData, isLoading } = trpc.dealsV2.list.useQuery({
    sortBy: "score",
    sortOrder: "desc",
    limit: 100,
  });

  // Use API data if available, otherwise use mock
  const deals = (dealsData?.deals && dealsData.deals.length > 0) ? dealsData.deals : mockDeals;

  // Default fallbacks if IDs not found (prevents crash on clean DB)
  useEffect(() => {
    if (deals.length >= 2) {
      // If selected IDs don't exist in current deals (e.g. mock vs real), reset to first two
      const id1Exists = deals.find(d => d.id.toString() === selectedId1);
      const id2Exists = deals.find(d => d.id.toString() === selectedId2);

      if (!id1Exists) setSelectedId1(deals[0].id.toString());
      if (!id2Exists) setSelectedId2(deals[1].id.toString());
    }
  }, [deals, selectedId1, selectedId2]);

  const deal1 = deals.find(d => d.id.toString() === selectedId1);
  const deal2 = deals.find(d => d.id.toString() === selectedId2);

  if (isLoading && !dealsData) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!deal1 || !deal2) {
    // Should almost never happen with mock fallback
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <p>Not enough deals to compare yet.</p>
        <Link href="/dashboard">
          <Button variant="outline" className="mt-4">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // Calculate stats dynamically
  const getDealStats = (deal: any) => {
    // Basic calcs with defaults
    const price = safeNum(deal.price);
    const revenue = safeNum(deal.revenue);
    const expenses = revenue * 0.4; // Assumption if missing
    const noi = revenue - expenses;
    const loanAmount = price * 0.75;
    const debtService = loanAmount * 0.08; // 8% interest only mock
    const cashFlow = noi - debtService;
    const downPayment = price * 0.25;
    const cashOnCash = downPayment > 0 ? (cashFlow / downPayment) * 100 : 0;
    const irr = safeNum(deal.score) / 2; // Mock correlation for demo

    return {
      name: deal.name,
      price,
      revenue,
      cashFlow,
      downPayment,
      totalInvestment: price + (deal.capex || 0),
      irr,
      cashOnCash,
      score: safeNum(deal.score),
      risks: Array.isArray(deal.risks) ? deal.risks : ["Market volatility", "Execution risk"],
      strengths: Array.isArray(deal.strengths) ? deal.strengths : ["Prime location", "Value add potential"]
    };
  };

  const d1 = getDealStats(deal1);
  const d2 = getDealStats(deal2);

  // Comparison Data
  const comparisonData = [
    { metric: "Price (K)", d1: d1.price / 1000, d2: d2.price / 1000 },
    { metric: "Rev (K)", d1: d1.revenue / 1000, d2: d2.revenue / 1000 },
    { metric: "Cash Flow (K)", d1: d1.cashFlow / 1000, d2: d2.cashFlow / 1000 },
    { metric: "Score / 100", d1: d1.score, d2: d2.score },
    // { metric: "CoC %", d1: d1.cashOnCash, d2: d2.cashOnCash }
  ];

  const getBetterValue = (metric: string, val1: number, val2: number) => {
    return val1 > val2 ? "d1" : "d2"; // Simple higher is better for these metrics (mostly)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Navigation currentPage="/property/comparison" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">Head-to-Head Analysis</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Deal Fight Night
          </h1>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">

            {/* Left Corner */}
            <Card className="p-6 bg-blue-950/30 border-blue-500/30">
              <Select value={selectedId1} onValueChange={setSelectedId1}>
                <SelectTrigger className="w-full text-lg font-bold bg-blue-900/20 border-blue-500/50 text-white h-12">
                  <SelectValue placeholder="Select Property A" />
                </SelectTrigger>
                <SelectContent>
                  {deals.map(d => (
                    <SelectItem key={d.id} value={d.id.toString()}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4 text-4xl font-bold text-blue-400">{d1.score}<span className="text-sm text-gray-400 ml-1">/100</span></div>
              <div className="text-sm text-gray-400">AI Score</div>
            </Card>

            {/* Right Corner */}
            <Card className="p-6 bg-purple-950/30 border-purple-500/30">
              <Select value={selectedId2} onValueChange={setSelectedId2}>
                <SelectTrigger className="w-full text-lg font-bold bg-purple-900/20 border-purple-500/50 text-white h-12">
                  <SelectValue placeholder="Select Property B" />
                </SelectTrigger>
                <SelectContent>
                  {deals.map(d => (
                    <SelectItem key={d.id} value={d.id.toString()}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4 text-4xl font-bold text-purple-400">{d2.score}<span className="text-sm text-gray-400 ml-1">/100</span></div>
              <div className="text-sm text-gray-400">AI Score</div>
            </Card>

          </div>
        </div>
      </section>

      {/* Side-by-Side Stats */}
      <section className="py-12 bg-gray-900/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Tale of the Tape</h3>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="metric" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                <Legend />
                <Bar dataKey="d1" name={d1.name} fill="#3b82f6" />
                <Bar dataKey="d2" name={d2.name} fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-8 space-y-4">
              {comparisonData.map((item) => {
                const better = getBetterValue(item.metric, item.d1, item.d2);
                return (
                  <div key={item.metric} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex-1 flex gap-2 items-center">
                      <span className="text-gray-300 font-medium">{item.metric}</span>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className={`text-right w-32 ${better === "d1" ? "text-blue-400 font-bold" : "text-gray-500"}`}>
                        {item.d1.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                        {better === "d1" && <CheckCircle2 className="inline ml-2 w-4 h-4" />}
                      </div>
                      <div className={`text-right w-32 ${better === "d2" ? "text-purple-400 font-bold" : "text-gray-500"}`}>
                        {item.d2.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                        {better === "d2" && <CheckCircle2 className="inline ml-2 w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* Risks Analysis */}
      <section className="py-12 bg-gray-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">AI Risk Assessment</h3>
          <div className="grid md:grid-cols-2 gap-8">

            <Card className="p-6 bg-blue-950/20 border-blue-500/20">
              <h4 className="text-xl font-bold text-blue-400 mb-4">{d1.name} Risks</h4>
              <ul className="space-y-2">
                {d1.risks.slice(0, 5).map((r: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-purple-950/20 border-purple-500/20">
              <h4 className="text-xl font-bold text-purple-400 mb-4">{d2.name} Risks</h4>
              <ul className="space-y-2">
                {d2.risks.slice(0, 5).map((r: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
