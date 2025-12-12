import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, TrendingUp, Target, DollarSign, BarChart3 } from "lucide-react";
import { toast } from "sonner";

type DealStage = "lead" | "initial_review" | "due_diligence" | "negotiation" | "offer_submitted" | "closing";

const STAGE_CONFIG: Record<DealStage, { label: string; color: string }> = {
  lead: { label: "Lead", color: "bg-gray-100 text-gray-700" },
  initial_review: { label: "Initial Review", color: "bg-blue-100 text-blue-700" },
  due_diligence: { label: "Due Diligence", color: "bg-yellow-100 text-yellow-700" },
  negotiation: { label: "Negotiation", color: "bg-orange-100 text-orange-700" },
  offer_submitted: { label: "Offer Submitted", color: "bg-purple-100 text-purple-700" },
  closing: { label: "Closing", color: "bg-green-100 text-green-700" },
};

interface Deal {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stage: DealStage;
  score: number | null;
  revenue: number | null;
  cashFlow: number | null;
  industry: string | null;
  location: string | null;
  contactName: string | null;
  contactType: string | null;
  opportunityZone: boolean | null;
  aiPotential: number | null;
  certAdvantage: number | null;
  createdAt: Date;
  updatedAt: Date;
}

function DealCard({ deal, onStageChange }: { deal: Deal; onStageChange: (dealId: number, newStage: DealStage) => void }) {
  return (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base font-semibold">{deal.name}</CardTitle>
            {deal.location && (
              <p className="text-sm text-muted-foreground mt-1">{deal.location}</p>
            )}
          </div>
          {deal.score !== null && (
            <Badge variant={deal.score >= 80 ? "default" : "secondary"} className="ml-2">
              {deal.score}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-semibold">${(deal.price / 1000).toFixed(0)}K</p>
          </div>
          {deal.revenue && (
            <div>
              <p className="text-muted-foreground">Revenue</p>
              <p className="font-semibold">${(deal.revenue / 1000).toFixed(0)}K</p>
            </div>
          )}
        </div>
        
        {deal.industry && (
          <Badge variant="outline" className="text-xs">
            {deal.industry}
          </Badge>
        )}
        
        {deal.opportunityZone && (
          <Badge variant="secondary" className="text-xs bg-green-50 text-green-700">
            OZ
          </Badge>
        )}
        
        {deal.contactName && (
          <p className="text-xs text-muted-foreground">
            Contact: {deal.contactName} {deal.contactType && `(${deal.contactType})`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function StageColumn({ stage, deals, onStageChange }: { 
  stage: DealStage; 
  deals: Deal[];
  onStageChange: (dealId: number, newStage: DealStage) => void;
}) {
  const config = STAGE_CONFIG[stage];
  
  return (
    <div className="flex-1 min-w-[280px]">
      <div className={`${config.color} rounded-lg p-3 mb-3`}>
        <h3 className="font-semibold text-sm flex items-center justify-between">
          {config.label}
          <Badge variant="secondary" className="ml-2">
            {deals.length}
          </Badge>
        </h3>
      </div>
      
      <div className="space-y-2 min-h-[400px]">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onStageChange={onStageChange} />
        ))}
        
        {deals.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No deals in this stage
          </div>
        )}
      </div>
    </div>
  );
}

export default function Pipeline() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<DealStage | "all">("all");

  // Fetch deals using V2 router
  const { data: dealsData, isLoading: dealsLoading, refetch: refetchDeals } = trpc.dealsV2.list.useQuery({
    search: searchQuery || undefined,
    sortBy: "score",
    sortOrder: "desc",
    limit: 100,
  });

  // Fetch stats
  const { data: statsData, isLoading: statsLoading } = trpc.dealsV2.getStats.useQuery();

  // Update deal mutation
  const updateDealMutation = trpc.dealsV2.update.useMutation({
    onSuccess: () => {
      refetchDeals();
      toast.success("Deal updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update deal: ${error.message}`);
    },
  });

  const handleStageChange = (dealId: number, newStage: DealStage) => {
    updateDealMutation.mutate({ id: dealId, stage: newStage });
  };

  const deals = dealsData?.deals || [];
  const stats = statsData || {
    totalOpportunities: 0,
    highScoreCount: 0,
    averageScore: 0,
    outreachSent: 0,
    responseRate: 0,
  };

  // Group deals by stage
  const dealsByStage = deals.reduce((acc, deal) => {
    if (!acc[deal.stage]) {
      acc[deal.stage] = [];
    }
    acc[deal.stage].push(deal);
    return acc;
  }, {} as Record<DealStage, Deal[]>);

  // Ensure all stages have arrays
  const stages: DealStage[] = ["lead", "initial_review", "due_diligence", "negotiation", "offer_submitted", "closing"];
  stages.forEach(stage => {
    if (!dealsByStage[stage]) {
      dealsByStage[stage] = [];
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Deal Pipeline</h1>
              <p className="text-muted-foreground mt-1">
                Track and manage acquisition opportunities
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Deal
            </Button>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Deals</p>
                    <p className="text-2xl font-bold">{stats.totalOpportunities}</p>
                  </div>
                  <Target className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">High Score (≥80)</p>
                    <p className="text-2xl font-bold">{stats.highScoreCount}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Score</p>
                    <p className="text-2xl font-bold">{Math.round(stats.averageScore * 100)}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Outreach Sent</p>
                    <p className="text-2xl font-bold">{stats.outreachSent}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold">{Math.round(stats.responseRate * 100)}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search deals by name, industry, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="container mx-auto px-4 py-6">
        {dealsLoading ? (
          <div className="flex gap-4 overflow-x-auto">
            {stages.map((stage) => (
              <div key={stage} className="flex-1 min-w-[280px]">
                <Skeleton className="h-12 mb-3" />
                <Skeleton className="h-32 mb-3" />
                <Skeleton className="h-32 mb-3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stages.map((stage) => (
              <StageColumn
                key={stage}
                stage={stage}
                deals={dealsByStage[stage]}
                onStageChange={handleStageChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
