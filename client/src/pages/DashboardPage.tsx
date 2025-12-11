import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Timeline } from "@/components/Timeline";
import { Notifications } from "@/components/Notifications";
import CRMPipeline from "@/components/CRMPipeline";
import { TrendingUp, Clock, LayoutDashboard, DollarSign, Target, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <Navigation currentPage="/dashboard" />

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Acquisition Command Center
            </h1>
            <p className="text-xl text-muted-foreground">
              Track deals, manage pipeline, and collaborate with your investment team
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Notifications />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Card className="p-6 bg-white border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-blue-500" />
              <span className="text-xs text-blue-600 font-semibold">PIPELINE VALUE</span>
            </div>
            <div className="text-3xl font-bold text-foreground">$8.9M</div>
            <div className="text-sm text-muted-foreground mt-1">Across 5 active deals</div>
          </Card>

          <Card className="p-6 bg-white border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-500" />
              <span className="text-xs text-green-600 font-semibold">AVG SCORE</span>
            </div>
            <div className="text-3xl font-bold text-foreground">82.8</div>
            <div className="text-sm text-muted-foreground mt-1">Quality deal flow</div>
          </Card>

          <Card className="p-6 bg-white border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-purple-500" />
              <span className="text-xs text-purple-600 font-semibold">HOT LEADS</span>
            </div>
            <div className="text-3xl font-bold text-foreground">2</div>
            <div className="text-sm text-muted-foreground mt-1">Requiring immediate action</div>
          </Card>

          <Card className="p-6 bg-white border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-500" />
              <span className="text-xs text-yellow-600 font-semibold">DEADLINES</span>
            </div>
            <div className="text-3xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground mt-1">In next 30 days</div>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="pipeline" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-secondary border border-border">
              <TabsTrigger value="pipeline" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-foreground text-muted-foreground">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Pipeline</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-foreground text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-foreground text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-foreground text-muted-foreground">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pipeline" className="space-y-6">
              <CRMPipeline />
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <ActivityFeed />
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <Timeline />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="p-8 bg-white border border-border">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Advanced analytics and reporting features coming soon. Track ROI, conversion rates,
                  and portfolio performance metrics.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
