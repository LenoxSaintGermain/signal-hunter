import { Card, CardContent } from "@/components/ui/card";
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
  Zap
} from "lucide-react";
import { Link } from "wouter";
import { MapView } from "@/components/Map";
import { useState } from "react";

export default function PonceProtocol() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Million Hunter
              </a>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
            The Ponce Protocol
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Stop Paying for Housing.<br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Make Housing Pay You.
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-4">
            <strong className="text-white">2165 Ponce De Leon Ave NE, Atlanta, GA 30307</strong>
          </p>
          <p className="text-lg text-slate-400">
            Druid Hills • 10 min to Downtown • Film Production Hub
          </p>
          <p className="text-2xl text-gray-300 mb-8">
            You're About to Buy a Dollar for 80 Cents
          </p>
          <p className="text-xl text-gray-400">
            And the dollar pays you <span className="text-green-400 font-bold">$10,666 a month</span>
          </p>
        </div>

        {/* Positioning Headlines */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardContent className="p-6">
              <Film className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Most People Buy Houses. You're Buying a Film Studio's Favorite Hotel.
              </h3>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <CardContent className="p-6">
              <DollarSign className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                $1.2M in Equity Currently Buys You Zero Groceries
              </h3>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <CardContent className="p-6">
              <Home className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                The Market Thinks This Is a Ranch Home. It's Actually a Commercial Hospitality Machine.
              </h3>
            </CardContent>
          </Card>
        </div>

        {/* Location Map */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">Prime Location</h2>
          <Card className="bg-black/40 border-white/10 overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[500px] w-full">
                <MapView
                  onMapReady={(map) => {
                    // Property location
                    const propertyLocation = { lat: 33.7881, lng: -84.3406 };
                    
                    // Add property marker
                    new window.google.maps.Marker({
                      position: propertyLocation,
                      map: map,
                      title: "2165 Ponce De Leon Ave NE",
                      icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 12,
                        fillColor: "#10b981",
                        fillOpacity: 1,
                        strokeColor: "#ffffff",
                        strokeWeight: 3,
                      },
                    });

                    // Add nearby points of interest
                    const poi = [
                      { name: "Mercedes-Benz Stadium", lat: 33.7553, lng: -84.4006, color: "#3b82f6" },
                      { name: "Emory University", lat: 33.7920, lng: -84.3240, color: "#8b5cf6" },
                      { name: "CDC Headquarters", lat: 33.7990, lng: -84.3270, color: "#f59e0b" },
                      { name: "Downtown Atlanta", lat: 33.7490, lng: -84.3880, color: "#ef4444" },
                    ];

                    poi.forEach(point => {
                      new window.google.maps.Marker({
                        position: { lat: point.lat, lng: point.lng },
                        map: map,
                        title: point.name,
                        icon: {
                          path: window.google.maps.SymbolPath.CIRCLE,
                          scale: 8,
                          fillColor: point.color,
                          fillOpacity: 0.8,
                          strokeColor: "#ffffff",
                          strokeWeight: 2,
                        },
                      });
                    });

                    // Center and zoom
                    map.setCenter(propertyLocation);
                    map.setZoom(12);
                  }}
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">10 min</div>
                    <div className="text-sm text-slate-400">to Mercedes-Benz Stadium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">5 min</div>
                    <div className="text-sm text-slate-400">to Emory University</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">7 min</div>
                    <div className="text-sm text-slate-400">to CDC Headquarters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">12 min</div>
                    <div className="text-sm text-slate-400">to Downtown Atlanta</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Pitch */}
        <Card className="mb-16 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
          <CardContent className="p-8">
            <p className="text-xl leading-relaxed">
              <strong>2165 Ponce De Leon</strong> isn't real estate—it's <strong>arbitrage wrapped in brick</strong>. 
              While banks see a residential property, Hollywood sees their preferred crew housing, and you see a business 
              that eliminates your housing costs while your current home becomes pure profit.
            </p>
          </CardContent>
        </Card>

        {/* The Misclassification Advantage */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">The Misclassification Advantage</h2>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed mb-6">
                Here's what the market missed: this property is listed as 'residential' in a sleepy 'Coming Soon' status, 
                priced at <strong className="text-red-400">$384 per square foot</strong> while neighbors trade at{" "}
                <strong className="text-green-400">$457</strong>. That's not a discount—that's a{" "}
                <strong className="text-green-400">$170,000 gift</strong> from a seller who doesn't understand what they built.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                They created a turnkey hospitality operation that happens to qualify for VA/FHA financing. It's the investment 
                equivalent of finding a Picasso at a garage sale because it was mislabeled as 'decorative art.'
              </p>
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-6">
                <p className="text-lg italic text-yellow-200">
                  "The best deals aren't found—they're misunderstood by everyone else."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Numbers */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">The Numbers Don't Lie</h2>
          
          {/* Key Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-black/40 border-white/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">$915K</div>
                <div className="text-sm text-gray-400">Purchase Price</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">$170K</div>
                <div className="text-sm text-gray-300">Instant Equity</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">$128K/yr</div>
                <div className="text-sm text-gray-300">Proven Revenue</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-white/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">$6,200/mo</div>
                <div className="text-sm text-gray-400">Monthly PITI</div>
              </CardContent>
            </Card>
          </div>

          {/* Scenarios */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Home className="w-6 h-6 text-purple-400" />
                  Live-In Scenario
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Revenue (2 units rented)</span>
                    <span className="text-xl font-bold text-green-400">$7,100/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Expenses (mortgage PITI)</span>
                    <span className="text-xl font-bold text-red-400">-$6,200/mo</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Net Cash Flow</span>
                      <span className="text-2xl font-bold text-green-400">+$900/mo</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Housing eliminated</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  Full Rental Scenario
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Revenue (all 3 units)</span>
                    <span className="text-xl font-bold text-green-400">$10,666/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Expenses (mortgage PITI)</span>
                    <span className="text-xl font-bold text-red-400">-$6,200/mo</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Net Cash Flow</span>
                      <span className="text-2xl font-bold text-green-400">+$4,466/mo</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">14% cash-on-cash return</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* The Hollywood Rolodex */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">The Hollywood Rolodex</h2>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed mb-6">
                This isn't Airbnb arbitrage—it's <strong>B2B hospitality masquerading as residential real estate</strong>. 
                The current owner works in entertainment and has cultivated direct relationships with film production companies. 
                These aren't tourists booking Friday-to-Sunday; these are production crews booking{" "}
                <strong className="text-blue-400">30-90 day stays</strong> at premium rates with studio insurance backing every reservation.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">
                    Direct studio relationships transfer with the sale—you're acquiring their client list, not just their property
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">
                    Location within 10 minutes of major film production facilities creates structural demand independent of tourist seasonality
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">
                    Fallback tenants are built-in: Emory University faculty, CDC contractors, and traveling medical professionals 
                    create a triple-redundant demand moat
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Friction Elimination */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">The Friction Elimination</h2>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed mb-6">
                Moving is psychologically brutal because of transition costs—the renovation paralysis, the furniture shopping, 
                the chaos of setting up utilities while living in boxes. <strong>This deal eliminates all of it</strong>.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                The property was renovated in 2024 (new roof, HVAC, electrical), comes fully furnished, and is currently operating. 
                Shivonne's practice moves into the detached Carriage House on Day 1 with zero build-out required. You move your 
                clothes and personal items. The heavy furniture stays at Moores Mill to command higher rental premiums.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                You're not moving—you're upgrading to a turnkey business that happens to include your living space.
              </p>
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6">
                <p className="text-lg italic text-blue-200">
                  "The hardest part of any investment is the activation energy. This one is already activated."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* World Cup Windfall */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            The World Cup Windfall
          </h2>
          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed mb-6">
                In <strong className="text-yellow-400">June 2026</strong>, Atlanta hosts FIFA World Cup matches. For 30 days, 
                you control a 3-unit compound 10 minutes from downtown during the largest sporting event on Earth.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Corporate sponsors (Nike, Visa, Coca-Cola) pay <strong className="text-green-400">$50K-$100K</strong> to house 
                executives in private compounds rather than hotels. You vacate for one month, collect the equivalent of{" "}
                <strong className="text-green-400">12-16 months of normal cash flow</strong>, and return to a property that 
                just paid its own mortgage for the next year.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Event Duration</div>
                  <div className="text-2xl font-bold">30 Days</div>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Projected Revenue</div>
                  <div className="text-2xl font-bold text-green-400">$50K-$100K</div>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Impact</div>
                  <div className="text-xl font-bold">8-16 Months Mortgage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risks */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-orange-400" />
            What Could Go Wrong
          </h2>
          <div className="space-y-4">
            {[
              {
                risk: "Moores Mill Tax Increase",
                impact: "Losing homestead exemption adds ~$10K/year in property taxes",
                mitigation: "Moores Mill generates $144K/year in rental income. A $10K tax increase still leaves $134K in annual profit—98% margin absorption."
              },
              {
                risk: "Film Industry Slowdown",
                impact: "Hollywood production declines or relocates, eliminating premium film crew bookings",
                mitigation: "Pivot to mid-term rentals for Emory/CDC professionals or convert to traditional long-term tenants. Location near institutional employers creates structural demand regardless of entertainment industry cycles."
              },
              {
                risk: "Lender Resistance to Income Verification",
                impact: "Banks may not recognize direct booking revenue not shown on tax returns",
                mitigation: "Seller providing redacted bank statements showing actual cash flow. Alternative: use stronger Moores Mill equity position to qualify on conventional DTI ratios alone."
              },
              {
                risk: "Moving Logistics with Young Children",
                impact: "Stress and disruption to family routine during transition",
                mitigation: "Property is fully furnished and turnkey. Move consists of clothes and personal items only. Heavy furniture remains at Moores Mill for tenant use, eliminating 80% of moving friction."
              }
            ].map((item, idx) => (
              <Card key={idx} className="bg-black/40 border-orange-500/20">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Shield className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-orange-400">{item.risk}</h3>
                      <p className="text-gray-300 mb-3">
                        <strong>Impact:</strong> {item.impact}
                      </p>
                      <p className="text-gray-300">
                        <strong className="text-green-400">Mitigation:</strong> {item.mitigation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Decision Framework */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">The Go/No-Go Framework</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* GO Reasons */}
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-8 h-8" />
                  GO Reasons
                </h3>
                <div className="space-y-4">
                  {[
                    "$170,000 instant equity on acquisition—buying at 16% below market value creates immediate safety margin",
                    "Proven $128K annual revenue with transferable client relationships eliminates ramp-up risk",
                    "Zero housing cost scenario while Moores Mill becomes 100% profit center—transforms $1.2M dead equity into income engine",
                    "2026 World Cup catalyst provides defined liquidity event worth 12-16 months of cash flow",
                    "Turnkey operation with 2024 renovations and full furnishings removes execution risk and moving friction"
                  ].map((reason, idx) => (
                    <div key={idx} className="flex gap-3">
                      <Zap className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300">{reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* NO-GO Reasons */}
            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-400">
                  <XCircle className="w-8 h-8" />
                  NO-GO Reasons
                </h3>
                <div className="space-y-4">
                  {[
                    "Moores Mill tax increase of $10K/year requires absorption (though easily covered by rental income)",
                    "Film industry concentration risk requires diversification strategy if Hollywood slows"
                  ].map((reason, idx) => (
                    <div key={idx} className="flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300">{reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendation */}
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 rounded-full p-3">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4 text-green-400">
                    Recommendation: GO
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-200">
                    <strong>Pending physical inspection Tuesday.</strong> The risk-reward asymmetry is exceptional: 
                    you're acquiring a cash-flowing business at a 16% discount with transferable B2B relationships, 
                    eliminating your housing costs while converting existing equity into income. The downside is capped 
                    (property maintains residential use value), while upside includes instant equity, ongoing cash flow, 
                    World Cup windfall, and Mexico exit optionality.
                  </p>
                  <p className="text-xl font-bold mt-4 text-green-300">
                    This is textbook asymmetric opportunity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-6">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
