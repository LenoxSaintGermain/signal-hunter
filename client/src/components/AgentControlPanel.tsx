import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Settings, Activity, Clock, CheckCircle2 } from "lucide-react";

export function AgentControlPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [lastScan, setLastScan] = useState("2 hours ago");

  const handleToggleScan = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setLastScan("Running now...");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            AI Research Agent
          </CardTitle>
          <Badge variant={isRunning ? "default" : "secondary"}>
            {isRunning ? "Active" : "Idle"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last Scan</span>
              </div>
              <div className="font-semibold">{lastScan}</div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Deals Found</span>
              </div>
              <div className="font-semibold">12 opportunities</div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sources</span>
              </div>
              <div className="font-semibold">11 platforms</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <Button 
              onClick={handleToggleScan}
              className="flex-1"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Scanning
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Scanning
                </>
              )}
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>

          {/* Scanning Sources */}
          <div>
            <h4 className="font-semibold mb-3">Active Sources</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "BizBuySell",
                "BizQuest",
                "Crexi",
                "LoopNet",
                "SAM.gov",
                "MergerNetwork",
                "BusinessBroker.net",
                "BizBen",
                "DealStream",
                "BusinessMart",
                "SBA Listings"
              ].map((source) => (
                <div key={source} className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
                  <span className="text-muted-foreground">{source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
