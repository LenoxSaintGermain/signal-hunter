import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Download, Mail, ExternalLink, Lightbulb, AlertTriangle, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OpportunityData {
  listing_id: string;
  title: string;
  final_score: number;
  rank: number;
  sector: string;
  location: string;
  revenue: string;
  cash_flow: string;
  asking_price: string;
  components: {
    sde_margin: number;
    revenue_growth: number;
    cash_flow_quality: number;
    ai_potential: number;
    cert_advantage: number;
    seller_financing: number;
    seller_motivation: number;
  };
  red_flags: {
    flags: string[];
    penalty: number;
    has_red_flags: boolean;
  };
}

export default function OpportunityDetail() {
  const [, params] = useRoute("/opportunity/:id");
  const [opportunity, setOpportunity] = useState<OpportunityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading opportunity data
    setTimeout(() => {
      const mockData: OpportunityData = {
        listing_id: params?.id || "1",
        title: "HVAC Service Company - Atlanta Metro",
        final_score: 0.89,
        rank: 1,
        sector: "HVAC",
        location: "Atlanta, GA",
        revenue: "$2,500,000",
        cash_flow: "$750,000",
        asking_price: "$2,250,000",
        components: {
          sde_margin: 0.18,
          revenue_growth: 0.09,
          cash_flow_quality: 0.14,
          ai_potential: 0.22,
          cert_advantage: 0.13,
          seller_financing: 0.09,
          seller_motivation: 0.04
        },
        red_flags: {
          flags: [],
          penalty: 0,
          has_red_flags: false
        }
      };
      
      setOpportunity(mockData);
      setLoading(false);
    }, 300);
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading opportunity...</div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Opportunity Not Found</h2>
          <Link href="/dashboard">
            <a className="text-primary hover:underline">Return to Dashboard</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-6">
          <Link href="/dashboard">
            <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </a>
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{opportunity.title}</h1>
                <Badge variant="default" className="bg-green-500">
                  Score: {(opportunity.final_score * 100).toFixed(0)}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Rank #{opportunity.rank}</span>
                <span>•</span>
                <span>{opportunity.sector}</span>
                <span>•</span>
                <span>{opportunity.location}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Contact Broker
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                View Listing
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Financial Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Annual Revenue</p>
                    <p className="text-2xl font-bold text-foreground">{opportunity.revenue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cash Flow (SDE)</p>
                    <p className="text-2xl font-bold text-foreground">{opportunity.cash_flow}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Asking Price</p>
                    <p className="text-2xl font-bold text-foreground">{opportunity.asking_price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Score Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(opportunity.components).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground capitalize">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          {(value * 100).toFixed(1)}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all"
                          style={{ width: `${value * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Investment Thesis */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Thesis</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <h3 className="text-foreground">Strategic Rationale</h3>
                <p className="text-muted-foreground">
                  This HVAC service company represents a compelling acquisition opportunity with strong fundamentals 
                  and significant AI-driven growth potential. The business operates in a high-demand sector with 
                  recurring revenue streams and opportunities for government contract expansion.
                </p>
                
                <h3 className="text-foreground mt-6">Value Creation Opportunities</h3>
                <ul className="text-muted-foreground">
                  <li>AI-powered lead generation and customer acquisition (20-40% revenue increase)</li>
                  <li>Process automation and operational efficiency (10-25% cost reduction)</li>
                  <li>Government contract expansion via SDVOSB certification</li>
                  <li>Geographic expansion into adjacent markets</li>
                </ul>

                <h3 className="text-foreground mt-6">Risk Factors</h3>
                <ul className="text-muted-foreground">
                  <li>Market competition and pricing pressure</li>
                  <li>Key person dependency during transition</li>
                  <li>Economic sensitivity to construction cycles</li>
                </ul>
              </CardContent>
            </Card>

            {/* AI Strategic Recommendations */}
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                  <CardTitle>AI Strategic Recommendations</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Immediate: Secure Government Contracts</h4>
                      <p className="text-sm text-muted-foreground">
                        Leverage SDVOSB certification to pursue federal HVAC maintenance contracts. Target military bases 
                        and federal buildings in the Atlanta metro area. Estimated contract value: $500K-$1M annually.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Month 1-3: Deploy AI-Powered CRM</h4>
                      <p className="text-sm text-muted-foreground">
                        Implement automated lead capture and routing system. Use predictive analytics to identify 
                        high-value maintenance contracts. Expected ROI: 3-5x within first year.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Month 4-6: Optimize Pricing Strategy</h4>
                      <p className="text-sm text-muted-foreground">
                        Implement dynamic pricing algorithms based on demand, seasonality, and customer lifetime value. 
                        Target 5-10% margin improvement without customer loss.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Month 7-12: Geographic Expansion</h4>
                      <p className="text-sm text-muted-foreground">
                        Expand into adjacent counties leveraging World Cup 2026 construction boom. Focus on commercial 
                        HVAC for new hotels, venues, and infrastructure projects.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-sm">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Year 2: Add Preventive Maintenance Contracts</h4>
                      <p className="text-sm text-muted-foreground">
                        Launch IoT-enabled predictive maintenance service. Use sensors to monitor HVAC systems and 
                        prevent failures. Target 30% of customer base for recurring contracts.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-green-500">Expected Impact:</span> 35-50% revenue increase, 
                      20-30% margin expansion within 24 months
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Potential Risks Analysis */}
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <CardTitle>Potential Risks & Mitigation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-orange-500/20 bg-background">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Key Person Dependency</h4>
                      <Badge variant="destructive" className="bg-orange-500">High Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Current owner handles major client relationships and technical oversight. Loss of owner 
                      knowledge could impact service quality and customer retention.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Mitigation:</span> Negotiate 12-month 
                          transition period with owner as consultant. Document all processes and client relationships. 
                          Hire experienced HVAC operations manager before closing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-orange-500/20 bg-background">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Market Competition</h4>
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500">Medium Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Atlanta HVAC market is competitive with national chains and local operators. Price pressure 
                      could erode margins if not differentiated.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Mitigation:</span> Focus on government 
                          contracts where SDVOSB certification provides competitive advantage. Differentiate with 
                          AI-powered predictive maintenance. Build premium service brand.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-orange-500/20 bg-background">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Economic Sensitivity</h4>
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500">Medium Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      HVAC services tied to construction and real estate cycles. Economic downturn could reduce 
                      new installation revenue.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Mitigation:</span> Shift revenue mix toward 
                          recurring maintenance contracts (60%+ of revenue). Government contracts provide stable base. 
                          Maintenance and repair services are counter-cyclical.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-orange-500/20 bg-background">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Technology Integration</h4>
                      <Badge variant="outline" className="border-blue-500 text-blue-500">Low Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      AI and automation implementation may face resistance from existing technicians. Integration 
                      costs and learning curve could delay ROI.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Mitigation:</span> Phase AI implementation 
                          over 18 months. Start with back-office automation (scheduling, invoicing) before field 
                          operations. Provide training and incentives for technology adoption.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-orange-500/20 bg-background">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Regulatory Compliance</h4>
                      <Badge variant="outline" className="border-blue-500 text-blue-500">Low Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      HVAC industry subject to licensing, EPA refrigerant regulations, and safety standards. 
                      Non-compliance could result in fines or license suspension.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Mitigation:</span> Conduct thorough 
                          compliance audit during due diligence. Ensure all technicians properly licensed. 
                          Implement compliance management system. Maintain insurance coverage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">
                      <span className="font-semibold text-green-500">Overall Risk Assessment:</span> Moderate risk 
                      profile with clear mitigation strategies. Risks are manageable with proper planning.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="default">
                  Schedule Call
                </Button>
                <Button className="w-full" variant="outline">
                  Request Info
                </Button>
                <Button className="w-full" variant="outline">
                  Add to Watch List
                </Button>
              </CardContent>
            </Card>

            {/* Red Flags */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                {opportunity.red_flags.has_red_flags ? (
                  <div className="space-y-2">
                    {opportunity.red_flags.flags.map((flag, index) => (
                      <Badge key={index} variant="destructive" className="mr-2">
                        {flag.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                    <p className="text-sm text-muted-foreground mt-4">
                      Score penalty: {(opportunity.red_flags.penalty * 100).toFixed(0)}%
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✓</div>
                    <p className="text-sm text-green-500 font-medium">No Red Flags Detected</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Clean due diligence profile
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Optimization Potential */}
            <Card>
              <CardHeader>
                <CardTitle>AI Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Efficiency Gains</p>
                    <p className="text-lg font-bold text-foreground">15-30%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cost Reduction</p>
                    <p className="text-lg font-bold text-foreground">10-25%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Revenue Increase</p>
                    <p className="text-lg font-bold text-foreground">20-40%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
