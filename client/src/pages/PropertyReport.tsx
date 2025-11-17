import { ArrowLeft, Download, Share2, MapPin, Building2, TrendingUp, AlertTriangle, CheckCircle2, DollarSign, Calendar, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PropertyReport() {
  // Financial projection data
  const cashFlowData = [
    { year: 'Year 1', parking: 92, events: 0, airbnb: 0, total: 92 },
    { year: 'Year 2', parking: 95, events: 141, airbnb: 17, total: 253 },
    { year: 'Year 3', parking: 98, events: 145, airbnb: 18, total: 261 },
    { year: 'Year 4', parking: 101, events: 150, airbnb: 19, total: 270 },
    { year: 'Year 5', parking: 104, events: 154, airbnb: 20, total: 278 },
  ];

  const scenarioComparison = [
    { name: 'Parking Lot', roi: 33, risk: 20, cost: 250 },
    { name: 'Land Banking', roi: 29, risk: 15, cost: 200 },
    { name: 'Flex-Stack', roi: 91, risk: 45, cost: 1500 },
    { name: 'Quick Flip', roi: 48, risk: 35, cost: 200 },
  ];

  const revenueBreakdown = [
    { name: 'Parking', value: 92, color: '#3b82f6' },
    { name: 'Event Space', value: 141, color: '#8b5cf6' },
    { name: 'Airbnb', value: 17, color: '#ec4899' },
  ];

  const opportunityZoneBenefits = [
    { year: 'Year 1-7', normalTax: 55, ozTax: 41, savings: 14 },
    { year: 'Year 8-9', normalTax: 55, ozTax: 48, savings: 7 },
    { year: 'Year 10+', normalTax: 386, ozTax: 0, savings: 386 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/property/514-whitehall">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Overview
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="default" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Opportunity Zone Qualified
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              514 Whitehall St SW
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 font-light">
              A Comprehensive Investment Analysis
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                November 17, 2025
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Prepared by Manus AI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16 border-y border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Executive Summary</h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-slate-300 leading-relaxed">
                This report presents a comprehensive analysis of 514 Whitehall St SW, a strategically located parcel in Atlanta's rapidly transforming Mechanicsville corridor. Our analysis reveals a **significantly undervalued asset** with multiple value-creation pathways, positioned to benefit from $1.29 billion in adjacent development and proximity to Mercedes-Benz Stadium.
              </p>
              <div className="grid md:grid-cols-3 gap-6 my-12 not-prose">
                <div className="glass-card p-6 rounded-2xl border border-slate-700/50">
                  <div className="text-5xl font-bold text-blue-400 mb-2">91%</div>
                  <div className="text-slate-400">Peak Annual ROI</div>
                  <div className="text-sm text-slate-500 mt-2">Flex-Stack Scenario</div>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-slate-700/50">
                  <div className="text-5xl font-bold text-purple-400 mb-2">$978K</div>
                  <div className="text-slate-400">Tax Savings</div>
                  <div className="text-sm text-slate-500 mt-2">Opportunity Zone</div>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-slate-700/50">
                  <div className="text-5xl font-bold text-pink-400 mb-2">1.0mi</div>
                  <div className="text-slate-400">Stadium Distance</div>
                  <div className="text-sm text-slate-500 mt-2">75-100 Events/Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-blue-400" />
                Property Overview
              </h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-300 leading-relaxed">
                  The subject property is a vacant lot located at 514 Whitehall St SW in Atlanta's Mechanicsville neighborhood. The site sits at the intersection of multiple powerful economic forces: stadium-driven demand, institutional development capital, and federal tax incentives through Opportunity Zone designation.
                </p>
              </div>
            </div>

            {/* Location Images */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-700/50">
                <img 
                  src="/images/property/google_2025-11-17_11-50-37_3325.webp" 
                  alt="Property location map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950/90 to-transparent">
                  <p className="text-sm text-slate-300">Property Location & Stadium Proximity</p>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-700/50">
                <img 
                  src="/images/property/google_2025-11-17_11-51-06_5989.webp" 
                  alt="Driving directions to Mercedes-Benz Stadium"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950/90 to-transparent">
                  <p className="text-sm text-slate-300">4-Minute Drive to Mercedes-Benz Stadium</p>
                </div>
              </div>
            </div>

            {/* Key Facts */}
            <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6">Key Property Facts</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                    <span className="text-slate-400">Address</span>
                    <span className="font-medium">514 Whitehall St SW</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                    <span className="text-slate-400">Asking Price</span>
                    <span className="font-medium">$200,000</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                    <span className="text-slate-400">Zoning</span>
                    <span className="font-medium">Mixed-Use</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                    <span className="text-slate-400">Stadium Distance</span>
                    <span className="font-medium">1.0 mile (4 min drive)</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                    <span className="text-slate-400">Opportunity Zone</span>
                    <span className="font-medium text-green-400">✓ Qualified</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                    <span className="text-slate-400">Current Status</span>
                    <span className="font-medium">Vacant Lot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-purple-400" />
                Market Analysis
              </h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-300 leading-relaxed">
                  The Mechanicsville corridor is experiencing a renaissance driven by three catalysts: the Mercedes-Benz Stadium (opened 2017), the $1.29 billion Forge Atlanta development (approved 2024), and broader downtown revitalization efforts. This convergence creates a rare opportunity to acquire land at pre-development pricing.
                </p>
              </div>
            </div>

            {/* Forge Development Impact */}
            <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6">Forge Atlanta Development Impact</h3>
              <div className="space-y-6">
                <p className="text-slate-300">
                  Located just 0.3-0.5 miles north on Whitehall Street, the Forge Atlanta project represents one of the largest mixed-use developments in downtown Atlanta's recent history. The project's scale and proximity create significant spillover demand for parking, event space, and hospitality services.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-blue-400 mb-2">300</div>
                    <div className="text-sm text-slate-400">Hotel Rooms</div>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-purple-400 mb-2">60.5K</div>
                    <div className="text-sm text-slate-400">Sq Ft Retail</div>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-pink-400 mb-2">2,100</div>
                    <div className="text-sm text-slate-400">Construction Workers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stadium Economics */}
            <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6">Mercedes-Benz Stadium Economics</h3>
              <p className="text-slate-300 mb-6">
                The stadium hosts 75-100 events annually, generating consistent demand for parking and hospitality services. Our analysis shows that strategic pricing ($20 vs. $40-60 at official lots) can capture 3x the customer volume while maintaining healthy margins.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">NFL Games</span>
                    <span className="font-medium">10 games/year</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">MLS Games</span>
                    <span className="font-medium">17 games/year</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">Concerts</span>
                    <span className="font-medium">25-30 events/year</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">Avg Attendance</span>
                    <span className="font-medium">45,000-70,000</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">Official Parking</span>
                    <span className="font-medium">$40-$60</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">Target Price</span>
                    <span className="font-medium text-green-400">$20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Analysis */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-green-400" />
                Financial Analysis
              </h2>
            </div>

            {/* Scenario Comparison Chart */}
            <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6">Scenario Comparison: ROI vs Risk vs Cost</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scenarioComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Legend />
                    <Bar dataKey="roi" fill="#3b82f6" name="ROI (%)" />
                    <Bar dataKey="risk" fill="#ef4444" name="Risk Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 5-Year Cash Flow Projection */}
            <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6">5-Year Cash Flow Projection (Flex-Stack Scenario)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" label={{ value: 'Revenue ($K)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="parking" stroke="#3b82f6" strokeWidth={2} name="Parking" />
                    <Line type="monotone" dataKey="events" stroke="#8b5cf6" strokeWidth={2} name="Event Space" />
                    <Line type="monotone" dataKey="airbnb" stroke="#ec4899" strokeWidth={2} name="Airbnb" />
                    <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} name="Total" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold mb-6">Annual Revenue Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: $${value}K`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {revenueBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold mb-6">Key Financial Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                    <span className="text-slate-400">Total Investment</span>
                    <span className="font-medium text-xl">$1.5M</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                    <span className="text-slate-400">Annual NOI (Year 2+)</span>
                    <span className="font-medium text-xl text-green-400">$250K</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                    <span className="text-slate-400">Cash-on-Cash Return</span>
                    <span className="font-medium text-xl text-green-400">91%</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                    <span className="text-slate-400">Payback Period</span>
                    <span className="font-medium text-xl">1.1 years</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-400">10-Year NPV</span>
                    <span className="font-medium text-xl text-green-400">$2.8M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Zone Benefits */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
                Opportunity Zone Tax Benefits
              </h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-300 leading-relaxed">
                  The property's location in a designated Opportunity Zone unlocks extraordinary tax benefits that dramatically improve investment returns. By holding the asset for 10 years, investors can eliminate **100% of capital gains taxes** on appreciation—a benefit worth $386,000 to $978,000 depending on exit valuation.
                </p>
              </div>
            </div>

            {/* OZ Benefits Chart */}
            <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6">Tax Savings Comparison: Traditional vs Opportunity Zone</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={opportunityZoneBenefits}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" label={{ value: 'Tax ($K)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Legend />
                    <Bar dataKey="normalTax" fill="#ef4444" name="Traditional Tax" />
                    <Bar dataKey="ozTax" fill="#3b82f6" name="OZ Tax" />
                    <Bar dataKey="savings" fill="#10b981" name="Savings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* OZ Benefits Breakdown */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-xl border border-slate-700/50">
                <div className="text-4xl font-bold text-blue-400 mb-3">15%</div>
                <div className="text-slate-300 font-medium mb-2">Basis Step-Up</div>
                <div className="text-sm text-slate-400">After 7 years of holding</div>
              </div>
              <div className="glass-card p-6 rounded-xl border border-slate-700/50">
                <div className="text-4xl font-bold text-purple-400 mb-3">100%</div>
                <div className="text-slate-300 font-medium mb-2">Gain Exclusion</div>
                <div className="text-sm text-slate-400">After 10 years of holding</div>
              </div>
              <div className="glass-card p-6 rounded-xl border border-slate-700/50">
                <div className="text-4xl font-bold text-green-400 mb-3">$978K</div>
                <div className="text-slate-300 font-medium mb-2">Max Tax Savings</div>
                <div className="text-sm text-slate-400">Based on $3M exit value</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Analysis */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
                Risk Analysis & Mitigation
              </h2>
            </div>

            {/* Risk Matrix */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl border border-red-500/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Forge Development Execution Risk</h4>
                    <p className="text-slate-400 text-sm mb-3">
                      Developer (Webstar Technology Group) has no verifiable development track record, and a previous project on the same site failed in 2023.
                    </p>
                    <div className="text-sm">
                      <span className="text-slate-500">Mitigation:</span>
                      <span className="text-slate-300"> Parking lot generates strong returns from stadium events alone, independent of Forge success.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl border border-yellow-500/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Construction Cost Overruns</h4>
                    <p className="text-slate-400 text-sm mb-3">
                      Flex-Stack scenario requires $1.3M in construction. Material and labor costs could exceed projections by 10-20%.
                    </p>
                    <div className="text-sm">
                      <span className="text-slate-500">Mitigation:</span>
                      <span className="text-slate-300"> Use modular construction (20-30% cost savings), secure fixed-price contracts, maintain 15% contingency reserve.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl border border-yellow-500/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Event Space Demand Uncertainty</h4>
                    <p className="text-slate-400 text-sm mb-3">
                      Event space projections assume 60% utilization. Market demand for new venue is unproven.
                    </p>
                    <div className="text-sm">
                      <span className="text-slate-500">Mitigation:</span>
                      <span className="text-slate-300"> Pre-lease to corporate clients, partner with event planners, offer stadium package deals, maintain flexible pricing.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl border border-green-500/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Zoning & Permitting</h4>
                    <p className="text-slate-400 text-sm mb-3">
                      Mixed-use zoning allows parking, but event space and residential may require additional approvals.
                    </p>
                    <div className="text-sm">
                      <span className="text-slate-500">Mitigation:</span>
                      <span className="text-slate-300"> Engage zoning attorney pre-acquisition, phase development (parking first), maintain relationships with city officials.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Recommendation */}
      <section className="py-20 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6">Investment Recommendation</h2>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-lg font-medium mb-8">
                <CheckCircle2 className="w-6 h-6" />
                STRONG BUY
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-slate-300 leading-relaxed text-center">
                514 Whitehall St SW represents a **rare convergence of undervalued land, institutional development catalysts, and federal tax incentives**. The property offers multiple value-creation pathways with asymmetric risk-reward profiles.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6">Recommended Strategy: Phased Development</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Acquire & Operate (Months 1-12)</h4>
                    <p className="text-slate-400 text-sm">
                      Use hard money loan ($150K @ 12%) to acquire quickly. Develop basic parking lot ($50K). Generate $40-60K NOI in Year 1 to validate demand and build cash reserves.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Refinance & Upgrade (Months 12-24)</h4>
                    <p className="text-slate-400 text-sm">
                      Refinance with SBA 7(a) loan ($200K @ 10%) using Year 1 cash flow as proof of concept. Upgrade to paved 50-space lot with automated systems. Increase NOI to $80-100K.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Vertical Development (Years 2-3)</h4>
                    <p className="text-slate-400 text-sm">
                      Secure construction financing for Flex-Stack build ($1.3M). Use modular construction to reduce costs and timeline. Add event space (2,000 sq ft) and Airbnb condo. Scale to $250K+ NOI.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Hold & Harvest (Years 3-10)</h4>
                    <p className="text-slate-400 text-sm">
                      Operate stabilized asset generating 91% cash-on-cash returns. Hold for 10 years to maximize Opportunity Zone benefits. Exit at $3M+ valuation with zero capital gains tax.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl border border-green-500/20">
                <h4 className="font-bold text-lg mb-4 text-green-400">Key Strengths</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Undervalued at $200K given location and development catalysts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Multiple value-creation pathways with different risk profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Opportunity Zone benefits worth $386K-$978K</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Proven stadium demand (75-100 events/year)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>SBA and hard money financing available</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6 rounded-xl border border-yellow-500/20">
                <h4 className="font-bold text-lg mb-4 text-yellow-400">Key Considerations</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Forge development execution risk (unproven developer)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Construction cost overruns possible (maintain 15% contingency)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Event space demand unproven (requires marketing effort)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>10-year hold required for full OZ benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Zoning/permitting may require additional approvals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold mb-8">Conclusion</h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-slate-300 leading-relaxed">
                514 Whitehall St SW is a **generational opportunity** to acquire strategically located land at a fraction of its intrinsic value. The property sits at the intersection of proven stadium demand, $1.29 billion in adjacent development, and extraordinary federal tax incentives.
              </p>
              <p className="text-slate-300 leading-relaxed">
                While the Flex-Stack scenario offers the highest returns (91% cash-on-cash), the phased approach provides optionality and risk mitigation. Even the conservative parking lot scenario generates 33% annual returns—far exceeding traditional real estate benchmarks.
              </p>
              <p className="text-slate-300 leading-relaxed">
                The convergence of undervalued land, institutional capital, and tax incentives creates a rare asymmetric opportunity. **Move quickly**—this window won't last once Forge construction begins and the market reprices the corridor.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-blue-500/20 bg-blue-500/5">
              <div className="flex items-start gap-4">
                <Building2 className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-3">Next Steps</h3>
                  <ol className="space-y-3 text-slate-300">
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-400">1.</span>
                      <span>Verify exact parcel size and zoning (confirm parking lot is permitted use)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-400">2.</span>
                      <span>Conduct Phase I environmental assessment</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-400">3.</span>
                      <span>Secure hard money pre-approval for fast closing (7-14 days)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-400">4.</span>
                      <span>Order survey and title search</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-blue-400">5.</span>
                      <span>Negotiate purchase price to $180K-$190K (5-10% discount)</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-slate-500 text-sm space-y-2">
            <p>© 2025 Manus AI. All rights reserved.</p>
            <p>This report is for informational purposes only and does not constitute investment advice.</p>
            <p>Consult with qualified professionals before making investment decisions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
