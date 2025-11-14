import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Brain, Zap, Shield, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src={APP_LOGO} alt={APP_TITLE} className="w-8 h-8" />
              <span className="font-semibold text-lg">{APP_TITLE}</span>
            </div>
            <Link href="/dashboard">
              <Button className="btn-apple">
                Open Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Business Acquisition Intelligence</span>
            </div>
            
            <h1 className="text-hero mb-6 animate-fade-in-up">
              Find your next
              <br />
              <span className="text-primary">million-dollar</span> acquisition
            </h1>
            
            <p className="text-body-large max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
              Identify and secure high-cash-flow businesses generating ≥$1M net profit through 
              automated market scanning, intelligent scoring, and strategic analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link href="/dashboard">
                <Button size="lg" className="btn-apple text-lg px-8 py-6">
                  View Pipeline <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="btn-apple text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "250+", label: "Daily Scans" },
              { value: "12", label: "High-Score Deals" },
              { value: "18", label: "Active Outreach" },
              { value: "5", label: "Broker Responses" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 1: Smart Targeting */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium mb-6">
                <Target className="w-3 h-3" />
                <span>SMART TARGETING</span>
              </div>
              <h2 className="text-section mb-6">
                Automated daily scanning of 250+ listings
              </h2>
              <p className="text-body-large mb-8">
                Our AI agent scans 11 sources across multiple platforms, intelligently filtering 
                for revenue, cash flow, and strategic fit. Never miss an opportunity again.
              </p>
              <ul className="space-y-4">
                {[
                  "Multi-source aggregation (BizBuySell, Crexi, SAM.gov, and more)",
                  "Intelligent filtering by sector, geography, and financial metrics",
                  "Real-time notifications for high-priority opportunities",
                  "Automated deduplication and data enrichment"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-border/50 p-8 flex items-center justify-center">
                <Target className="w-32 h-32 text-primary opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: AI Scoring */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-border/50 p-8 flex items-center justify-center">
                <Brain className="w-32 h-32 text-green-600 opacity-20" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium mb-6">
                <Brain className="w-3 h-3" />
                <span>AI SCORING</span>
              </div>
              <h2 className="text-section mb-6">
                Multi-factor algorithm evaluating every deal
              </h2>
              <p className="text-body-large mb-8">
                Our proprietary scoring engine analyzes financial metrics, AI optimization potential, 
                government contract opportunities, and strategic multipliers to rank every opportunity.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "SDE Margin", weight: "20%" },
                  { label: "Cash Flow Quality", weight: "15%" },
                  { label: "AI Potential", weight: "25%" },
                  { label: "Cert Advantage", weight: "15%" },
                ].map((metric, index) => (
                  <div key={index} className="p-4 rounded-lg bg-background border border-border">
                    <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                    <div className="text-2xl font-semibold text-green-600">{metric.weight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Automated Outreach */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium mb-6">
                <Zap className="w-3 h-3" />
                <span>AUTOMATED OUTREACH</span>
              </div>
              <h2 className="text-section mb-6">
                Intelligent email campaigns with personalized templates
              </h2>
              <p className="text-body-large mb-8">
                Reach brokers and sellers with professionally crafted emails that highlight your 
                competitive advantages: SDVOSB certification, SBA pre-approval, and AI expertise.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border bg-background">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Broker Initial Contact</span>
                    <span className="text-xs text-muted-foreground">Template 1</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Professional introduction emphasizing veteran status, pre-approval, and quick close capability.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-background">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Follow-Up Sequence</span>
                    <span className="text-xs text-muted-foreground">3, 7, 14, 30 days</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automated follow-ups with escalating urgency and refined call-to-action.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-border/50 p-8 flex items-center justify-center">
                <Zap className="w-32 h-32 text-purple-600 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Advantages */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-section mb-6">Your competitive advantages</h2>
            <p className="text-body-large">
              Leverage unique positioning to win deals faster and negotiate better terms.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: "SDVOSB Certified",
                description: "Federal contract access and set-aside opportunities worth millions annually.",
                color: "text-blue-600"
              },
              {
                icon: TrendingUp,
                title: "SBA Pre-Approved",
                description: "$5M lending capacity with streamlined process and quick close capability.",
                color: "text-green-600"
              },
              {
                icon: Brain,
                title: "AI Optimization",
                description: "Post-acquisition value creation through automation and process improvement.",
                color: "text-purple-600"
              }
            ].map((advantage, index) => (
              <div key={index} className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${advantage.color === 'text-blue-600' ? 'from-blue-500/20 to-blue-600/20' : advantage.color === 'text-green-600' ? 'from-green-500/20 to-green-600/20' : 'from-purple-500/20 to-purple-600/20'} flex items-center justify-center mb-6`}>
                  <advantage.icon className={`w-6 h-6 ${advantage.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                <p className="text-body text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-section mb-6">
              Ready to find your next acquisition?
            </h2>
            <p className="text-body-large mb-12">
              Access the full pipeline of scored opportunities, investment memos, and automated outreach campaigns.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="btn-apple text-lg px-12 py-6">
                Access Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 {APP_TITLE}. AI-Powered Business Acquisition Intelligence.
          </div>
        </div>
      </footer>
    </div>
  );
}
