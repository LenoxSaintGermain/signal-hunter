import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, TrendingUp, FileText, Users, DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Activity {
  id: string;
  type: "deal_found" | "analysis_complete" | "outreach_sent" | "investor_action" | "milestone" | "alert";
  title: string;
  description: string;
  timestamp: Date;
  priority: "low" | "medium" | "high";
  metadata?: {
    dealName?: string;
    score?: number;
    amount?: number;
    investor?: string;
  };
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "deal_found",
      title: "New High-Scoring Opportunity Discovered",
      description: "Whitehall Assemblage - 2.31 acres near Mercedes-Benz Stadium",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
      priority: "high",
      metadata: { dealName: "Whitehall Assemblage", score: 95, amount: 5000000 }
    },
    {
      id: "2",
      type: "analysis_complete",
      title: "Investment Analysis Completed",
      description: "514 Whitehall St SW - Flex-Stack scenario shows 95.5% ROI",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
      priority: "medium",
      metadata: { dealName: "514 Whitehall", score: 88 }
    },
    {
      id: "3",
      type: "milestone",
      title: "FIFA 2026 Countdown",
      description: "7 months until World Cup - Assemblage preparation window closing",
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      priority: "high",
      metadata: {}
    },
    {
      id: "4",
      type: "investor_action",
      title: "Investor Interest Captured",
      description: "John Smith requested full pro forma for Whitehall Assemblage",
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      priority: "medium",
      metadata: { investor: "John Smith", dealName: "Whitehall Assemblage" }
    },
    {
      id: "5",
      type: "outreach_sent",
      title: "Outreach Campaign Initiated",
      description: "Sent personalized emails to 5 qualified sellers",
      timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
      priority: "low",
      metadata: {}
    },
    {
      id: "6",
      type: "alert",
      title: "Opportunity Zone Tax Deadline",
      description: "180-day investment window for OZ benefits - 45 days remaining",
      timestamp: new Date(Date.now() - 1000 * 60 * 480), // 8 hours ago
      priority: "high",
      metadata: {}
    },
  ]);

  const [filter, setFilter] = useState<string>("all");

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "deal_found":
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case "analysis_complete":
        return <FileText className="w-5 h-5 text-blue-400" />;
      case "outreach_sent":
        return <Users className="w-5 h-5 text-purple-400" />;
      case "investor_action":
        return <DollarSign className="w-5 h-5 text-yellow-400" />;
      case "milestone":
        return <Clock className="w-5 h-5 text-orange-400" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: Activity["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-500/5";
      case "medium":
        return "border-l-yellow-500 bg-yellow-500/5";
      case "low":
        return "border-l-blue-500 bg-blue-500/5";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredActivities = filter === "all" 
    ? activities 
    : activities.filter(a => a.type === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Activity Feed</h2>
        <div className="flex gap-2">
          <Badge 
            variant={filter === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter("all")}
          >
            All
          </Badge>
          <Badge 
            variant={filter === "deal_found" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter("deal_found")}
          >
            Deals
          </Badge>
          <Badge 
            variant={filter === "alert" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter("alert")}
          >
            Alerts
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {filteredActivities.map((activity) => (
          <Card 
            key={activity.id}
            className={`p-4 border-l-4 ${getPriorityColor(activity.priority)} hover:shadow-lg transition-all cursor-pointer`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm">{activity.title}</h3>
                  <span className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                {activity.metadata && (
                  <div className="flex gap-2 mt-2">
                    {activity.metadata.score && (
                      <Badge variant="outline" className="text-xs">
                        Score: {activity.metadata.score}
                      </Badge>
                    )}
                    {activity.metadata.amount && (
                      <Badge variant="outline" className="text-xs">
                        ${(activity.metadata.amount / 1000000).toFixed(1)}M
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
