import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  LayoutDashboard, 
  Target, 
  Mail, 
  TrendingUp,
  Search,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold" style={{ color: '#1D1D1F' }}>Capital Signal Hunter</h1>
          <p className="text-sm mt-1" style={{ color: '#6E6E73' }}>AI Acquisition Agent</p>
        </div>
        
        <nav className="px-4 space-y-2">
          <Link href="/dashboard">
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors" 
               style={{ background: '#F5F5F7', color: '#1D1D1F' }}>
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </a>
          </Link>
          
          <Link href="/dashboard">
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
               style={{ color: '#6E6E73' }}>
              <Target className="w-5 h-5" />
              <span className="font-medium">Opportunities</span>
            </a>
          </Link>
          
          <Link href="/dashboard">
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
               style={{ color: '#6E6E73' }}>
              <Mail className="w-5 h-5" />
              <span className="font-medium">Outreach</span>
            </a>
          </Link>
          
          <Link href="/dashboard">
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
               style={{ color: '#6E6E73' }}>
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </a>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Page Hero */}
          <div className="mb-12">
            <h2 className="text-section mb-3">Pipeline Overview</h2>
            <p className="text-body-large">
              Track and manage acquisition opportunities scored by the AI Acquisition Agent.
            </p>
          </div>

          {/* KPI Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
            {/* Total Opportunities */}
            <div className="metric-card">
              <div className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: '#6E6E73' }}>
                Total Opportunities
              </div>
              <div className="text-4xl font-bold mb-1" style={{ color: '#1D1D1F' }}>
                {stats.total_opportunities}
              </div>
              <div className="text-sm" style={{ color: '#6E6E73' }}>
                Scanned this month
              </div>
            </div>

            {/* High Score */}
            <div className="metric-card">
              <div className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: '#6E6E73' }}>
                High Score (≥ 0.70)
              </div>
              <div className="text-4xl font-bold mb-1" style={{ color: '#1D1D1F' }}>
                {stats.high_score_count}
              </div>
              <div className="text-sm" style={{ color: '#6E6E73' }}>
                Meeting threshold
              </div>
            </div>

            {/* Average Score */}
            <div className="metric-card">
              <div className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: '#6E6E73' }}>
                Average Score
              </div>
              <div className="text-4xl font-bold mb-1" style={{ color: '#1D1D1F' }}>
                {stats.avg_score.toFixed(2)}
              </div>
              <div className="text-sm" style={{ color: '#6E6E73' }}>
                Across all listings
              </div>
            </div>

            {/* Outreach Sent */}
            <div className="metric-card">
              <div className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: '#6E6E73' }}>
                Outreach Sent
              </div>
              <div className="text-4xl font-bold mb-1" style={{ color: '#1D1D1F' }}>
                {stats.outreach_sent}
              </div>
              <div className="text-sm" style={{ color: '#6E6E73' }}>
                Emails/messages sent
              </div>
            </div>

            {/* Outreach Response */}
            <div className="metric-card">
              <div className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: '#6E6E73' }}>
                Outreach Response
              </div>
              <div className="text-4xl font-bold mb-1" style={{ color: '#1D1D1F' }}>
                {((stats.outreach_replied / stats.outreach_sent) * 100).toFixed(0)}%
              </div>
              <div className="text-sm" style={{ color: '#6E6E73' }}>
                {stats.outreach_replied}/{stats.outreach_sent} replies
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="metric-card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6E6E73' }} />
                <Input
                  placeholder="Search by business name, industry, or location…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                  style={{ borderColor: '#D2D2D7' }}
                />
              </div>

              {/* Filter by Score */}
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger style={{ borderColor: '#D2D2D7' }}>
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
                <SelectTrigger style={{ borderColor: '#D2D2D7' }}>
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
                <SelectTrigger style={{ borderColor: '#D2D2D7' }}>
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
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#1D1D1F' }}>
              Top Opportunities
            </h3>
            
            {loading ? (
              <div className="text-center py-12" style={{ color: '#6E6E73' }}>
                Loading opportunities...
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOpportunities.map((opp) => (
                  <Link key={opp.listing_id} href={`https://capitalsignal.manus.space/opportunity/${opp.listing_id}`}>
                    <div className="opportunity-card">
                      <div className="flex items-center justify-between">
                        {/* Left: Rank + Title */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-3xl font-bold" style={{ color: '#D2D2D7' }}>
                            #{opp.rank}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1" style={{ color: '#1D1D1F' }}>
                              {opp.title}
                            </h4>
                            <p className="text-sm" style={{ color: '#6E6E73' }}>
                              Click to view full analysis
                            </p>
                          </div>
                        </div>

                        {/* Middle: Key Stats */}
                        <div className="flex items-center gap-8 mr-8">
                          <div>
                            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: '#6E6E73' }}>
                              Industry
                            </div>
                            <div className="text-sm font-medium" style={{ color: '#1D1D1F' }}>
                              {opp.industry}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: '#6E6E73' }}>
                              Location
                            </div>
                            <div className="text-sm font-medium" style={{ color: '#1D1D1F' }}>
                              {opp.location}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: '#6E6E73' }}>
                              Revenue
                            </div>
                            <div className="text-sm font-medium" style={{ color: '#1D1D1F' }}>
                              {opp.revenue}
                            </div>
                          </div>
                        </div>

                        {/* Right: Score Pill */}
                        <div className={opp.final_score >= 0.8 ? 'score-pill score-pill-high' : 'score-pill'}>
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
