import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Mail, Phone, Calendar, User, Building } from "lucide-react";

interface Deal {
  id: string;
  business_name: string;
  contact: string;
  asking_price: number;
  stage: string;
  last_contact: string;
  next_action: string;
}

const mockDeals: Deal[] = [
  {
    id: "1",
    business_name: "Precision Manufacturing Co",
    contact: "John Smith (Broker)",
    asking_price: 2800000,
    stage: "Initial Contact",
    last_contact: "2 days ago",
    next_action: "Follow-up email"
  },
  {
    id: "2",
    business_name: "Elite Security Services",
    contact: "Sarah Johnson (Owner)",
    asking_price: 1500000,
    stage: "Due Diligence",
    last_contact: "1 week ago",
    next_action: "Schedule site visit"
  },
  {
    id: "3",
    business_name: "Tech Solutions LLC",
    contact: "Mike Davis (Broker)",
    asking_price: 950000,
    stage: "Negotiation",
    last_contact: "Yesterday",
    next_action: "Submit LOI"
  }
];

const stages = ["Lead", "Initial Contact", "Due Diligence", "Negotiation", "LOI Submitted", "Closing"];

export default function CRMPipeline() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const filteredDeals = selectedStage
    ? mockDeals.filter(deal => deal.stage === selectedStage)
    : mockDeals;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Stages */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stages.map((stage) => {
          const stageDeals = mockDeals.filter(d => d.stage === stage);
          const stageValue = stageDeals.reduce((sum, d) => sum + d.asking_price, 0);
          
          return (
            <Card
              key={stage}
              className={`cursor-pointer transition-all ${
                selectedStage === stage ? 'ring-2 ring-primary' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedStage(selectedStage === stage ? null : stage)}
            >
              <CardContent className="p-4">
                <div className="text-sm font-medium mb-2">{stage}</div>
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
            {selectedStage ? `${selectedStage} Deals` : 'All Deals'}
          </h3>
          {selectedStage && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedStage(null)}>
              Clear Filter
            </Button>
          )}
        </div>

        {filteredDeals.map((deal) => (
          <Card key={deal.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-muted-foreground" />
                    <h4 className="text-lg font-semibold">{deal.business_name}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <User className="w-4 h-4" />
                    <span>{deal.contact}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(deal.asking_price)}
                  </div>
                  <Badge variant="outline">{deal.stage}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Last Contact:</span>
                  <span className="font-medium">{deal.last_contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Next Action:</span>
                  <span className="font-medium">{deal.next_action}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button size="sm">
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
            <p className="text-muted-foreground">No deals in this stage yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
