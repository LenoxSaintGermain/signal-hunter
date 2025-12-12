import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Brain,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  if (score >= 80) return "bg-green-100 dark:bg-green-950";
  if (score >= 60) return "bg-yellow-100 dark:bg-yellow-950";
  return "bg-red-100 dark:bg-red-950";
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
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                AI Analysis Score
              </CardTitle>
              <CardDescription>
                Multi-model consensus from 5 AI systems
              </CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </div>
              <div className="text-sm text-muted-foreground">out of 100</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Score</span>
              <span className="font-medium">{overallScore}/100</span>
            </div>
            <Progress 
              value={overallScore} 
              className="h-3"
            />
          </div>

          {/* Consensus Recommendation */}
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-3">
              {getRecommendationIcon(consensus)}
              <div>
                <div className="font-semibold">Consensus Recommendation</div>
                <div className="text-sm text-muted-foreground">
                  Based on {models.length} AI model{models.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <Badge variant={getRecommendationBadgeVariant(consensus)} className="text-base px-4 py-2">
              {getRecommendationLabel(consensus)}
            </Badge>
          </div>

          {/* Confidence Level */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Confidence Level</span>
            <div className="flex items-center gap-2">
              <Progress value={confidence * 100} className="w-24 h-2" />
              <span className="text-sm font-medium">{(confidence * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-1">Executive Summary</p>
                <p>{summary}</p>
              </div>
            </div>
          </div>

          {/* Top Strengths */}
          {topStrengths.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Top Strengths
              </h4>
              <ul className="space-y-1">
                {topStrengths.map((strength, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Top Risks */}
          {topRisks.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Key Risks
              </h4>
              <ul className="space-y-1">
                {topRisks.map((risk, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Individual Model Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Model Scores</CardTitle>
          <CardDescription>
            Detailed breakdown from each AI model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {models.map((model, idx) => (
            <Collapsible
              key={idx}
              open={expandedModels.has(model.model)}
              onOpenChange={() => toggleModel(model.model)}
            >
              <div className={`p-4 rounded-lg border ${getScoreBgColor(model.score)}`}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full p-0 h-auto hover:bg-transparent">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-bold ${getScoreColor(model.score)}`}>
                          {model.score}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{model.model}</div>
                          <div className="text-xs text-muted-foreground">
                            Confidence: {(model.confidence * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getRecommendationBadgeVariant(model.recommendation)}>
                          {getRecommendationLabel(model.recommendation)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {expandedModels.has(model.model) ? "▼" : "▶"}
                        </span>
                      </div>
                    </div>
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4 space-y-3">
                  {/* Reasoning */}
                  <div>
                    <h5 className="text-sm font-semibold mb-1">Reasoning</h5>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {model.reasoning}
                    </p>
                  </div>

                  {/* Strengths */}
                  {model.strengths.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        Strengths
                      </h5>
                      <ul className="space-y-1">
                        {model.strengths.map((strength, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Risks */}
                  {model.risks.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Risks
                      </h5>
                      <ul className="space-y-1">
                        {model.risks.map((risk, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-amber-600">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
