import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Timeline } from "@/components/Timeline";
import { Notifications } from "@/components/Notifications";
import CRMPipeline from "@/components/CRMPipeline";
import { TrendingUp, Clock, Bell, LayoutDashboard, DollarSign, Target, Zap } from "lucide-react";
import { Link } from "wouter";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <a className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Million Hunter
                </a>
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/property/514-whitehall">
                  <a className="text-sm text-gray-300 hover:text-white transition-colors">
                    514 Whitehall
                  </a>
                </Link>
                <Link href="/property/whitehall-assemblage">
                  <a className="text-sm text-gray-300 hover:text-white transition-colors">
                    Assemblage
                  </a>
                </Link>
                <Link href="/property/comparison">
                  <a className="text-sm text-gray-300 hover:text-white transition-colors">
                    Compare
                  </a>
                </Link>
                <Link href="/dashboard">
                  <a className="text-sm text-blue-400 font-semibold">
                    Dashboard
                  </a>
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Notifications />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Acquisition Command Center
          </h1>
          <p className="text-xl text-gray-400">
            Track deals, manage pipeline, and collaborate with your investment team
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-blue-400" />
              <span className="text-xs text-blue-400 font-semibold">PIPELINE VALUE</span>
            </div>
            <div className="text-3xl font-bold">$8.9M</div>
            <div className="text-sm text-gray-400 mt-1">Across 5 active deals</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-400" />
              <span className="text-xs text-green-400 font-semibold">AVG SCORE</span>
            </div>
            <div className="text-3xl font-bold">82.8</div>
            <div className="text-sm text-gray-400 mt-1">Quality deal flow</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-purple-400" />
              <span className="text-xs text-purple-400 font-semibold">HOT LEADS</span>
            </div>
            <div className="text-3xl font-bold">2</div>
            <div className="text-sm text-gray-400 mt-1">Requiring immediate action</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-semibold">DEADLINES</span>
            </div>
            <div className="text-3xl font-bold">3</div>
            <div className="text-sm text-gray-400 mt-1">In next 30 days</div>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="pipeline" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-black/40 border border-white/10">
              <TabsTrigger value="pipeline" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Pipeline</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="gap-2">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
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
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Analytics Dashboard</h3>
                <p className="text-gray-400">
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
