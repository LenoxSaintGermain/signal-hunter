import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Download, Mail, ExternalLink, Lightbulb, AlertTriangle, TrendingUp, Shield, Sparkles, Loader2, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

export default function OpportunityDetail() {
  const [, params] = useRoute("/opportunity/:id");
  const dealId = params?.id ? parseInt(params.id) : 0;

  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Fetch deal data
  const { data: deal, isLoading, error } = trpc.dealsV2.getById.useQuery(
    { id: dealId },
    { enabled: !!dealId }
  );

  // Analysis mutation
  const analyzeMutation = trpc.analysis.trigger.useMutation({
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast.success(`Analysis Complete! Score: ${data.overallScore}/100`);
    },
    onError: (err) => {
      toast.error(`Analysis failed: ${err.message}`);
    },
  });

  const handleRunAnalysis = () => {
    toast.info("Initializing Top Grader Agents (GPT-5, Claude, Gemini)...");
    analyzeMutation.mutate({ dealId });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <div className="text-muted-foreground">Loading opportunity data...</div>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Opportunity Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested deal could not be loaded.</p>
          <Link href="/dashboard">
            <Button variant="default">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate generic metrics if not present
  const multiples = {
    revenue: deal.revenue && deal.price ? (deal.price / deal.revenue).toFixed(2) + 'x' : 'N/A',
    cashFlow: deal.cashFlow && deal.price ? (deal.price / deal.cashFlow).toFixed(2) + 'x' : 'N/A',
  };

  // Prepare Chart Data
  const radarData = analysisResult ? [
    { subject: 'Financials', A: deal.score || 75, fullMark: 100 },
    { subject: 'Growth', A: deal.aiPotential || 50, fullMark: 100 },
    { subject: 'Market', A: 85, fullMark: 100 }, // Mock market score
    { subject: 'Risk', A: 100 - (analysisResult.topRisks?.length * 10 || 20), fullMark: 100 },
    { subject: 'Synergy', A: deal.certAdvantage || 60, fullMark: 100 },
    { subject: 'Terms', A: 70, fullMark: 100 },
  ] : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="/dashboard" />

      {/* Header */}
      <div className="pt-20 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <Link href="/dashboard">
            <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </a>
          </Link>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">{deal.name}</h1>
                <Badge variant={deal.score && deal.score >= 80 ? "default" : "secondary"} className="text-sm px-3 py-1">
                  Score: {deal.score || 'N/A'}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Badge variant="outline">{deal.stage || "lead"}</Badge></span>
                <span>•</span>
                <span>{deal.industry || "Unknown Industry"}</span>
                <span>•</span>
                <span>{deal.location || "Unknown Location"}</span>
                <span>•</span>
                <span>Added {new Date(deal.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Source
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Financial Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Asking Price</p>
                    <p className="text-2xl font-bold text-foreground">${deal.price?.toLocaleString() || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground mt-1">{multiples.revenue} Rev</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Annual Revenue</p>
                    <p className="text-2xl font-bold text-foreground">${deal.revenue?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cash Flow</p>
                    <p className="text-2xl font-bold text-foreground">${deal.cashFlow?.toLocaleString() || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground mt-1">{multiples.cashFlow} CF</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">SDE Margin</p>
                    <p className="text-2xl font-bold text-foreground">{deal.sdeMargin ? (deal.sdeMargin * 100).toFixed(1) : 'N/A'}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Deep Dive Section */}
            {!analysisResult ? (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Unlock Deep Intelligence</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Activate our Multi-Model AI Engine (GPT-5, Claude, Gemini) to generate a comprehensive thesis, risk analysis, and strategic roadmap.
                  </p>
                  <Button size="lg" onClick={handleRunAnalysis} disabled={analyzeMutation.isPending} className="gap-2">
                    {analyzeMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing across 5 models...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Deep Analysis
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Consensus Banner */}
                <div className={`p-4 rounded-lg border flex items-center justify-between ${analysisResult.consensus === 'strong_buy' ? 'bg-green-500/10 border-green-500/20' :
                    analysisResult.consensus === 'pass' ? 'bg-red-500/10 border-red-500/20' :
                      'bg-yellow-500/10 border-yellow-500/20'
                  }`}>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-foreground" />
                    <div>
                      <h4 className="font-bold text-lg">AI Consensus: {analysisResult.consensus.toUpperCase().replace('_', ' ')}</h4>
                      <p className="text-sm text-muted-foreground">Confidence: {(analysisResult.confidence * 100).toFixed(0)}% • Based on {analysisResult.models.length} Models</p>
                    </div>
                  </div>
                  <div className="text-2xl font-black">{analysisResult.overallScore}/100</div>
                </div>

                {/* Investment Thesis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      Investment Thesis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {analysisResult.summary}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Key Strengths</h4>
                      <ul className="space-y-1">
                        {analysisResult.topStrengths.map((strength: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Shield className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.topRisks.map((risk: string, i: number) => (
                        <li key={i} className="p-3 bg-secondary/30 rounded-md border border-border text-sm flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Model Breakdown Tabs */}
                <Tabs defaultValue="gpt">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Model Perspectives</h3>
                    <TabsList>
                      <TabsTrigger value="gpt">GPT-5.1</TabsTrigger>
                      <TabsTrigger value="claude">Claude</TabsTrigger>
                      <TabsTrigger value="perplexity">Perplexity</TabsTrigger>
                    </TabsList>
                  </div>
                  {analysisResult.models.map((model: any, i: number) => (
                    <TabsContent key={i} value={model.model.toLowerCase().includes('gpt') ? 'gpt' : model.model.toLowerCase().includes('claude') ? 'claude' : 'perplexity'}>
                      <Card>
                        <CardHeader className="py-3">
                          <CardTitle className="text-base flex justify-between">
                            {model.model}
                            <span className={model.recommendation === 'buy' ? 'text-green-500' : 'text-yellow-500'}>
                              {model.recommendation.toUpperCase()}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          {model.reasoning.substring(0, 500)}...
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>

              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Score Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Scoring Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  {analysisResult ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Deal" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-sm bg-secondary/20 rounded-lg">
                      Run analysis to see radar chart
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Strategic Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-xs uppercase text-muted-foreground font-semibold mb-2">AI Leverage</div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: `${deal.aiPotential || 50}%` }}></div>
                    </div>
                    <span className="text-sm font-bold">{deal.aiPotential || 50}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase text-muted-foreground font-semibold mb-2">Gov Cert Advantage</div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${deal.certAdvantage || 50}%` }}></div>
                    </div>
                    <span className="text-sm font-bold">{deal.certAdvantage || 50}%</span>
                  </div>
                </div>

                {deal.opportunityZone && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Opportunity Zone Eligible</span>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
