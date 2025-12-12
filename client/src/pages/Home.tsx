import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Brain, Zap, Shield, TrendingUp, Sparkles, Lock, BarChart3, Search } from "lucide-react";
import { Link } from "wouter";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import AIAssistant from "@/components/AIAssistant";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <AIAssistant />
      <Navigation currentPage="/" />

      {/* Hero Section - The "Secret Door" */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border/50 text-foreground/80 text-sm font-medium mb-8 animate-fade-in backdrop-blur-sm">
              <Lock className="w-3 h-3 text-primary" />
              <span>Private Access: Portfolio Management Suite</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 animate-fade-in-up leading-[1.1]">
              The Signals <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Others Miss.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-200 leading-relaxed">
              Stop competing for average deals. Use AI-driven asymmetry to identify, analyze, and acquire high-cash-flow assets before they hit the open market.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                  Enter Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/property/whitehall-assemblage">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full backdrop-blur-sm bg-background/50">
                  View Case Study
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-muted-foreground/60 grayscale opacity-70">
              {/* Trust signals/Investors could go here */}
              <div className="text-sm font-semibold tracking-widest uppercase">Trusted by Acquisition Entrepreneurs</div>
            </div>
          </div>
        </div>
      </section>

      {/* The "Master Investor" Philosophy Section */}
      <section className="py-24 border-t border-border/50 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight">
                  "It's not about working harder. <br />
                  It's about <span className="text-primary italic">seeing clearer</span>."
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p>
                    Most investors look at the same listings, use the same multiples, and get the same average returns. They are playing a game of perfect competition.
                  </p>
                  <p>
                    <strong>Signal Hunter</strong> gives you an unfair advantage. By aggregating fragmented data from 11+ sources and applying institutional-grade AI analysis, we surface the hidden gems—the "boring" businesses with wide moats and massive expansion potential.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-foreground">250+</span>
                      <span className="text-sm">Daily Scans</span>
                    </div>
                    <div className="w-px bg-border h-12" />
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-foreground">$12M+</span>
                      <span className="text-sm">Pipeline Value</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-2xl" />
                <div className="relative bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b bg-muted/40 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <div className="ml-4 h-6 w-64 bg-background rounded text-xs flex items-center px-2 text-muted-foreground">
                      ai-analysis.module.ts
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Deal Consensus Score</span>
                        <span className="text-green-600">88/100</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-[88%] bg-gradient-to-r from-blue-500 to-green-500" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { icon: Zap, text: "High Automation Potential (AI-Ready)", color: "bg-blue-500" },
                        { icon: Shield, text: "Government Contract Moat (SDVOSB)", color: "bg-purple-500" },
                        { icon: TrendingUp, text: "Undervalued vs Sector Avg (2.4x)", color: "bg-green-500" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                          <div className={`p-2 rounded-md ${item.color}/10 text-${item.color.replace('bg-', '')}`}>
                            <item.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The System Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4">The Operating System</Badge>
            <h2 className="text-4xl font-bold mb-6">From Signal to Close.</h2>
            <p className="text-xl text-muted-foreground">
              A complete end-to-end workflow designed for the modern acquisition entrepreneur.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Search,
                title: "Deep Discovery",
                desc: "Autonomous agents scan BizBuySell, Crexi, and private networks 24/7, filtering noise to find the top 1% of listings.",
                details: ["Cross-market aggregation", "Financial validation", "Owner type detection"]
              },
              {
                icon: Brain,
                title: "Multi-Model Analysis",
                desc: "Analyze every deal with a 'board of advisors'—GPT-4o, Claude 3.5, and Gemini Pro debating the pros and cons.",
                details: ["Risk assessment", "Growth levers", "CapEx forecasting"]
              },
              {
                icon: BarChart3,
                title: "Precision Modeling",
                desc: "Instant capital stack visualization and scenario modeling. See exactly how leverage impacts your cash-on-cash return.",
                details: ["SBA 7(a) structuring", "Seller note optimization", "Tax impact analysis"]
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.desc}
                </p>
                <ul className="space-y-2 border-t border-border/50 pt-4">
                  {feature.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to hunt?</h2>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-12">
            Your personal deal flow engine is waiting. Start scanning the market in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-bold rounded-full shadow-xl">
                Launch Dashboard
              </Button>
            </Link>
            <span className="text-primary-foreground/80 text-sm">
              Full Access • No Credit Card Required
            </span>
          </div>

          <div className="mt-16 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 opacity-70">
            <div className="text-sm">
              © 2024 {APP_TITLE}. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-black/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              Powered by Manus AI
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
