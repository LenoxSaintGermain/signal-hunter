import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  LayoutDashboard, 
  Target, 
  Mail, 
  TrendingUp,
  Search,
  Filter,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Opportunity {
  listing_id: string;
  title: string;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    // In production, this would fetch from API or load from files
    setTimeout(() => {
      const mockOpportunities: Opportunity[] = [
        {
          listing_id: "1",
          title: "HVAC Service Company - Atlanta Metro",
          final_score: 0.89,
          rank: 1,
          meets_threshold: true
        },
        {
          listing_id: "2",
          title: "Waste Management Route Business - GA",
          final_score: 0.85,
          rank: 2,
          meets_threshold: true
        },
        {
          listing_id: "3",
          title: "Commercial Plumbing Services - FL",
          final_score: 0.82,
          rank: 3,
          meets_threshold: true
        },
        {
          listing_id: "4",
          title: "Facilities Maintenance Company - TX",
          final_score: 0.78,
          rank: 4,
          meets_threshold: true
        },
        {
          listing_id: "5",
          title: "Home Services Franchise - NC",
          final_score: 0.75,
          rank: 5,
          meets_threshold: true
        }
      ];

      setOpportunities(mockOpportunities);
      
      setStats({
        total_opportunities: 250,
        high_score_count: 12,
        avg_score: 0.68,
        outreach_sent: 18,
        outreach_replied: 5
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
      <aside className="w-64 border-r border-border bg-card">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-foreground">Million Hunter</h1>
          <p className="text-sm text-muted-foreground mt-1">AI Acquisition Agent</p>
        </div>
        
        <nav className="px-4 space-y-2">
          <Link href="/dashboard">
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent text-accent-foreground">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </a>
          </Link>
          
          <Link href="/dashboard">
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground">
              <Target className="w-5 h-5" />
              <span className="font-medium">Opportunities</span>
            </a>
          </Link>
          
          <Link href="/dashboard">
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground">
              <Mail className="w-5 h-5" />
              <span className="font-medium">Outreach</span>
            </a>
          </Link>
          
          <Link href="/dashboard">
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </a>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">Pipeline Overview</h2>
            <p className="text-muted-foreground mt-1">
              Track and manage acquisition opportunities
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.total_opportunities}</div>
                <p className="text-xs text-muted-foreground mt-1">Scanned this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  High Score (≥0.70)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{stats.high_score_count}</div>
                <p className="text-xs text-muted-foreground mt-1">Meeting threshold</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.avg_score.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">Across all listings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Outreach Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">
                  {stats.outreach_replied}/{stats.outreach_sent}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((stats.outreach_replied / stats.outreach_sent) * 100).toFixed(0)}% reply rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Opportunities Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Opportunities</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search opportunities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">
                  Loading opportunities...
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOpportunities.map((opp) => (
                    <Link key={opp.listing_id} href={`/opportunity/${opp.listing_id}`}>
                      <a className="block p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold text-muted-foreground">
                                #{opp.rank}
                              </span>
                              <div>
                                <h3 className="font-semibold text-foreground">{opp.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Click to view full analysis
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-500">
                              {(opp.final_score * 100).toFixed(0)}
                            </div>
                            <p className="text-xs text-muted-foreground">Score</p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
