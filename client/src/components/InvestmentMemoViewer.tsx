import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar } from "lucide-react";

const mockMemos = [
  {
    id: "1",
    business_name: "Precision Manufacturing Co",
    created_date: "2024-11-10",
    status: "Final",
    highlights: [
      "Strong SDE margin of 28.6%",
      "Government contract pipeline worth $2.1M",
      "High AI automation potential (92%)",
      "SDVOSB certification advantage"
    ]
  },
  {
    id: "2",
    business_name: "Elite Security Services",
    created_date: "2024-11-08",
    status: "Draft",
    highlights: [
      "Recurring revenue model",
      "Active security clearances",
      "Scalable operations",
      "Strong cash flow"
    ]
  }
];

export default function InvestmentMemoViewer() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Investment Memos</h2>
          <p className="text-muted-foreground">
            AI-generated investment analysis and recommendations
          </p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate New Memo
        </Button>
      </div>

      <div className="grid gap-6">
        {mockMemos.map((memo) => (
          <Card key={memo.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-2">{memo.business_name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(memo.created_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Badge variant={memo.status === "Final" ? "default" : "secondary"}>
                  {memo.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Key Highlights</h4>
                <ul className="space-y-2">
                  {memo.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Memo
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockMemos.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No investment memos yet.</p>
            <Button>Generate Your First Memo</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
