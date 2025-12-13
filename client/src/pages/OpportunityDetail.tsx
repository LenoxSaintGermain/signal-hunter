import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Download, Mail, ExternalLink, Lightbulb, AlertTriangle, TrendingUp, Shield, Sparkles, Loader2, BrainCircuit } from "lucide-react";
import ReactMarkdown from "react-markdown";
import AnalysisScoreCard from "@/components/AnalysisScoreCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

export default function OpportunityDetail() {
  // Try both routes
  const [matchOpportunity, paramsOpportunity] = useRoute("/opportunity/:id");
  const [matchDeal, paramsDeal] = useRoute("/deal/:id");

  const params = matchOpportunity ? paramsOpportunity : paramsDeal;
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

      {/* Header with Signal Spark Glassmorphism */}
      <div className="pt-20 border-b border-primary/10 bg-gradient-to-b from-background/95 to-background/50 backdrop-blur-xl sticky top-0 z-40 supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary/80 tracking-tight">{deal.name}</h1>
                <Badge variant={deal.score && deal.score >= 80 ? "default" : "secondary"} className="text-sm px-3 py-1 shadow-sm shadow-primary/20">
                  Score: {deal.score || 'N/A'}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">{deal.stage || "lead"}</Badge></span>
                <span>•</span>
                <span>{deal.industry || "Unknown Industry"}</span>
                <span>•</span>
                <span>{deal.location || "Unknown Location"}</span>
                <span>•</span>
                <span>Added {new Date(deal.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
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
            <Card className="border-primary/5 shadow-xl shadow-primary/5 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-primary/90">Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">Asking Price</p>
                    <p className="text-2xl font-bold text-foreground font-mono tracking-tight">${deal.price?.toLocaleString() || 'N/A'}</p>
                    <p className="text-xs text-primary/80 mt-1 font-medium">{multiples.revenue} Rev</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">Annual Revenue</p>
                    <p className="text-2xl font-bold text-foreground font-mono tracking-tight">${deal.revenue?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">Cash Flow</p>
                    <p className="text-2xl font-bold text-foreground font-mono tracking-tight">${deal.cashFlow?.toLocaleString() || 'N/A'}</p>
                    <p className="text-xs text-primary/80 mt-1 font-medium">{multiples.cashFlow} CF</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">SDE Margin</p>
                    <p className="text-2xl font-bold text-foreground font-mono tracking-tight">{deal.sdeMargin ? (deal.sdeMargin * 100).toFixed(1) : 'N/A'}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Deep Dive Section */}
            {!analysisResult ? (
              <Card className="border-primary/20 bg-primary/5 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <CardContent className="py-12 flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Unlock Deep Intelligence</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Activate our Multi-Model AI Engine (GPT-5, Claude, Gemini) to generate a comprehensive thesis, risk analysis, and strategic roadmap.
                  </p>
                  <Button size="lg" onClick={handleRunAnalysis} disabled={analyzeMutation.isPending} className="gap-2 shadow-lg shadow-primary/25">
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
              /* AI Analysis Results */
              <div className="space-y-6">
                <AnalysisScoreCard
                  overallScore={analysisResult.overallScore}
                  confidence={analysisResult.confidence}
                  consensus={analysisResult.consensus}
                  models={analysisResult.models}
                  summary={analysisResult.summary}
                  topStrengths={analysisResult.topStrengths}
                  topRisks={analysisResult.topRisks}
                />

                {/* Investment Thesis */}
                <Card className="border-l-4 border-l-yellow-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      Investment Thesis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <ReactMarkdown>{analysisResult.summary}</ReactMarkdown>
                    </div>
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
                <Card className="border-l-4 border-l-orange-500/50">
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
            <Card className="border-primary/10 shadow-lg shadow-teal-500/5">
              <CardHeader>
                <CardTitle>Scoring Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  {analysisResult ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Deal" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.5} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))' }}
                          itemStyle={{ color: '#06b6d4' }}
                        />
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

            {/* Property Visuals - Regression Fix */}
            <Card className="overflow-hidden border-primary/20 shadow-lg shadow-blue-500/5 group cursor-pointer hover:border-primary/50 transition-colors">
              <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                {/* Fallback Image / Placeholder */}
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"
                  alt="Property"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Property Photos
                  </h3>
                  <p className="text-xs text-white/80">View full album on Google Photos</p>
                </div>
              </div>
              <CardContent className="p-0">
                <Button variant="ghost" className="w-full rounded-none h-12 gap-2 hover:bg-primary/5">
                  Open Google Photo Algorithm
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
