import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Phone, 
  Calculator,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Home,
  Film
} from "lucide-react";
import { useState } from "react";
import FinancialCalculator from "@/components/FinancialCalculator";
import InvestorIntakeModal from "@/components/InvestorIntakeModal";

export default function PonceProtocolV2() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showInvestorModal, setShowInvestorModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Persistent CTA Panel - Right Sticky */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:block">
        <Card className="bg-slate-900/90 backdrop-blur border-amber-500/20 p-6 space-y-4 w-64">
          <h3 className="text-lg font-semibold text-amber-400">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              onClick={() => setShowCalculator(!showCalculator)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Run Your Numbers
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-amber-500/50 hover:bg-amber-500/10"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Film className="w-4 h-4 mr-2" />
              View Full Gallery
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-amber-500/50 hover:bg-amber-500/10"
              onClick={() => document.getElementById('due-diligence')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Download className="w-4 h-4 mr-2" />
              Download DD
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-amber-500/50 hover:bg-amber-500/10"
            >
              <Phone className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="container max-w-5xl mx-auto px-4 py-12 space-y-16">
        
        {/* 1. HERO SNAPSHOT - Executive Summary HUD */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="outline" className="border-amber-500 text-amber-400 px-4 py-2 text-sm">
              PROJECT PONCE
            </Badge>
            <Badge variant="outline" className="border-emerald-500 text-emerald-400 px-4 py-2 text-sm">
              EXECUTIVE SUMMARY
            </Badge>
          </div>

          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-amber-500/30 p-8">
            <h1 className="text-4xl font-bold text-white mb-6">
              A hospitality-focused, cash-flowing asset in Druid Hills
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Verified $109K/yr revenue with a clear path to $145K/yr+. This is not a house purchase — 
              it's an operational hospitality business with real estate attached.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-400">Address</div>
                    <div className="text-white font-medium">2165 Ponce De Leon Ave NE, Atlanta, GA 30307</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-400">Verified Revenue (Duplex)</div>
                    <div className="text-emerald-400 font-bold text-xl">$109,425 / yr</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-400">Full Potential Revenue</div>
                    <div className="text-blue-400 font-bold text-xl">~$145,000+ / yr</div>
                    <div className="text-xs text-slate-500">(Coach House online)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-400">Projected Cash Flow</div>
                    <div className="text-purple-400 font-bold text-xl">$5,600+ / month</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-400">CapEx Required</div>
                    <div className="text-orange-400 font-bold text-xl">~$25,000</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-400">Why This Deal Exists</div>
                    <div className="text-white text-sm">Tree damage risk + unfinished coach house repel retail buyers</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setShowInvestorModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Join Investor List
              </Button>
              <Button 
                onClick={() => setShowCalculator(!showCalculator)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Run Your Numbers
              </Button>
              <Button 
                variant="outline" 
                className="border-amber-500/50 hover:bg-amber-500/10"
                onClick={() => document.getElementById('due-diligence')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Due Diligence
              </Button>
              <Button 
                variant="outline" 
                className="border-amber-500/50 hover:bg-amber-500/10"
                onClick={() => window.open('https://calendar.google.com/calendar/u/0?cid=MTk5NzM0OGRmYWJkYTY3YTdmN2EyOGVlYTMzNGM4MzgyMTczMzlmYTllNDUzOTk1Y2Q2YzE3NWU2NDUwODRhZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Schedule Investor Call
              </Button>
            </div>
          </Card>
        </section>

        {/* Financial Calculator */}
        {showCalculator && (
          <section className="space-y-6">
            <FinancialCalculator />
          </section>
        )}

        {/* 2. WHAT YOU'RE ACTUALLY BUYING */}
        <section className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              This Is Not a House. It's a Business With Real Estate Attached.
            </h2>
            <p className="text-lg text-slate-300 mb-6">
              Most buyers see a ranch home. They're wrong. This is a proven hospitality engine with three 
              revenue streams across a gated, multi-unit compound steps from Decatur and Emory.
            </p>
          </div>

          <Card className="bg-slate-900/50 border-amber-500/30 p-6">
            <div className="flex items-start gap-4">
              <div className="w-1 h-full bg-amber-500 rounded"></div>
              <div>
                <div className="text-sm text-amber-400 font-semibold mb-2">INVESTOR INSIGHT</div>
                <p className="text-lg italic text-slate-200">
                  "This is acquiring a small business with real estate attached."
                </p>
                <p className="text-sm text-slate-400 mt-2">— Billy, Builder/Investor Advisor</p>
              </div>
            </div>
          </Card>

          <p className="text-slate-300">
            You're not chasing phantom equity. You're buying verified income and unlocking additional upside 
            through targeted execution.
          </p>
        </section>

        {/* 3. WHY THIS ASSET IS MISPRICED */}
        <section className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              The Market Sees a $900K House. The Income Says $1.5M.
            </h2>
          </div>

          <p className="text-slate-300">
            This deal exists because the property has "hair" that scares off retail buyers:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-slate-900/50 border-orange-500/30 p-6">
              <AlertTriangle className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Oak Tree Threat</h3>
              <p className="text-sm text-slate-400">Large oak tree threatening the roofline</p>
            </Card>

            <Card className="bg-slate-900/50 border-orange-500/30 p-6">
              <Home className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Unfinished Unit</h3>
              <p className="text-sm text-slate-400">Coach house needs completion (materials on site)</p>
            </Card>

            <Card className="bg-slate-900/50 border-orange-500/30 p-6">
              <TrendingUp className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Misclassified</h3>
              <p className="text-sm text-slate-400">Comps treat it as a standard ranch home</p>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border-emerald-500/30 p-6">
            <p className="text-lg text-white font-semibold">
              These factors create <span className="text-emerald-400">pricing asymmetry</span> — a business-level 
              revenue engine being sold at residential pricing.
            </p>
          </Card>
        </section>

        {/* 4. THE REVENUE ENGINE */}
        <section className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              Three Revenue Streams. One Compound. Day-One Cash Flow.
            </h2>
          </div>

          <div className="space-y-4">
            {/* Stream 1 */}
            <Card className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 border-emerald-500/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-emerald-500 text-white mb-2">TODAY — DUPLEX (IN MARKET)</Badge>
                  <h3 className="text-2xl font-bold text-emerald-400">$109,425 verified</h3>
                </div>
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  Airbnb revenue (audited payouts, not projections)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  Covers debt service immediately
                </li>
              </ul>
            </Card>

            {/* Stream 2 */}
            <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 border-blue-500/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-blue-500 text-white mb-2">TOMORROW — COACH HOUSE (FINISH WORK NEEDED)</Badge>
                  <h3 className="text-2xl font-bold text-blue-400">Adds ~$35,000 / yr</h3>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Materials on-site: insulation + drywall
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Only requires labor
                </li>
              </ul>
            </Card>

            {/* Stream 3 */}
            <Card className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 border-amber-500/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-amber-500 text-slate-900 mb-2">CATALYST EVENT — 2026 WORLD CUP</Badge>
                  <h3 className="text-2xl font-bold text-amber-400">$60,000 – $90,000 projected</h3>
                </div>
                <TrendingUp className="w-8 h-8 text-amber-400" />
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                  30-day corporate buyout
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                  Recovers 100% of CapEx + part of down payment
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* 5. EXECUTION TIMELINE */}
        <section className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              Speed = Alpha. Execution = Upside.
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-emerald-500"></div>

            <div className="space-y-8">
              {/* Week 1-2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-slate-900 relative z-10">
                  W1-2
                </div>
                <Card className="flex-1 bg-slate-900/50 border-purple-500/30 p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Critical Safety & Protection</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      Tree removal ($5–8K)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      Vapor barrier + gutter guards (~$3K)
                    </li>
                  </ul>
                </Card>
              </div>

              {/* Week 3-4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-slate-900 relative z-10">
                  W3-4
                </div>
                <Card className="flex-1 bg-slate-900/50 border-blue-500/30 p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Revenue Unlock</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Finish coach house (labor only)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Materials already onsite
                    </li>
                  </ul>
                </Card>
              </div>

              {/* Month 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-slate-900 relative z-10">
                  M1
                </div>
                <Card className="flex-1 bg-slate-900/50 border-emerald-500/30 p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Full Revenue Stabilization</h3>
                  <p className="text-slate-300">Coach House live → $145K/yr run rate achieved</p>
                </Card>
              </div>

              {/* Month 2+ */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-slate-900 relative z-10">
                  M2+
                </div>
                <Card className="flex-1 bg-slate-900/50 border-amber-500/30 p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Debt Optimization</h3>
                  <p className="text-slate-300">DSCR refinance to lock favorable long-term debt</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FINANCING STRATEGY */}
        <section className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              The Winning Move Is Speed Financing.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-4 text-slate-300 font-semibold">Option</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Pros</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Cons</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Verdict</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="p-4 text-white font-semibold">VA Loan</td>
                  <td className="p-4 text-slate-300">Great rate</td>
                  <td className="p-4 text-slate-300">Slow, appraisal risk, flags "hair"</td>
                  <td className="p-4">
                    <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/50">
                      Do Not Use
                    </Badge>
                  </td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="p-4 text-white font-semibold">Hard Money</td>
                  <td className="p-4 text-slate-300">Fastest close, flexible</td>
                  <td className="p-4 text-slate-300">Higher interest</td>
                  <td className="p-4">
                    <Badge className="bg-emerald-500 text-white">
                      Primary Strategy
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-semibold">Conventional</td>
                  <td className="p-4 text-slate-300">Lower rate</td>
                  <td className="p-4 text-slate-300">Slower than HM</td>
                  <td className="p-4">
                    <Badge className="bg-blue-500 text-white">
                      Secondary Strategy
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Card className="bg-amber-900/20 border-amber-500/30 p-6">
            <p className="text-lg text-slate-200">
              The property goes live soon. <span className="text-amber-400 font-semibold">Speed is your competitive edge.</span> VA 
              introduces fatal delays; HM/Conventional secures the asset immediately.
            </p>
          </Card>
        </section>

        {/* 7. RISK & MITIGATION MATRIX */}
        <section className="space-y-6">
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              Risk & Mitigation Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-4 text-slate-300 font-semibold">Risk</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Impact</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Mitigation</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="p-4 text-white">VA Appraisal Issues</td>
                  <td className="p-4">
                    <Badge variant="destructive" className="bg-red-500/20 text-red-400">High</Badge>
                  </td>
                  <td className="p-4 text-slate-300">Use HM/Conventional</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-emerald-400 font-semibold">90%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="p-4 text-white">Tree Threat</td>
                  <td className="p-4">
                    <Badge className="bg-orange-500/20 text-orange-400">Medium</Badge>
                  </td>
                  <td className="p-4 text-slate-300">Remove immediately</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                      <span className="text-emerald-400 font-semibold">95%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="p-4 text-white">Film Industry Slowdown</td>
                  <td className="p-4">
                    <Badge className="bg-orange-500/20 text-orange-400">Medium</Badge>
                  </td>
                  <td className="p-4 text-slate-300">Emory/CDC demand stabilizes</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-emerald-400 font-semibold">85%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-white">Execution Delays</td>
                  <td className="p-4">
                    <Badge className="bg-orange-500/20 text-orange-400">Medium</Badge>
                  </td>
                  <td className="p-4 text-slate-300">Materials onsite</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-emerald-400 font-semibold">80%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. LOCATION VALUE */}
        <section className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              The Location Prints Money — No Matter the Economy.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card className="bg-blue-900/20 border-blue-500/30 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">Mercedes-Benz Stadium</span>
                  <Badge className="bg-blue-500 text-white">10 min</Badge>
                </div>
              </Card>

              <Card className="bg-purple-900/20 border-purple-500/30 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">Emory University</span>
                  <Badge className="bg-purple-500 text-white">5 min</Badge>
                </div>
              </Card>

              <Card className="bg-orange-900/20 border-orange-500/30 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">CDC Headquarters</span>
                  <Badge className="bg-orange-500 text-white">7 min</Badge>
                </div>
              </Card>

              <Card className="bg-red-900/20 border-red-500/30 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">Downtown Atlanta</span>
                  <Badge className="bg-red-500 text-white">12 min</Badge>
                </div>
              </Card>
            </div>

            <Card className="bg-slate-900/50 border-slate-700 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Demand Drivers</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Medical professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">CDC and Emory staff</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Film crews</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Corporate executive rentals</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* 9. DUE DILIGENCE VAULT */}
        <section id="due-diligence" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              Verified Revenue. Transparent Documentation.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700 p-6 hover:border-amber-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Seller's Property Disclosure</h3>
                  <p className="text-sm text-slate-400 mb-4">PDF · 310 KB</p>
                  <Button 
                    variant="outline" 
                    className="border-amber-500/50 hover:bg-amber-500/10"
                    onClick={() => window.open('https://drive.google.com/file/d/1nvxB7R-CJklGlDDfiLNVOcAvClNf0kpA/view', '_blank')}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700 p-6 hover:border-emerald-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Airbnb Revenue Data (Verified)</h3>
                  <p className="text-sm text-slate-400 mb-4">CSV · 12 KB</p>
                  <Button 
                    variant="outline" 
                    className="border-emerald-500/50 hover:bg-emerald-500/10"
                    onClick={() => window.open('https://drive.google.com/file/d/1nvxB7R-CJklGlDDfiLNVOcAvClNf0kpA/view', '_blank')}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 10. GO / NO-GO DECISION MATRIX */}
        <section className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              The Asymmetry Is Clear.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* GO Reasons */}
            <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-500/50 p-6">
              <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                GO Reasons
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200">Duplex revenue covers debt Day 1</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200">Materials onsite to finish Unit C</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200">Walkable to Decatur + Emory + CDC</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200">2026 World Cup revenue catalyst</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200">Pre-market access = no bidding wars</span>
                </li>
              </ul>
            </Card>

            {/* NO-GO Reasons */}
            <Card className="bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-500/50 p-6">
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                NO-GO Reasons
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200">Tree removal required</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200">VA loan appraisal will kill speed</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Recommendation */}
          <Card className="bg-gradient-to-r from-amber-900/40 to-emerald-900/40 border-amber-500/50 p-8">
            <div className="text-center space-y-4">
              <Badge className="bg-emerald-500 text-white text-lg px-6 py-2">
                RECOMMENDATION
              </Badge>
              <h3 className="text-3xl font-bold text-white">
                GO — Secure With Speed (Hard Money / Conventional)
              </h3>
              <p className="text-xl text-slate-300">
                This is operational arbitrage, not price arbitrage.
              </p>
            </div>
          </Card>
        </section>

        {/* 11. FINAL CTA */}
        <section className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-amber-500/50 p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to move forward?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              This asset is a cash-flow engine with verified income, asymmetric risk, and a clear execution plan.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => setShowCalculator(!showCalculator)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-lg px-8 py-6"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Run Your Numbers
              </Button>
              <Button 
                variant="outline" 
                className="border-amber-500/50 hover:bg-amber-500/10 text-lg px-8 py-6"
              >
                <Phone className="w-5 h-5 mr-2" />
                Join Investor List
              </Button>
              <Button 
                variant="outline" 
                className="border-amber-500/50 hover:bg-amber-500/10 text-lg px-8 py-6"
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule Call
              </Button>
            </div>
          </Card>
        </section>

        {/* Gallery Placeholder - Will be implemented in next phase */}
        <section id="gallery" className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              Property Walkthrough
            </h2>
          </div>
          <Card className="bg-slate-900/50 border-slate-700 p-12 text-center">
            <Film className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 mb-6">
              Mixed-media gallery coming soon. View photos and videos from the December 9, 2025 walkthrough.
            </p>
            <Button 
              variant="outline" 
              className="border-amber-500/50 hover:bg-amber-500/10"
              onClick={() => window.open('https://photos.app.goo.gl/k1unnAfKJ4L1ZYqb7', '_blank')}
            >
              <Film className="w-4 h-4 mr-2" />
              Open Full Gallery
            </Button>
          </Card>
        </section>

      </div>

      {/* Investor Intake Modal */}
      <InvestorIntakeModal 
        isOpen={showInvestorModal}
        onClose={() => setShowInvestorModal(false)}
        opportunityId="ponce-protocol"
        opportunityName="Ponce Protocol"
      />
    </div>
  );
}
