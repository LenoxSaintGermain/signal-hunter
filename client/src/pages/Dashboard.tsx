import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";

interface Opportunity {
  listing_id: string;
  title: string;
  industry: string;
  location: string;
  revenue: string;
  final_score: number;
  rank: number;
  meets_threshold: boolean;
}

interface DashboardStats {
  total_opportunities: number;
  high_score_count: number;
  avg_score: number;
  outreach_sent: number;
  outreach_replied: number;
}

export default function Dashboard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total_opportunities: 0,
    high_score_count: 0,
    avg_score: 0,
    outreach_sent: 0,
    outreach_replied: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const mockOpportunities: Opportunity[] = [
        {
          listing_id: "ponce-protocol",
          title: "Ponce Protocol - Hospitality Business with Real Estate",
          industry: "Hospitality / Real Estate",
          location: "Druid Hills, Atlanta, GA",
          revenue: "$109K/yr verified, $145K/yr potential",
          final_score: 0.92,
          rank: 1,
          meets_threshold: true
        },
        {
          listing_id: "whitehall-assemblage",
          title: "Whitehall Assemblage - 2.31 Acre Development Site",
          industry: "Real Estate Development",
          location: "Downtown Atlanta, GA",
          revenue: "$5.5M asking price",
          final_score: 0.88,
          rank: 2,
          meets_threshold: true
        },
        {
          listing_id: "514-whitehall",
          title: "514 Whitehall St SW - Mixed-Use Property",
          industry: "Real Estate",
          location: "Downtown Atlanta, GA",
          revenue: "$200K estimated",
          final_score: 0.85,
          rank: 3,
          meets_threshold: true
        }
      ];

      setOpportunities(mockOpportunities);

      setStats({
        total_opportunities: 3,
        high_score_count: 3,
        avg_score: 0.88,
        outreach_sent: 3,
        outreach_replied: 1
      });

      setLoading(false);
    }, 500);
  }, []);

  const filteredOpportunities = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="/dashboard" />

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-8">
          {/* Page Hero */}
          <div className="mb-12">
            <h2 className="text-section mb-3 text-foreground">Pipeline Overview</h2>
            <p className="text-body-large text-muted-foreground">
              Track and manage acquisition opportunities scored by the AI Acquisition Agent.
            </p>
          </div>

          {/* KPI Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
            {/* Total Opportunities */}
            <div className="metric-card bg-secondary/50 border border-border">
              <div className="text-xs uppercase tracking-wide font-medium mb-2 text-muted-foreground">
                Total Opportunities
              </div>
              <div className="text-4xl font-bold mb-1 text-foreground">
                {stats.total_opportunities}
              </div>
              <div className="text-sm text-muted-foreground">
                Scanned this month
              </div>
            </div>

            {/* High Score */}
            <div className="metric-card bg-secondary/50 border border-border">
              <div className="text-xs uppercase tracking-wide font-medium mb-2 text-muted-foreground">
                High Score (≥ 0.70)
              </div>
              <div className="text-4xl font-bold mb-1 text-foreground">
                {stats.high_score_count}
              </div>
              <div className="text-sm text-muted-foreground">
                Meeting threshold
              </div>
            </div>

            {/* Average Score */}
            <div className="metric-card bg-secondary/50 border border-border">
              <div className="text-xs uppercase tracking-wide font-medium mb-2 text-muted-foreground">
                Average Score
              </div>
              <div className="text-4xl font-bold mb-1 text-foreground">
                {stats.avg_score.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                Across all listings
              </div>
            </div>

            {/* Outreach Sent */}
            <div className="metric-card bg-secondary/50 border border-border">
              <div className="text-xs uppercase tracking-wide font-medium mb-2 text-muted-foreground">
                Outreach Sent
              </div>
              <div className="text-4xl font-bold mb-1 text-foreground">
                {stats.outreach_sent}
              </div>
              <div className="text-sm text-muted-foreground">
                Emails/messages sent
              </div>
            </div>

            {/* Outreach Response */}
            <div className="metric-card bg-secondary/50 border border-border">
              <div className="text-xs uppercase tracking-wide font-medium mb-2 text-muted-foreground">
                Outreach Response
              </div>
              <div className="text-4xl font-bold mb-1 text-foreground">
                {((stats.outreach_replied / stats.outreach_sent) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-muted-foreground">
                {stats.outreach_replied}/{stats.outreach_sent} replies
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="metric-card mb-8 bg-secondary/50 border border-border p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by business name, industry, or location…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 border-input bg-white"
                />
              </div>

              {/* Filter by Score */}
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="border-input bg-white">
                  <SelectValue placeholder="Filter by Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">≥ 0.8</SelectItem>
                  <SelectItem value="medium">0.7 - 0.79</SelectItem>
                  <SelectItem value="low">&lt; 0.7</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter by Status */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-input bg-white">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="conversation">In Conversation</SelectItem>
                  <SelectItem value="loi">LOI</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort by */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-input bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Score (high→low)</SelectItem>
                  <SelectItem value="date">Date Added</SelectItem>
                  <SelectItem value="response">Response Probability</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Top Opportunities List */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Top Opportunities
            </h3>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading opportunities...
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOpportunities.map((opp) => (
                  <Link key={opp.listing_id} href={`/property/${opp.listing_id}`}>
                    <div className="opportunity-card bg-white border border-border hover:border-primary/50 transition-all rounded-xl overflow-hidden group shadow-sm hover:shadow-md">
                      <div className="flex flex-col md:flex-row md:items-center p-6 gap-6 relative">

                        {/* Mobile Rank Badge (visible only on mobile) */}
                        <div className="md:hidden absolute top-6 right-6 text-4xl font-black text-secondary/30 pointer-events-none">
                          #{opp.rank}
                        </div>

                        {/* Rank + Title Section */}
                        <div className="flex items-start gap-4 flex-1">
                          {/* Desktop Rank (hidden on mobile) */}
                          <div className="hidden md:flex flex-col items-center justify-center w-12 pt-1">
                            <span className="text-3xl font-bold text-muted-foreground/20">#{opp.rank}</span>
                          </div>

                          <div className="flex-1 pr-12 md:pr-0">
                            <h4 className="font-bold text-xl md:text-2xl mb-2 text-foreground group-hover:text-primary transition-colors leading-tight">
                              {opp.title}
                            </h4>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                {opp.industry}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                {opp.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Key Stats Grid - Stack on mobile, Row on desktop */}
                        <div className="grid grid-cols-2 md:flex md:items-center gap-6 md:gap-12 md:mr-8 border-t md:border-t-0 border-border pt-4 md:pt-0">
                          <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                              Revenue
                            </span>
                            <span className="text-base md:text-sm font-semibold text-foreground">
                              {opp.revenue}
                            </span>
                          </div>

                          {/* Mobile Score Display (hidden on desktop) */}
                          <div className="flex flex-col md:hidden">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                              AI Score
                            </span>
                            <span className={`text-base font-bold ${opp.final_score >= 0.8 ? 'text-green-600' : 'text-yellow-600'}`}>
                              {(opp.final_score * 100).toFixed(0)}/100
                            </span>
                          </div>
                        </div>

                        {/* Desktop Score Pill (hidden on mobile) */}
                        <div className="hidden md:flex flex-col items-center justify-center">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-sm ${opp.final_score >= 0.8
                              ? 'bg-green-100 text-green-700 border-2 border-green-200'
                              : 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200'
                            }`}>
                            {(opp.final_score * 100).toFixed(0)}
                          </div>
                        </div>

                      </div>

                      {/* Mobile CTA Footer */}
                      <div className="md:hidden bg-secondary/30 px-6 py-3 border-t border-border flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">View Analysis</span>
                        <div className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                          →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
