import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Zap, Shield, ArrowRight } from "lucide-react";
import { APP_TITLE } from "@/const";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">{APP_TITLE}</span>
          </div>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            AI-Driven Business
            <br />
            <span className="text-primary">Acquisition Intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Identify and secure high-cash-flow businesses generating ≥$1M net profit 
            through automated market scanning, intelligent scoring, and strategic analysis.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                View Pipeline
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Smart Targeting</h3>
            <p className="text-muted-foreground">
              Automated daily scanning of 250+ listings across 11 sources with intelligent 
              filtering for revenue, cash flow, and strategic fit.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">AI Scoring</h3>
            <p className="text-muted-foreground">
              Multi-factor algorithm evaluating financial metrics, AI optimization potential, 
              government contract opportunities, and strategic multipliers.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Automated Outreach</h3>
            <p className="text-muted-foreground">
              Intelligent email campaigns with personalized templates, follow-up sequences, 
              and response tracking for high-scoring opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">250+</div>
              <div className="text-sm text-muted-foreground">Daily Scans</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">High-Score Deals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">18</div>
              <div className="text-sm text-muted-foreground">Active Outreach</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5</div>
              <div className="text-sm text-muted-foreground">Broker Responses</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center bg-card border border-border rounded-lg p-12">
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Find Your Next Acquisition?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access the full pipeline of scored opportunities, investment memos, 
            and automated outreach campaigns.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Access Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Million Hunter. AI-Powered Business Acquisition Intelligence.</p>
        </div>
      </footer>
    </div>
  );
}
