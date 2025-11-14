import { useState } from "react";
import { Link } from "wouter";
import { 
  Home, BarChart, DollarSign, Target, Plane, Clipboard, Users, 
  FileText, Bot, UserCheck, PieChart, ArrowLeft, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APP_LOGO, APP_TITLE } from "@/const";

// Import components from both repositories
import DynamicCapitalStack from "@/components/DynamicCapitalStack";
import HundredDayPlan from "@/components/HundredDayPlan";
import CRMPipeline from "@/components/CRMPipeline";
import PortfolioOverview from "@/components/PortfolioOverview";
import InvestorPartnership from "@/components/InvestorPartnership";
import InvestmentMemoViewer from "@/components/InvestmentMemoViewer";
import { AgentControlPanel } from "@/components/AgentControlPanel";
import { MetricsPanel } from "@/components/MetricsPanel";

export default function UnifiedDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);

  const mockBusinesses = [
    {
      id: "1",
      business_name: "Precision Manufacturing Co",
      sector: "Manufacturing",
      location: "Raleigh, NC",
      asking_price: 2800000,
      annual_revenue: 4200000,
      annual_net_profit: 1200000,
      composite_score: 0.89,
      automation_opportunity_score: 0.92,
      description: "High-precision CNC machining for aerospace and defense contractors",
      last_analyzed_at: new Date().toISOString()
    },
    {
      id: "2",
      business_name: "Elite Security Services",
      sector: "Security",
      location: "Atlanta, GA",
      asking_price: 1500000,
      annual_revenue: 2800000,
      annual_net_profit: 650000,
      composite_score: 0.85,
      automation_opportunity_score: 0.78,
      description: "Government contract security services with active clearances",
      last_analyzed_at: new Date().toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 border-r border-border bg-card overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <img src={APP_LOGO} alt={APP_TITLE} className="w-8 h-8" />
            <span className="font-semibold">{APP_TITLE}</span>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "portfolio", label: "Portfolio", icon: PieChart },
              { id: "crm", label: "CRM Pipeline", icon: UserCheck },
              { id: "agent", label: "AI Agent", icon: Bot },
              { id: "memos", label: "Memos", icon: FileText },
              { id: "analysis", label: "Analysis", icon: BarChart },
              { id: "capital", label: "Capital Stack", icon: DollarSign },
              { id: "simulator", label: "Performance", icon: Target },
              { id: "roadmap", label: "Roadmap", icon: Plane },
              { id: "plan", label: "100-Day Plan", icon: Clipboard },
              { id: "partnership", label: "Investor Terms", icon: Users },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold">
                {activeTab === "overview" && "Deal Overview"}
                {activeTab === "portfolio" && "Portfolio Management"}
                {activeTab === "crm" && "CRM Pipeline"}
                {activeTab === "agent" && "AI Research Agent"}
                {activeTab === "memos" && "Investment Memos"}
                {activeTab === "analysis" && "Deal Analysis"}
                {activeTab === "capital" && "Capital Stack Builder"}
                {activeTab === "simulator" && "Performance Simulator"}
                {activeTab === "roadmap" && "Financial Freedom Roadmap"}
                {activeTab === "plan" && "100-Day Action Plan"}
                {activeTab === "partnership" && "Investor Partnership Terms"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <MetricsPanel 
                totalDeals={mockBusinesses.length}
                totalValue={mockBusinesses.reduce((sum, b) => sum + b.asking_price, 0)}
                totalProfit={mockBusinesses.reduce((sum, b) => sum + b.annual_net_profit, 0)}
                avgAutomationScore={mockBusinesses.reduce((sum, b) => sum + b.automation_opportunity_score, 0) / mockBusinesses.length}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockBusinesses.map((business) => (
                  <Card key={business.id}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{business.business_name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{business.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Asking Price</div>
                          <div className="text-lg font-bold">${(business.asking_price / 1000000).toFixed(2)}M</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Score</div>
                          <div className="text-lg font-bold text-primary">{(business.composite_score * 100).toFixed(0)}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === "portfolio" && (
            <PortfolioOverview />
          )}

          {/* CRM Tab */}
          {activeTab === "crm" && (
            <CRMPipeline />
          )}

          {/* AI Agent Tab */}
          {activeTab === "agent" && (
            <div className="space-y-6">
              <AgentControlPanel />
              <Card>
                <CardHeader>
                  <CardTitle>Agent Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    AI research agent is actively scanning 11 sources for high-value opportunities.
                    Last scan completed 2 hours ago.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Memos Tab */}
          {activeTab === "memos" && (
            <InvestmentMemoViewer />
          )}

          {/* Analysis Tab */}
          {activeTab === "analysis" && (
            <Card>
              <CardHeader>
                <CardTitle>Deal Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Select a deal from the Overview tab to view detailed analysis.
                </p>
                {selectedDeal && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{selectedDeal.business_name}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Asking Price</div>
                        <div className="text-2xl font-bold">${(selectedDeal.asking_price / 1000000).toFixed(2)}M</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Annual Profit</div>
                        <div className="text-2xl font-bold">${(selectedDeal.annual_net_profit / 1000000).toFixed(2)}M</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Capital Stack Tab */}
          {activeTab === "capital" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  Dynamic Capital Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DynamicCapitalStack />
              </CardContent>
            </Card>
          )}

          {/* Performance Simulator Tab */}
          {activeTab === "simulator" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  Performance Simulator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Performance simulator coming soon...</p>
              </CardContent>
            </Card>
          )}

          {/* Roadmap Tab */}
          {activeTab === "roadmap" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-6 h-6 text-purple-600" />
                  Financial Freedom Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Financial freedom roadmap coming soon...</p>
              </CardContent>
            </Card>
          )}

          {/* 100-Day Plan Tab */}
          {activeTab === "plan" && (
            <HundredDayPlan selectedBusiness={selectedDeal} />
          )}

          {/* Partnership Tab */}
          {activeTab === "partnership" && (
            <InvestorPartnership selectedBusiness={selectedDeal} />
          )}
        </main>
      </div>
    </div>
  );
}
