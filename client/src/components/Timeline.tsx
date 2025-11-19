import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock, AlertCircle, TrendingUp, FileText, DollarSign, Calendar } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: "milestone" | "action" | "deadline" | "achievement";
  status: "completed" | "in_progress" | "upcoming" | "overdue";
  dealName?: string;
  amount?: number;
}

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Whitehall Assemblage Discovered",
    description: "High-scoring 2.31-acre development site identified near Mercedes-Benz Stadium",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    type: "achievement",
    status: "completed",
    dealName: "Whitehall Assemblage",
    amount: 5000000
  },
  {
    id: "2",
    title: "Investment Analysis Completed",
    description: "Comprehensive financial model and FIFA 2026 revenue projections finalized",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: "milestone",
    status: "completed",
    dealName: "Whitehall Assemblage"
  },
  {
    id: "3",
    title: "Investor Presentation Scheduled",
    description: "Meeting with capital partners to review Assemblage opportunity",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    type: "action",
    status: "upcoming",
    dealName: "Whitehall Assemblage"
  },
  {
    id: "4",
    title: "514 Whitehall Flex-Stack Design",
    description: "Architectural renderings and 3D visualizations completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    type: "milestone",
    status: "completed",
    dealName: "514 Whitehall"
  },
  {
    id: "5",
    title: "FIFA 2026 Preparation Deadline",
    description: "Last date to close on Assemblage and prepare for World Cup revenue",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60), // 60 days from now
    type: "deadline",
    status: "upcoming",
    dealName: "Whitehall Assemblage"
  },
  {
    id: "6",
    title: "Opportunity Zone Investment Window",
    description: "180-day deadline to invest capital gains in OZ property",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45), // 45 days from now
    type: "deadline",
    status: "upcoming"
  },
  {
    id: "7",
    title: "Due Diligence Phase",
    description: "Site inspection, title search, and environmental assessment",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    type: "action",
    status: "in_progress",
    dealName: "514 Whitehall"
  },
];

export function Timeline() {
  const getIcon = (type: TimelineEvent["type"], status: TimelineEvent["status"]) => {
    if (status === "completed") {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    if (status === "overdue") {
      return <AlertCircle className="w-6 h-6 text-red-500" />;
    }
    if (status === "in_progress") {
      return <Clock className="w-6 h-6 text-yellow-500 animate-pulse" />;
    }

    switch (type) {
      case "milestone":
        return <TrendingUp className="w-6 h-6 text-blue-500" />;
      case "action":
        return <FileText className="w-6 h-6 text-purple-500" />;
      case "deadline":
        return <Calendar className="w-6 h-6 text-orange-500" />;
      case "achievement":
        return <DollarSign className="w-6 h-6 text-green-500" />;
      default:
        return <Circle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 border-green-500/20";
      case "in_progress":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "upcoming":
        return "bg-blue-500/10 border-blue-500/20";
      case "overdue":
        return "bg-red-500/10 border-red-500/20";
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
    const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));

    if (diff < 0) {
      // Past
      if (hours < 24) return `${hours}h ago`;
      if (days === 1) return "Yesterday";
      return `${days}d ago`;
    } else {
      // Future
      if (hours < 24) return `In ${hours}h`;
      if (days === 1) return "Tomorrow";
      return `In ${days}d`;
    }
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const sortedEvents = [...mockEvents].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Deal Timeline</h2>
        <div className="flex gap-2">
          <Badge variant="outline">All Events</Badge>
          <Badge variant="outline">Milestones</Badge>
          <Badge variant="outline">Deadlines</Badge>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

        <div className="space-y-6">
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative pl-16">
              {/* Timeline Dot */}
              <div className="absolute left-3 top-2 -translate-x-1/2">
                {getIcon(event.type, event.status)}
              </div>

              <Card className={`p-4 ${getStatusColor(event.status)}`}>
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {event.description}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {formatDate(event.date)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatFullDate(event.date)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {event.dealName && (
                      <Badge variant="secondary" className="text-xs">
                        {event.dealName}
                      </Badge>
                    )}
                    {event.amount && (
                      <Badge variant="outline" className="text-xs">
                        ${(event.amount / 1000000).toFixed(1)}M
                      </Badge>
                    )}
                    <Badge 
                      variant="outline" 
                      className={`text-xs capitalize ${
                        event.status === "completed" ? "text-green-600" :
                        event.status === "in_progress" ? "text-yellow-600" :
                        event.status === "overdue" ? "text-red-600" :
                        "text-blue-600"
                      }`}
                    >
                      {event.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="p-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Completed</h4>
          <p className="text-2xl font-bold text-green-600">
            {mockEvents.filter(e => e.status === "completed").length}
          </p>
        </Card>
        <Card className="p-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">In Progress</h4>
          <p className="text-2xl font-bold text-yellow-600">
            {mockEvents.filter(e => e.status === "in_progress").length}
          </p>
        </Card>
        <Card className="p-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Upcoming</h4>
          <p className="text-2xl font-bold text-blue-600">
            {mockEvents.filter(e => e.status === "upcoming").length}
          </p>
        </Card>
        <Card className="p-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Overdue</h4>
          <p className="text-2xl font-bold text-red-600">
            {mockEvents.filter(e => e.status === "overdue").length}
          </p>
        </Card>
      </div>
    </div>
  );
}
