import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Mail, Phone, Calendar, User, Building, Bot, Loader2, TrendingUp, Zap, Target } from "lucide-react";
import { trpc } from "@/lib/trpc";
import AIAssistant from "./AIAssistant";

const stages = [
  { value: "lead", label: "Lead" },
  { value: "initial_review", label: "Initial Review" },
  { value: "due_diligence", label: "Due Diligence" },
  { value: "negotiation", label: "Negotiation" },
  { value: "offer_submitted", label: "Offer Submitted" },
  { value: "closing", label: "Closing" }
];

export default function CRMPipeline() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [aiDealContext, setAiDealContext] = useState<{
    name: string;
    price: number;
    location: string | null;
  } | null>(null);

  // Fetch all deals from database
  const { data: allDeals, isLoading } = trpc.deals.getAll.useQuery();

  const deals = allDeals || [];

  const filteredDeals = selectedStage
    ? deals.filter(deal => deal.stage === selectedStage)
    : deals;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAskAI = (deal: typeof deals[0]) => {
    setAiDealContext({
      name: deal.name,
      price: deal.price,
      location: deal.location,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pipeline Stages */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stages.map((stage) => {
          const stageDeals = deals.filter(d => d.stage === stage.value);
          const stageValue = stageDeals.reduce((sum, d) => sum + d.price, 0);
          
          return (
            <Card
              key={stage.value}
              className={`cursor-pointer transition-all ${
                selectedStage === stage.value ? 'ring-2 ring-primary' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedStage(selectedStage === stage.value ? null : stage.value)}
            >
              <CardContent className="p-4">
                <div className="text-sm font-medium mb-2">{stage.label}</div>
                <div className="text-2xl font-bold text-primary">{stageDeals.length}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(stageValue)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {selectedStage ? `${stages.find(s => s.value === selectedStage)?.label} Deals` : 'All Deals'}
          </h3>
          {selectedStage && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedStage(null)}>
              Clear Filter
            </Button>
          )}
        </div>

        {filteredDeals.map((deal) => (
          <Card key={deal.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-muted-foreground" />
                    <h4 className="text-lg font-semibold">{deal.name}</h4>
                    {deal.opportunityZone && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                        OZ
                      </Badge>
                    )}
                  </div>
                  {deal.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {deal.description}
                    </p>
                  )}
                  {deal.contactName && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <User className="w-4 h-4" />
                      <span>{deal.contactName}</span>
                      {deal.contactType && <span className="text-xs">({deal.contactType})</span>}
                    </div>
                  )}
                </div>
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(deal.price)}
                  </div>
                  <Badge variant="outline" className="mb-2">
                    {stages.find(s => s.value === deal.stage)?.label}
                  </Badge>
                  {deal.score && (
                    <div className="text-sm font-semibold text-green-400">
                      Score: {deal.score}/100
                    </div>
                  )}
                </div>
              </div>

              {/* Financial Metrics */}
              {(deal.revenue || deal.cashFlow || deal.sdeMargin) && (
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
                  {deal.revenue && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Revenue</div>
                      <div className="font-semibold">{formatCurrency(deal.revenue)}</div>
                    </div>
                  )}
                  {deal.cashFlow && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Cash Flow</div>
                      <div className="font-semibold">{formatCurrency(deal.cashFlow)}</div>
                    </div>
                  )}
                  {deal.sdeMargin && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">SDE Margin</div>
                      <div className="font-semibold">{deal.sdeMargin.toFixed(1)}%</div>
                    </div>
                  )}
                </div>
              )}

              {/* Scoring Metrics */}
              {(deal.aiPotential || deal.certAdvantage) && (
                <div className="flex gap-4 mb-4">
                  {deal.aiPotential && (
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span className="text-muted-foreground">AI Potential:</span>
                      <span className="font-semibold text-purple-400">{deal.aiPotential}/100</span>
                    </div>
                  )}
                  {deal.certAdvantage && (
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-muted-foreground">Cert Advantage:</span>
                      <span className="font-semibold text-blue-400">{deal.certAdvantage}/100</span>
                    </div>
                  )}
                </div>
              )}

              {/* Contact Info */}
              {(deal.lastContact || deal.nextAction) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {deal.lastContact && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Last Contact:</span>
                      <span className="font-medium">
                        {new Date(deal.lastContact).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {deal.nextAction && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Next Action:</span>
                      <span className="font-medium">{deal.nextAction}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 flex-wrap">
                <Button 
                  size="sm" 
                  variant="default"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  onClick={() => handleAskAI(deal)}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Ask AI
                </Button>
                {deal.contactName && (
                  <>
                    <Button size="sm" variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              {selectedStage ? 'No deals in this stage yet.' : 'No deals found. Start adding opportunities to your pipeline!'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* AI Assistant with Deal Context */}
      {aiDealContext && (
        <AIAssistant propertyContext={aiDealContext} />
      )}
    </div>
  );
}
