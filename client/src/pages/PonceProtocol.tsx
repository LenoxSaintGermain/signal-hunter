import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  Home, 
  Film, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Trophy,
  Shield,
  Zap,
  Clock,
  FileText,
  Download,
  ExternalLink,
  Image as ImageIcon,
  Calculator
} from "lucide-react";
import { Link } from "wouter";
import { MapView } from "@/components/Map";
import { useState } from "react";
import FinancialCalculator from "@/components/FinancialCalculator";

export default function PonceProtocol() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-white backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Million Hunter
              </a>
            </Link>
            <div className="flex gap-4">
              <Button 
                variant="outline"
                onClick={() => setShowCalculator(!showCalculator)}
                className="gap-2"
              >
                <Calculator className="w-4 h-4" />
                {showCalculator ? "Hide" : "Show"} Calculator
              </Button>
              <Link href="/dashboard">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Urgency Banner */}
      <div className="bg-secondary border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 text-center">
            <Clock className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="text-white font-semibold">
              Property Goes Live Tomorrow • First-Mover Advantage • Speed Wins
            </span>
            <Clock className="w-5 h-5 text-red-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-primary border-yellow-500/30">
            PROJECT PONCE
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Don't Buy a House.<br />
            <span className="text-foreground font-semibold">
              Buy a Business with Real Estate Attached.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-4">
            <strong className="text-white">2165 Ponce De Leon Ave NE, Atlanta, GA 30307</strong>
          </p>
          <p className="text-lg text-slate-400 mb-8">
            Druid Hills • Walking Distance to Decatur • Film Production Hub
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-secondary border rounded-lg">
              <div className="text-sm text-slate-400">Verified Revenue</div>
              <div className="text-3xl font-bold text-foreground">$109K/yr</div>
              <div className="text-xs text-slate-500">Duplex only, audited</div>
            </div>
            <div className="p-4 bg-secondary border rounded-lg">
              <div className="text-sm text-slate-400">Full Potential</div>
              <div className="text-3xl font-bold text-foreground">$145K/yr</div>
              <div className="text-xs text-slate-500">With Coach House online</div>
            </div>
            <div className="p-4 bg-secondary border rounded-lg">
              <div className="text-sm text-slate-400">Monthly Cash Flow</div>
              <div className="text-3xl font-bold text-foreground">$5,600+</div>
              <div className="text-xs text-slate-500">After all expenses</div>
            </div>
          </div>

          <p className="text-2xl text-gray-300">
            The Market Thinks This Is a Ranch Home.<br />
            <span className="text-foreground font-bold">It's Actually a Commercial Hospitality Machine.</span>
          </p>
        </div>

        {/* The Billy Reality Check */}
        <Card className="mb-16 bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Shield className="w-6 h-6" />
              The "Billy" Reality Check
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-slate-300">
              Our advisor (Billy) is a builder-investor, not a salesman. His assessment is clear:
            </p>
            <blockquote className="border-l-4 border-orange-500 pl-4 py-2 bg-white">
              <p className="text-xl font-semibold text-white mb-2">
                "This is acquiring a small business with real estate attached."
              </p>
              <p className="text-slate-400">
                We aren't chasing "phantom equity" (buying it for less than it's worth). We are buying it at 
                <strong className="text-white"> fair market value ($900-$915K)</strong> to secure a{" "}
                <strong className="text-foreground">cash flow engine</strong> that pays us to own it.
              </p>
            </blockquote>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-secondary border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <div className="font-semibold text-red-400">The Fantasy</div>
                </div>
                <p className="text-sm text-slate-400">
                  "I found a $1.2M property for $850K! Instant equity!"
                </p>
              </div>
              <div className="p-4 bg-secondary border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-foreground" />
                  <div className="font-semibold text-foreground">The Reality</div>
                </div>
                <p className="text-sm text-slate-400">
                  "I'm buying a verified $109K/yr business with a clear path to $145K/yr."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Positioning Headlines */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardContent className="p-6">
              <Film className="w-8 h-8 text-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                The Market Says $900K. The Income Says $1.5M.
              </h3>
              <p className="text-sm text-slate-400">
                Cap rate compression in hospitality assets means this cash flow would command a premium in a normal sale.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <CardContent className="p-6">
              <DollarSign className="w-8 h-8 text-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Don't Chase Equity. Buy Cash Flow and Build Equity.
              </h3>
              <p className="text-sm text-slate-400">
                The duplex pays the mortgage today. Finishing the Coach House creates pure profit tomorrow.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <CardContent className="p-6">
              <Home className="w-8 h-8 text-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Three Doors. Two EV Chargers. One Massive Opportunity.
              </h3>
              <p className="text-sm text-slate-400">
                A gated, 3-unit compound in Druid Hills positioned perfectly for the 2026 World Cup.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Property Photos */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-foreground" />
            Property Walkthrough
          </h2>
          <Card className="bg-white border border-white/10">
            <CardContent className="p-6">
              <div className="aspect-video w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://photos.google.com/share/AF1QipNWruX3wNfIcE3NzSE970Yl4W4qt4FiKZ1pVEB0OWmXkjmWvg-INWZ__UYyUlnVMA?key=MGVKT29udEItRk83NkxBWFFia19oUHB2SVVPeDhn"
                  className="w-full h-full"
                  allow="fullscreen"
                  title="Property Photos"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">December 9, 2025 Walkthrough</p>
                  <p className="text-xs text-slate-500">Exterior, interior, Coach House, and materials on-site</p>
                </div>
                <a
                  href="https://photos.app.goo.gl/k1unnAfKJ4L1ZYqb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Full Gallery
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Map */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">Prime Location</h2>
          <Card className="bg-white border border-white/10 overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[500px] w-full">
                <MapView
                  onMapReady={(map) => {
                    // Property location
                    const propertyLocation = { lat: 33.7882, lng: -84.3235 };
                    
                    // Add property marker
                    new window.google.maps.Marker({
                      position: propertyLocation,
                      map: map,
                      title: "2165 Ponce De Leon Ave NE",
                      icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 12,
                        fillColor: "#10b981",
                        fillOpacity: 0.9,
                        strokeColor: "#ffffff",
                        strokeWeight: 2,
                      },
                    });

                    // Add proximity markers
                    const markers = [
                      { lat: 33.7555, lng: -84.4006, name: "Mercedes-Benz Stadium", color: "#3b82f6" },
                      { lat: 33.7902, lng: -84.3240, name: "Emory University", color: "#a855f7" },
                      { lat: 33.7989, lng: -84.3277, name: "CDC Headquarters", color: "#f97316" },
                      { lat: 33.7490, lng: -84.3880, name: "Downtown Atlanta", color: "#ef4444" },
                    ];

                    markers.forEach((marker) => {
                      new window.google.maps.Marker({
                        position: { lat: marker.lat, lng: marker.lng },
                        map: map,
                        title: marker.name,
                        icon: {
                          path: window.google.maps.SymbolPath.CIRCLE,
                          scale: 8,
                          fillColor: marker.color,
                          fillOpacity: 0.8,
                          strokeColor: "#ffffff",
                          strokeWeight: 2,
                        },
                      });
                    });

                    map.setCenter(propertyLocation);
                    map.setZoom(12);
                  }}
                />
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 bg-secondary border rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">10 min</div>
              <div className="text-sm text-slate-400">Mercedes-Benz Stadium</div>
            </div>
            <div className="p-4 bg-secondary border rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">5 min</div>
              <div className="text-sm text-slate-400">Emory University</div>
            </div>
            <div className="p-4 bg-secondary border rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-400">7 min</div>
              <div className="text-sm text-slate-400">CDC Headquarters</div>
            </div>
            <div className="p-4 bg-secondary border rounded-lg text-center">
              <div className="text-2xl font-bold text-red-400">12 min</div>
              <div className="text-sm text-slate-400">Downtown Atlanta</div>
            </div>
          </div>
        </div>

        {/* Due Diligence Documents */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <FileText className="w-8 h-8 text-foreground" />
            Due Diligence Documents
          </h2>
          <Card className="bg-white border border-white/10">
            <CardContent className="p-6">
              <p className="text-slate-300 mb-6">
                All disclosure documents and verified revenue data available for investor review. Click to download directly from Google Drive.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://drive.google.com/file/d/1nvxB7R-CJklGlDDfiLNVOcAvClNf0kpA/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors group"
                >
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Download className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-foreground transition-colors">
                      Seller's Property Disclosure
                    </div>
                    <div className="text-sm text-slate-400">SPD-2165PonceDeLeon.pdf • 310 KB</div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-foreground transition-colors" />
                </a>

                <a
                  href="https://drive.google.com/file/d/1nvxB7R-CJklGlDDfiLNVOcAvClNf0kpA/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors group"
                >
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Download className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-foreground transition-colors">
                      Airbnb Revenue Data (Verified)
                    </div>
                    <div className="text-sm text-slate-400">airbnb_01_2025-12_2025.csv • 12 KB</div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-foreground transition-colors" />
                </a>
              </div>
              <div className="mt-6 p-4 bg-secondary border rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold text-primary mb-1">Verified Revenue</div>
                    <div className="text-sm text-slate-300">
                      The $109,425 annual revenue figure has been audited from actual Airbnb payouts. 
                      This is not projected income - it's verified historical performance from 2025.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Calculator */}
        {showCalculator && (
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-foreground" />
              Investment Calculator
            </h2>
            <FinancialCalculator />
          </div>
        )}

        {/* The Value-Add Plan */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">The Value-Add Plan (CapEx)</h2>
          <Card className="bg-white border border-white/10">
            <CardContent className="p-6">
              <p className="text-lg text-slate-300 mb-6">
                This is not a passive flip. It is a strategic renovation play. We spend money to protect the asset and unlock the third revenue stream.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-secondary border rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-red-400 mb-1">Immediate: Oak Tree Removal</div>
                    <p className="text-sm text-slate-400 mb-2">
                      A massive oak is threatening the roofline. It must go. This scares off retail buyers - that's our advantage.
                    </p>
                    <div className="text-lg font-bold text-white">$5,000 - $8,000</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-secondary border rounded-lg">
                  <Shield className="w-6 h-6 text-foreground mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1">Immediate: Vapor Barrier & Gutter Guards</div>
                    <p className="text-sm text-slate-400 mb-2">
                      Seal the crawl space and protect the envelope. Unsexy, invisible work that scares amateurs.
                    </p>
                    <div className="text-lg font-bold text-white">~$3,000</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-secondary border rounded-lg">
                  <TrendingUp className="w-6 h-6 text-foreground mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1">Short-Term: Finish the Coach House</div>
                    <p className="text-sm text-slate-400 mb-2">
                      Insulation and drywall are ON SITE. We just need to provide the labor to unlock ~$35K/yr in new revenue.
                    </p>
                    <div className="text-lg font-bold text-white">$12,000 - $15,000</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-slate-400">Total CapEx Budget</div>
                    <div className="text-3xl font-bold text-white">~$25,000</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Unlocks Additional Revenue</div>
                    <div className="text-3xl font-bold text-foreground">$35,000/yr</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* World Cup Windfall */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            The World Cup Windfall (2026)
          </h2>
          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-yellow-500/30">
            <CardContent className="p-8">
              <p className="text-lg text-slate-300 mb-6">
                Strategic positioning for the 2026 FIFA World Cup in Atlanta. A private, gated 3-unit compound 
                in Decatur is the ideal Executive Housing solution for corporate sponsors and media teams.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">30 Days</div>
                  <div className="text-sm text-slate-400">Corporate Buyout Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-2">$60K-$90K</div>
                  <div className="text-sm text-slate-400">Projected Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-2">100%</div>
                  <div className="text-sm text-slate-400">CapEx Recovery</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-slate-300">
                  <strong className="text-primary">Impact:</strong> This single event could recover 100% of the CapEx budget 
                  plus a significant portion of the down payment in Year 2 of ownership.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financing Strategy */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <Zap className="w-8 h-8 text-orange-400" />
            The Financing Strategy: Speed is Currency
          </h2>
          <Card className="bg-white border border-white/10">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 bg-secondary border rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-6 h-6 text-red-400" />
                    <h3 className="text-xl font-bold text-red-400">Why NOT VA Loan</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Too slow (property goes live tomorrow)</li>
                    <li>• Too strict (will flag tree, unfinished garage)</li>
                    <li>• Could kill deal or cause delays</li>
                    <li>• We lose first-mover advantage</li>
                  </ul>
                </div>

                <div className="p-6 bg-secondary border rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-foreground" />
                    <h3 className="text-xl font-bold text-foreground">The Winning Strategy</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>• <strong className="text-white">Hard Money</strong> or <strong className="text-white">Conventional</strong> to close fast (21 days)</li>
                    <li>• Execute CapEx immediately (Week 1-4)</li>
                    <li>• Refinance to DSCR loan once stabilized</li>
                    <li>• Speed wins, we get the deal</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Investment Structure</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-slate-400 mb-2">Cash Investors</div>
                    <div className="text-2xl font-bold text-foreground mb-1">$50K - $200K</div>
                    <p className="text-sm text-slate-400">
                      Equity stake proportionate to investment. Use the calculator above to model your return.
                    </p>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-2">Hard Money Gap</div>
                    <div className="text-2xl font-bold text-foreground mb-1">10-12% APR</div>
                    <p className="text-sm text-slate-400">
                      Available for gap financing. Fixed return, no equity upside.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk & Mitigation */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-orange-400" />
            Risk Assessment
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-orange-400">Primary Risks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold text-white mb-1">VA Appraisal Risk</div>
                  <p className="text-sm text-slate-400">
                    <strong className="text-orange-400">Impact:</strong> Could delay or kill deal
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    <strong>Mitigation:</strong> Using Hard Money/Conventional eliminates this risk
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Tree Removal Mandatory</div>
                  <p className="text-sm text-slate-400">
                    <strong className="text-orange-400">Impact:</strong> Safety CapEx required
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    <strong>Mitigation:</strong> Budgeted at $5-8K, protects foundation long-term
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Film Industry Slowdown</div>
                  <p className="text-sm text-slate-400">
                    <strong className="text-orange-400">Impact:</strong> Reduced Hollywood demand
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    <strong>Mitigation:</strong> Emory/CDC professionals provide structural demand
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-foreground">Competitive Advantages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-white mb-1">Pre-Market Access</div>
                    <p className="text-sm text-slate-400">
                      First-mover advantage before MLS listing goes live
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-white mb-1">Verified Revenue</div>
                    <p className="text-sm text-slate-400">
                      $109K/yr audited, not projected - eliminates income risk
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-white mb-1">Materials On-Site</div>
                    <p className="text-sm text-slate-400">
                      Insulation & drywall already purchased, just needs labor
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-white mb-1">Recession-Proof Location</div>
                    <p className="text-sm text-slate-400">
                      Emory/CDC create structural demand independent of economy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Go/No-Go Decision */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">Execution Matrix</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  GO Reasons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5" />
                  <span className="text-slate-300">Duplex revenue ($109K) covers debt Day 1</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5" />
                  <span className="text-slate-300">Materials on-site to finish Unit C</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5" />
                  <span className="text-slate-300">Walking distance to Decatur/Emory</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5" />
                  <span className="text-slate-300">2026 World Cup catalyst event</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5" />
                  <span className="text-slate-300">Pre-market access (first-mover advantage)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/5 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  NO-GO Reasons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <span className="text-slate-300">Strict VA appraisal could kill deal speed</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <span className="text-slate-300">Tree removal is mandatory safety CapEx</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/10 border-green-500/40">
            <CardContent className="p-8">
              <div className="text-center">
                <Badge className="mb-4 bg-green-500/30 text-green-300 border-green-500/50 text-lg px-4 py-2">
                  RECOMMENDATION: GO
                </Badge>
                <h3 className="text-3xl font-bold text-white mb-4">
                  SECURE WITH SPEED (Conv/Hard Money)
                </h3>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                  The risk-reward asymmetry is exceptional. We are buying a verified $109K/yr business 
                  with a clear path to $145K/yr. The "hair" on the deal (tree, unfinished garage) scares 
                  off lazy money - that's our advantage. Speed financing eliminates appraisal risk and 
                  gives us first-mover advantage before the property hits MLS tomorrow.
                </p>
                <div className="mt-6 text-sm text-slate-400">
                  <strong className="text-white">Next Step:</strong> Physical inspection completed Tuesday. 
                  Fair offer to avoid bidding war. Cash investors get equity stake proportionate to investment.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/40">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Move Forward?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              This is operational arbitrage, not price arbitrage. We're buying a business that works today, 
              fixing the two things that are broken, and turning on the third revenue stream.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-6 text-lg"
                onClick={() => setShowCalculator(true)}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Run Your Numbers
              </Button>
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-6 text-lg"
                >
                  View Other Deals
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
