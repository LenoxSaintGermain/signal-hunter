import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Minus,
  Brain,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Bot,
  Search,
  LineChart,
  ShieldCheck,
  FileText
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface AIModelScore {
  model: string;
  score: number;
  confidence: number;
  reasoning: string;
  strengths: string[];
  risks: string[];
  recommendation: "strong_buy" | "buy" | "hold" | "pass";
}

interface AnalysisScoreCardProps {
  overallScore: number;
  confidence: number;
  consensus: "strong_buy" | "buy" | "hold" | "pass";
  models: AIModelScore[];
  summary: string;
  topStrengths: string[];
  topRisks: string[];
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
};

const getScoreBgColor = (score: number) => {
  if (score >= 80) return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800";
  if (score >= 60) return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800";
  return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800";
};

const getRecommendationIcon = (rec: string) => {
  switch (rec) {
    case "strong_buy": return <TrendingUp className="w-5 h-5 text-green-600" />;
    case "buy": return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
    case "hold": return <Minus className="w-5 h-5 text-yellow-600" />;
    case "pass": return <XCircle className="w-5 h-5 text-red-600" />;
    default: return <Info className="w-5 h-5" />;
  }
};

const getRecommendationLabel = (rec: string) => {
  switch (rec) {
    case "strong_buy": return "Strong Buy";
    case "buy": return "Buy";
    case "hold": return "Hold";
    case "pass": return "Pass";
    default: return rec;
  }
};

const getRecommendationBadgeVariant = (rec: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (rec) {
    case "strong_buy": return "default";
    case "buy": return "secondary";
    case "hold": return "outline";
    case "pass": return "destructive";
    default: return "outline";
  }
};

// Agent Persona Mapping
const getAgentPersona = (modelName: string) => {
  const name = modelName.toLowerCase();
  if (name.includes("perplexity") || name.includes("sonar")) {
    return { name: "Market Scout Agent", icon: <Search className="w-4 h-4" />, role: "Market Research & Trends" };
  }
  if (name.includes("gpt")) {
    return { name: "Strategic Advisor Agent", icon: <Brain className="w-4 h-4" />, role: "Synthesis & Strategy" };
  }
  if (name.includes("gemini")) {
    return { name: "Financial Analyst Agent", icon: <LineChart className="w-4 h-4" />, role: "Quantitative Analysis" };
  }
  if (name.includes("grok")) {
    return { name: "Risk Assessment Agent", icon: <ShieldCheck className="w-4 h-4" />, role: "Critical Risk Factors" };
  }
  if (name.includes("claude")) {
    return { name: "Due Diligence Agent", icon: <FileText className="w-4 h-4" />, role: "Comprehensive Review" };
  }
  return { name: "General Analyst Agent", icon: <Bot className="w-4 h-4" />, role: "Analysis" };
};

export default function AnalysisScoreCard({
  overallScore,
  confidence,
  consensus,
  models,
  summary,
  topStrengths,
  topRisks,
}: AnalysisScoreCardProps) {
  const [expandedModels, setExpandedModels] = useState<Set<string>>(new Set());

  const toggleModel = (modelName: string) => {
    setExpandedModels(prev => {
      const next = new Set(prev);
      if (next.has(modelName)) {
        next.delete(modelName);
      } else {
        next.add(modelName);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="border-2 border-primary/20 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Brain className="w-6 h-6 text-primary" />
                AI Analysis Report
              </CardTitle>
              <CardDescription className="mt-1">
                Unified consensus from {models.length} specialized agents
              </CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-5xl font-bold tracking-tighter ${getScoreColor(overallScore)}`}>
                {overallScore}
              </div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">Score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress
              value={overallScore}
              className="h-2"
            />
          </div>

          {/* Consensus Recommendation */}
          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background rounded-full shadow-sm">
                {getRecommendationIcon(consensus)}
              </div>
              <div>
                <div className="font-semibold text-sm">Consensus Recommendation</div>
                <div className="text-xs text-muted-foreground">
                  High confidence alignment
                </div>
              </div>
            </div>
            <Badge variant={getRecommendationBadgeVariant(consensus)} className="text-sm px-3 py-1 font-semibold">
              {getRecommendationLabel(consensus)}
            </Badge>
          </div>

          {/* Summary */}
          <div className="p-5 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border border-blue-100 dark:border-blue-900 rounded-xl">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900/80 dark:text-blue-100/80">
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Executive Summary</p>
                <div className="prose prose-sm max-w-none text-blue-900/80 dark:text-blue-100/80">
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {/* Top Strengths & Risks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {topStrengths.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Key Strengths
                </h4>
                <ul className="space-y-2">
                  {topStrengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-foreground/90 flex items-start gap-2 bg-green-50/50 dark:bg-green-950/10 p-2 rounded border border-green-100 dark:border-green-900/20">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {topRisks.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Risk Factors
                </h4>
                <ul className="space-y-2">
                  {topRisks.map((risk, idx) => (
                    <li key={idx} className="text-sm text-foreground/90 flex items-start gap-2 bg-amber-50/50 dark:bg-amber-950/10 p-2 rounded border border-amber-100 dark:border-amber-900/20">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Agent Reports */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Agent Reports
        </h3>
        <div className="space-y-3">
          {models.map((model, idx) => {
            const agent = getAgentPersona(model.model);
            return (
              <Collapsible
                key={idx}
                open={expandedModels.has(model.model)}
                onOpenChange={() => toggleModel(model.model)}
              >
                <div className={`rounded-xl border transition-all duration-200 ${expandedModels.has(model.model) ? 'bg-card shadow-md ring-1 ring-primary/10' : 'bg-card hover:bg-secondary/40'} ${getScoreBgColor(model.score)} bg-opacity-30 border-opacity-60`}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full p-4 h-auto hover:bg-transparent flex flex-col items-stretch">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-background shadow-sm border border-border`}>
                            {agent.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-base">{agent.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                              <span className="opacity-70">Powered by {model.model}</span>
                              <span className="w-1 h-1 rounded-full bg-border" />
                              <span>{agent.role}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <div className={`text-xl font-bold ${getScoreColor(model.score)}`}>
                              {model.score}
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase text-right">Score</div>
                          </div>

                          <Badge variant={getRecommendationBadgeVariant(model.recommendation)} className="h-7 px-3">
                            {getRecommendationLabel(model.recommendation)}
                          </Badge>
                        </div>
                      </div>
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-0">
                      <div className="h-px w-full bg-border/50 mb-4" />

                      {/* Reasoning */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          <FileText className="w-3 h-3" />
                          Analysis
                        </div>
                        <div className="prose prose-sm max-w-none bg-background/50 p-4 rounded-lg border border-border/50">
                          <ReactMarkdown>{model.reasoning}</ReactMarkdown>
                        </div>
                      </div>

                      {/* Strengths & Risks Mini Grid */}
                      {(model.strengths.length > 0 || model.risks.length > 0) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {model.strengths.length > 0 && (
                            <div>
                              <div className="text-xs font-medium text-green-600 mb-2 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> STRENGTHS
                              </div>
                              <ul className="space-y-1">
                                {model.strengths.slice(0, 3).map((s, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                                    <span className="text-green-500">•</span> {s}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {model.risks.length > 0 && (
                            <div>
                              <div className="text-xs font-medium text-amber-600 mb-2 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> RISKS
                              </div>
                              <ul className="space-y-1">
                                {model.risks.slice(0, 3).map((r, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                                    <span className="text-amber-500">•</span> {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
      </div>
    </div>
  );
}
