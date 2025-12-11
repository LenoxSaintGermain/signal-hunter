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
import Navigation from "@/components/Navigation";

export default function PonceProtocol() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navigation currentPage="/property/ponce-protocol" />

      {/* Urgency Banner - Adjusted for Top Nav */}
      <div className="bg-secondary border-b border-border mt-16">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 text-center">
            <Clock className="w-5 h-5 text-destructive animate-pulse" />
            <span className="text-foreground font-semibold text-sm md:text-base">
              Property Goes Live Tomorrow • First-Mover Advantage • Speed Wins
            </span>
            <Clock className="w-5 h-5 text-destructive animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            PROJECT PONCE
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
            Don't Buy a House.<br />
            <span className="text-foreground/80 font-semibold">
              Buy a Business with Real Estate Attached.
            </span>
          </h1>
          <p className="text-xl text-foreground mb-4">
            <strong className="text-foreground">2165 Ponce De Leon Ave NE, Atlanta, GA 30307</strong>
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            Druid Hills • Walking Distance to Decatur • Film Production Hub
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-secondary border border-border rounded-lg">
              <div className="text-sm text-muted-foreground">Verified Revenue</div>
              <div className="text-3xl font-bold text-foreground">$109K/yr</div>
              <div className="text-xs text-muted-foreground">Duplex only, audited</div>
            </div>
            <div className="p-4 bg-secondary border border-border rounded-lg">
              <div className="text-sm text-muted-foreground">Full Potential</div>
              <div className="text-3xl font-bold text-foreground">$145K/yr</div>
              <div className="text-xs text-muted-foreground">With Coach House online</div>
            </div>
            <div className="p-4 bg-secondary border border-border rounded-lg">
              <div className="text-sm text-muted-foreground">Monthly Cash Flow</div>
              <div className="text-3xl font-bold text-foreground">$5,600+</div>
              <div className="text-xs text-muted-foreground">After all expenses</div>
            </div>
          </div>

          <p className="text-2xl text-foreground">
            The Market Thinks This Is a Ranch Home.<br />
            <span className="text-foreground font-bold">It's Actually a Commercial Hospitality Machine.</span>
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowCalculator(!showCalculator)}
              className="gap-2"
            >
              <Calculator className="w-4 h-4" />
              {showCalculator ? "Hide" : "Show"} Calculator
            </Button>
          </div>
        </div>

        {/* The Billy Reality Check */}
        <Card className="mb-16 bg-card border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="w-6 h-6" />
              The "Billy" Reality Check
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-foreground">
              Our advisor (Billy) is a builder-investor, not a salesman. His assessment is clear:
            </p>
            <blockquote className="border-l-4 border-primary pl-4 py-2 bg-secondary/30">
              <p className="text-xl font-semibold text-foreground mb-2">
                "This is acquiring a small business with real estate attached."
              </p>
              <p className="text-muted-foreground">
                We aren't chasing "phantom equity" (buying it for less than it's worth). We are buying it at
                <strong className="text-foreground"> fair market value ($900-$915K)</strong> to secure a{" "}
                <strong className="text-foreground">cash flow engine</strong> that pays us to own it.
              </p>
            </blockquote>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-secondary border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-destructive" />
                  <div className="font-semibold text-destructive">The Fantasy</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "I found a $1.2M property for $850K! Instant equity!"
                </p>
              </div>
              <div className="p-4 bg-secondary border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-foreground" />
                  <div className="font-semibold text-foreground">The Reality</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "I'm buying a verified $109K/yr business with a clear path to $145K/yr."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Positioning Headlines */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-white border border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <Film className="w-8 h-8 text-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                The Market Says $900K. The Income Says $1.5M.
              </h3>
              <p className="text-sm text-muted-foreground">
                Cap rate compression in hospitality assets means this cash flow would command a premium in a normal sale.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <DollarSign className="w-8 h-8 text-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Don't Chase Equity. Buy Cash Flow and Build Equity.
              </h3>
              <p className="text-sm text-muted-foreground">
                The duplex pays the mortgage today. Finishing the Coach House creates pure profit tomorrow.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <Home className="w-8 h-8 text-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Three Doors. Two EV Chargers. One Massive Opportunity.
              </h3>
              <p className="text-sm text-muted-foreground">
                A gated, 3-unit compound in Druid Hills positioned perfectly for the 2026 World Cup.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Property Photos */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3 text-foreground">
            <ImageIcon className="w-8 h-8 text-foreground" />
            Property Walkthrough
          </h2>
          <Card className="bg-white border border-border">
            <CardContent className="p-6">
              <div className="aspect-video w-full bg-secondary rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://photos.google.com/share/AF1QipNWruX3wNfIcE3NzSE970Yl4W4qt4FiKZ1pVEB0OWmXkjmWvg-INWZ__UYyUlnVMA?key=MGVKT29udEItRk83NkxBWFFia19oUHB2SVVPeDhn"
                  className="w-full h-full"
                  allow="fullscreen"
                  title="Property Photos"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">December 9, 2025 Walkthrough</p>
                  <p className="text-xs text-muted-foreground">Exterior, interior, Coach House, and materials on-site</p>
                </div>
                <a
                  href="https://photos.app.goo.gl/k1unnAfKJ4L1ZYqb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-foreground transition-colors"
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
          <h2 className="text-4xl font-bold mb-6 text-foreground">Prime Location</h2>
          <Card className="bg-white border border-border overflow-hidden">
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
                        fillColor: "#10b981", // Brand color (can't use variable in JS API easily)
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
            <div className="p-4 bg-secondary border border-border rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">10 min</div>
              <div className="text-sm text-muted-foreground">Mercedes-Benz Stadium</div>
            </div>
            <div className="p-4 bg-secondary border border-border rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">5 min</div>
              <div className="text-sm text-muted-foreground">Emory University</div>
            </div>
            <div className="p-4 bg-secondary border border-border rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">7 min</div>
              <div className="text-sm text-muted-foreground">CDC Headquarters</div>
            </div>
            <div className="p-4 bg-secondary border border-border rounded-lg text-center">
              <div className="text-2xl font-bold text-destructive">12 min</div>
              <div className="text-sm text-muted-foreground">Downtown Atlanta</div>
            </div>
          </div>
        </div>

        {/* Due Diligence Documents */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3 text-foreground">
            <FileText className="w-8 h-8 text-foreground" />
            Due Diligence Documents
          </h2>
          <Card className="bg-white border border-border">
            <CardContent className="p-6">
              <p className="text-foreground mb-6">
                All disclosure documents and verified revenue data available for investor review. Click to download directly from Google Drive.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://drive.google.com/file/d/1nvxB7R-CJklGlDDfiLNVOcAvClNf0kpA/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-secondary hover:bg-secondary/80 border border-border rounded-lg transition-colors group"
                >
                  <div className="p-3 bg-white border border-border rounded-lg">
                    <Download className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground group-hover:text-foreground transition-colors">
                      Seller's Property Disclosure
                    </div>
                    <div className="text-sm text-muted-foreground">SPD-2165PonceDeLeon.pdf • 310 KB</div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>

                <a
                  href="https://drive.google.com/file/d/1nvxB7R-CJklGlDDfiLNVOcAvClNf0kpA/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-secondary hover:bg-secondary/80 border border-border rounded-lg transition-colors group"
                >
                  <div className="p-3 bg-white border border-border rounded-lg">
                    <Download className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground group-hover:text-foreground transition-colors">
                      Airbnb Revenue Data (Verified)
                    </div>
                    <div className="text-sm text-muted-foreground">airbnb_01_2025-12_2025.csv • 12 KB</div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              </div>
              <div className="mt-6 p-4 bg-secondary border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold text-primary mb-1">Verified Revenue</div>
                    <div className="text-sm text-foreground">
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
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3 text-foreground">
              <Calculator className="w-8 h-8 text-foreground" />
              Investment Calculator
            </h2>
            <FinancialCalculator />
          </div>
        )}

        {/* The Value-Add Plan */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 text-foreground">The Value-Add Plan (CapEx)</h2>
          <Card className="bg-white border border-border">
            <CardContent className="p-6">
              <p className="text-lg text-foreground mb-6">
                This is not a passive flip. It is a strategic renovation play. We spend money to protect the asset and unlock the third revenue stream.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-secondary border border-border rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-destructive mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-destructive mb-1">Immediate: Oak Tree Removal</div>
                    <p className="text-sm text-muted-foreground mb-2">
                      A massive oak is threatening the roofline. It must go. This scares off retail buyers - that's our advantage.
                    </p>
                    <div className="text-lg font-bold text-foreground">$5,000 - $8,000</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-secondary border border-border rounded-lg">
                  <Shield className="w-6 h-6 text-foreground mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1">Immediate: Vapor Barrier & Gutter Guards</div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Seal the crawl space and protect the envelope. Unsexy, invisible work that scares amateurs.
                    </p>
                    <div className="text-lg font-bold text-foreground">~$3,000</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-secondary border border-border rounded-lg">
                  <TrendingUp className="w-6 h-6 text-foreground mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1">Short-Term: Finish the Coach House</div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Insulation and drywall are ON SITE. We just need to provide the labor to unlock ~$35K/yr in new revenue.
                    </p>
                    <div className="text-lg font-bold text-foreground">$12,000 - $15,000</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-6 bg-secondary border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Total CapEx Budget</div>
                    <div className="text-3xl font-bold text-foreground">~$25,000</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Unlocks Additional Revenue</div>
                    <div className="text-3xl font-bold text-foreground">$35,000/yr</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* World Cup Windfall */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3 text-foreground">
            <Trophy className="w-8 h-8 text-primary" />
            The World Cup Windfall (2026)
          </h2>
          <Card className="bg-primary/5 border border-primary/20">
            <CardContent className="p-8">
              <p className="text-lg text-foreground mb-6">
                Strategic positioning for the 2026 FIFA World Cup in Atlanta. A private, gated 3-unit compound
                in Decatur is the ideal Executive Housing solution for corporate sponsors and media teams.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">30 Days</div>
                  <div className="text-sm text-muted-foreground">Corporate Buyout Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-2">$60K-$90K</div>
                  <div className="text-sm text-muted-foreground">Projected Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">CapEx Recovery</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white border border-border rounded-lg">
                <p className="text-sm text-foreground">
                  <strong className="text-primary">Impact:</strong> This single event could recover 100% of the CapEx budget
                  plus a significant portion of the down payment in Year 2 of ownership.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financing Strategy */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3 text-foreground">
            <Zap className="w-8 h-8 text-primary" />
            The Financing Strategy: Speed is Currency
          </h2>
          <Card className="bg-white border border-border">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 bg-secondary border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-6 h-6 text-destructive" />
                    <h3 className="text-xl font-bold text-destructive">Why NOT VA Loan</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Too slow (property goes live tomorrow)</li>
                    <li>• Too strict (will flag tree, unfinished garage)</li>
                    <li>• Could kill deal or cause delays</li>
                    <li>• We lose first-mover advantage</li>
                  </ul>
                </div>

                <div className="p-6 bg-secondary border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-foreground" />
                    <h3 className="text-xl font-bold text-foreground">The Winning Strategy</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong className="text-foreground">Hard Money</strong> or <strong className="text-foreground">Conventional</strong> to close fast (21 days)</li>
                    <li>• Execute CapEx immediately (Week 1-4)</li>
                    <li>• Refinance to DSCR loan once stabilized</li>
                    <li>• Speed wins, we get the deal</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-4">Investment Structure</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Cash Investors</div>
                    <div className="text-2xl font-bold text-foreground mb-1">$50K - $200K</div>
                    <p className="text-sm text-muted-foreground">
                      Equity stake proportionate to investment. Use the calculator above to model your return.
                    </p>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Hard Money Gap</div>
                    <div className="text-2xl font-bold text-foreground mb-1">10-12% APR</div>
                    <p className="text-sm text-muted-foreground">
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
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3 text-foreground">
            <AlertTriangle className="w-8 h-8 text-primary" />
            Risk Assessment
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-primary">Primary Risks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold text-foreground mb-1">VA Appraisal Risk</div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-primary">Impact:</strong> Could delay or kill deal
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    <strong>Mitigation:</strong> Using Hard Money/Conventional eliminates this risk
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Tree Removal Mandatory</div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-primary">Impact:</strong> Safety CapEx required
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    <strong>Mitigation:</strong> Budgeted at $5-8K, protects foundation long-term
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Film Industry Slowdown</div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-primary">Impact:</strong> Reduced Hollywood demand
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    <strong>Mitigation:</strong> Emory/CDC professionals provide structural demand
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-border hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="text-foreground">Competitive Advantages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Pre-Market Access</div>
                    <p className="text-sm text-muted-foreground">
                      First-mover advantage before MLS listing goes live
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Verified Revenue</div>
                    <p className="text-sm text-muted-foreground">
                      $109K/yr audited, not projected - eliminates income risk
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Materials On-Site</div>
                    <p className="text-sm text-muted-foreground">
                      Insulation & drywall already purchased, just needs labor
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-1" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Recession-Proof Location</div>
                    <p className="text-sm text-muted-foreground">
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
          <h2 className="text-4xl font-bold mb-6 text-foreground">Execution Matrix</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white border border-primary/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  GO Reasons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground">Duplex revenue ($109K) covers debt Day 1</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground">Materials on-site to finish Unit C</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground">Walking distance to Decatur/Emory</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground">2026 World Cup catalyst event</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-foreground">Pre-market access (first-mover advantage)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-destructive/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  NO-GO Reasons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                  <span className="text-foreground">Strict VA appraisal could kill deal speed</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                  <span className="text-foreground">Tree removal is mandatory safety CapEx</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border border-primary/20">
            <CardContent className="p-8">
              <div className="text-center">
                <Badge className="mb-4 bg-primary text-primary-foreground text-lg px-4 py-2">
                  RECOMMENDATION: GO
                </Badge>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  SECURE WITH SPEED (Conv/Hard Money)
                </h3>
                <p className="text-lg text-foreground max-w-3xl mx-auto">
                  The risk-reward asymmetry is exceptional. We are buying a verified $109K/yr business
                  with a clear path to $145K/yr. The "hair" on the deal (tree, unfinished garage) scares
                  off lazy money - that's our advantage. Speed financing eliminates appraisal risk and
                  gives us first-mover advantage before the property hits MLS tomorrow.
                </p>
                <div className="mt-6 text-sm text-muted-foreground">
                  <strong className="text-foreground">Next Step:</strong> Physical inspection completed Tuesday.
                  Fair offer to avoid bidding war. Cash investors get equity stake proportionate to investment.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-secondary/50 border border-border">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Ready to Move Forward?</h2>
            <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
              This is operational arbitrage, not price arbitrage. We're buying a business that works today,
              fixing the two things that are broken, and turning on the third revenue stream.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
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
