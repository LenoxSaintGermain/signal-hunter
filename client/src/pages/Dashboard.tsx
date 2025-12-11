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
              <div className="space-y-4">
                {filteredOpportunities.map((opp) => (
                  <Link key={opp.listing_id} href={`/property/${opp.listing_id}`}>
                    <div className="opportunity-card bg-white border border-border hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between">
                        {/* Left: Rank + Title */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-3xl font-bold text-muted-foreground/30">
                            #{opp.rank}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1 text-foreground">
                              {opp.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Click to view full analysis
                            </p>
                          </div>
                        </div>

                        {/* Middle: Key Stats */}
                        <div className="flex items-center gap-8 mr-8">
                          <div>
                            <div className="text-xs uppercase tracking-wide mb-1 text-muted-foreground">
                              Industry
                            </div>
                            <div className="text-sm font-medium text-foreground">
                              {opp.industry}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-wide mb-1 text-muted-foreground">
                              Location
                            </div>
                            <div className="text-sm font-medium text-foreground">
                              {opp.location}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-wide mb-1 text-muted-foreground">
                              Revenue
                            </div>
                            <div className="text-sm font-medium text-foreground">
                              {opp.revenue}
                            </div>
                          </div>
                        </div>

                        {/* Right: Score Pill */}
                        <div className={opp.final_score >= 0.8 ? 'score-pill bg-primary text-primary-foreground' : 'score-pill bg-secondary text-secondary-foreground'}>
                          Score {(opp.final_score * 100).toFixed(0)}
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
