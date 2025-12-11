import { Button } from "@/components/ui/button";
import { Calculator, Download, Phone, Users } from "lucide-react";

interface QuickActionsPanelProps {
  onRunNumbers?: () => void;
  onJoinInvestorList?: () => void;
  onScheduleCall?: () => void;
  onDownloadDD?: () => void;
}

export default function QuickActionsPanel({
  onRunNumbers,
  onJoinInvestorList,
  onScheduleCall,
  onDownloadDD,
}: QuickActionsPanelProps) {
  return (
    <div className="metric-card space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1" style={{ color: '#1D1D1F' }}>
          Next Steps
        </h3>
        <p className="text-sm" style={{ color: '#6E6E73' }}>
          Choose what you'd like to do next for this opportunity.
        </p>
      </div>

      <div className="space-y-3">
        {onRunNumbers && (
          <Button 
            onClick={onRunNumbers}
            className="w-full btn-apple-primary"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Run Your Numbers
          </Button>
        )}

        {onJoinInvestorList && (
          <Button 
            onClick={onJoinInvestorList}
            className="w-full btn-apple-primary"
          >
            <Users className="w-4 h-4 mr-2" />
            Join Investor List
          </Button>
        )}

        {onScheduleCall && (
          <Button 
            onClick={onScheduleCall}
            className="w-full btn-apple-secondary"
          >
            <Phone className="w-4 h-4 mr-2" />
            Schedule Call
          </Button>
        )}

        {onDownloadDD && (
          <Button 
            onClick={onDownloadDD}
            className="w-full btn-apple-secondary"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Due Diligence
          </Button>
        )}
      </div>
    </div>
  );
}
