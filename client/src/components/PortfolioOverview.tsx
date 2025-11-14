import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Building, Target, Percent } from "lucide-react";

const mockPortfolio = [
  {
    id: "1",
    name: "Precision Manufacturing Co",
    acquired_date: "2024-01-15",
    purchase_price: 2800000,
    current_value: 3200000,
    annual_revenue: 4200000,
    annual_profit: 1200000,
    roi: 14.3,
    status: "Active"
  },
  {
    id: "2",
    name: "Elite Security Services",
    acquired_date: "2023-09-20",
    purchase_price: 1500000,
    current_value: 1950000,
    annual_revenue: 2800000,
    annual_profit: 650000,
    roi: 30.0,
    status: "Active"
  }
];

export default function PortfolioOverview() {
  const totalInvested = mockPortfolio.reduce((sum, b) => sum + b.purchase_price, 0);
  const totalValue = mockPortfolio.reduce((sum, b) => sum + b.current_value, 0);
  const totalRevenue = mockPortfolio.reduce((sum, b) => sum + b.annual_revenue, 0);
  const totalProfit = mockPortfolio.reduce((sum, b) => sum + b.annual_profit, 0);
  const avgROI = mockPortfolio.reduce((sum, b) => sum + b.roi, 0) / mockPortfolio.length;

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
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Total Invested</div>
              <DollarSign className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{formatCurrency(totalInvested)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Portfolio Value</div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              +{formatCurrency(totalValue - totalInvested)} gain
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Annual Revenue</div>
              <Building className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Avg ROI</div>
              <Percent className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary">{avgROI.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Holdings */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPortfolio.map((business) => (
              <div key={business.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{business.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      Acquired: {new Date(business.acquired_date).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    {business.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Purchase Price</div>
                    <div className="font-semibold">{formatCurrency(business.purchase_price)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Current Value</div>
                    <div className="font-semibold text-green-600">{formatCurrency(business.current_value)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Annual Profit</div>
                    <div className="font-semibold">{formatCurrency(business.annual_profit)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">ROI</div>
                    <div className="font-semibold text-primary">{business.roi}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
