import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface DealFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deal?: any; // Existing deal for edit mode
  onSuccess?: () => void;
}

const STAGES = [
  { value: "lead", label: "Lead" },
  { value: "initial_review", label: "Initial Review" },
  { value: "due_diligence", label: "Due Diligence" },
  { value: "negotiation", label: "Negotiation" },
  { value: "offer_submitted", label: "Offer Submitted" },
  { value: "closing", label: "Closing" },
  { value: "closed_won", label: "Closed Won" },
  { value: "closed_lost", label: "Closed Lost" },
];

export default function DealFormModal({ open, onOpenChange, deal, onSuccess }: DealFormModalProps) {
  const isEditMode = !!deal;
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    location: "",
    price: "",
    revenue: "",
    cashFlow: "",
    sdeMargin: "",
    stage: "lead",
    opportunityZone: false,
    aiPotential: "50",
    certAdvantage: "50",
    notes: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  // Populate form in edit mode
  useEffect(() => {
    if (deal) {
      setFormData({
        name: deal.name || "",
        description: deal.description || "",
        industry: deal.industry || "",
        location: deal.location || "",
        price: deal.price?.toString() || "",
        revenue: deal.revenue?.toString() || "",
        cashFlow: deal.cashFlow?.toString() || "",
        sdeMargin: deal.sdeMargin ? (deal.sdeMargin * 100).toString() : "",
        stage: deal.stage || "lead",
        opportunityZone: deal.opportunityZone || false,
        aiPotential: deal.aiPotential?.toString() || "50",
        certAdvantage: deal.certAdvantage?.toString() || "50",
        notes: deal.notes || "",
        contactName: deal.contactName || "",
        contactEmail: deal.contactEmail || "",
        contactPhone: deal.contactPhone || "",
      });
    }
  }, [deal]);

  const createMutation = trpc.dealsV2.create.useMutation({
    onSuccess: () => {
      toast.success("Deal created successfully!");
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to create deal: ${error.message}`);
    },
  });

  const updateMutation = trpc.dealsV2.update.useMutation({
    onSuccess: () => {
      toast.success("Deal updated successfully!");
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to update deal: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      price: formData.price ? parseFloat(formData.price) : 0,
      stage: formData.stage as any,
      description: formData.description || undefined,
      industry: formData.industry || undefined,
      location: formData.location || undefined,
      revenue: formData.revenue ? parseFloat(formData.revenue) : undefined,
      cashFlow: formData.cashFlow ? parseFloat(formData.cashFlow) : undefined,
      sdeMargin: formData.sdeMargin ? parseFloat(formData.sdeMargin) / 100 : undefined,
      opportunityZone: formData.opportunityZone,
      aiPotential: parseInt(formData.aiPotential),
      certAdvantage: parseInt(formData.certAdvantage),
      notes: formData.notes || undefined,
      contactName: formData.contactName || undefined,
      contactEmail: formData.contactEmail || undefined,
      contactPhone: formData.contactPhone || undefined,
    };

    if (isEditMode) {
      updateMutation.mutate({ id: deal.id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Deal" : "New Deal"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update deal information" : "Add a new acquisition opportunity"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Deal Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Ponce Protocol - Hospitality Business"
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the opportunity..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g., Hospitality / Real Estate"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Atlanta, GA"
                />
              </div>

              <div>
                <Label htmlFor="stage">Stage</Label>
                <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STAGES.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Financial Metrics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Asking Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="850000"
                />
              </div>

              <div>
                <Label htmlFor="revenue">Annual Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                  placeholder="109000"
                />
              </div>

              <div>
                <Label htmlFor="cashFlow">Annual Cash Flow ($)</Label>
                <Input
                  id="cashFlow"
                  type="number"
                  value={formData.cashFlow}
                  onChange={(e) => setFormData({ ...formData, cashFlow: e.target.value })}
                  placeholder="85000"
                />
              </div>

              <div>
                <Label htmlFor="sdeMargin">SDE Margin (%)</Label>
                <Input
                  id="sdeMargin"
                  type="number"
                  step="0.1"
                  value={formData.sdeMargin}
                  onChange={(e) => setFormData({ ...formData, sdeMargin: e.target.value })}
                  placeholder="78"
                />
              </div>
            </div>
          </div>

          {/* Strategic Factors */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Strategic Factors</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aiPotential">AI Potential (0-100)</Label>
                <Input
                  id="aiPotential"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.aiPotential}
                  onChange={(e) => setFormData({ ...formData, aiPotential: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="certAdvantage">SDVOSB Cert Advantage (0-100)</Label>
                <Input
                  id="certAdvantage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.certAdvantage}
                  onChange={(e) => setFormData({ ...formData, certAdvantage: e.target.value })}
                />
              </div>

              <div className="col-span-2 flex items-center space-x-2">
                <Switch
                  id="opportunityZone"
                  checked={formData.opportunityZone}
                  onCheckedChange={(checked) => setFormData({ ...formData, opportunityZone: checked })}
                />
                <Label htmlFor="opportunityZone" className="cursor-pointer">
                  Located in Opportunity Zone
                </Label>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes about this opportunity..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : isEditMode ? "Update Deal" : "Create Deal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
