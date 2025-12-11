import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Loader2, CheckCircle2, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface InvestorIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunityId?: string;
  opportunityName?: string;
}

export default function InvestorIntakeModal({
  isOpen,
  onClose,
  opportunityId = "ponce-protocol",
  opportunityName = "Ponce Protocol",
}: InvestorIntakeModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    investorType: "",
    capitalRange: "",
    checkSize: "",
    experienceLevel: "",
    dealTypes: [] as string[],
    timeHorizon: "",
    riskAppetite: "",
    geographyPreference: "",
    liquidityPreference: "",
    investmentGoals: "",
    notesAdditional: "",
  });

  const submitIntakeMutation = trpc.investors.submitIntake.useMutation({
    onSuccess: () => {
      setStep("success");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitIntakeMutation.mutate({
      ...formData,
      opportunityId,
      opportunityName,
    });
  };

  const handleDealTypeToggle = (dealType: string) => {
    setFormData((prev) => ({
      ...prev,
      dealTypes: prev.dealTypes.includes(dealType)
        ? prev.dealTypes.filter((t) => t !== dealType)
        : [...prev.dealTypes, dealType],
    }));
  };

  if (!isOpen) return null;

  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Success Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-12 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Your personalized investment dossier is being prepared.
            </h2>
            <p className="text-xl text-gray-600">
              Expect an email within 2 minutes.
            </p>
          </div>

          <Button
            onClick={() =>
              window.open(
                "https://calendar.google.com/calendar/u/0?cid=MTk5NzM0OGRmYWJkYTY3YTdmN2EyOGVlYTMzNGM4MzgyMTczMzlmYTllNDUzOTk1Y2Q2YzE3NWU2NDUwODRhZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
                "_blank"
              )
            }
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule a Call
          </Button>

          <button
            onClick={onClose}
            className="mt-6 text-gray-500 hover:text-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Glassmorphic Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 rounded-t-3xl px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Join Investor List
            </h2>
            <p className="text-gray-600 mt-1">
              {opportunityName} • AI-Powered Investor Matching
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-gray-700 font-medium">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="mt-2 h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700 font-medium">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="mt-2 h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-2 h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Phone (Optional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="mt-2 h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Investor Profile */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Investor Profile
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 font-medium">
                  Investor Type *
                </Label>
                <Select
                  required
                  value={formData.investorType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, investorType: value })
                  }
                >
                  <SelectTrigger className="mt-2 h-12 rounded-xl">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="fund">Fund</SelectItem>
                    <SelectItem value="trust">Trust</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 font-medium">
                  Net Investable Capital Range *
                </Label>
                <Select
                  required
                  value={formData.capitalRange}
                  onValueChange={(value) =>
                    setFormData({ ...formData, capitalRange: value })
                  }
                >
                  <SelectTrigger className="mt-2 h-12 rounded-xl">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-100k">Under $100K</SelectItem>
                    <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                    <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="1m-plus">$1M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 font-medium">
                  Check Size Preference *
                </Label>
                <Select
                  required
                  value={formData.checkSize}
                  onValueChange={(value) =>
                    setFormData({ ...formData, checkSize: value })
                  }
                >
                  <SelectTrigger className="mt-2 h-12 rounded-xl">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25k">$25K</SelectItem>
                    <SelectItem value="50k">$50K</SelectItem>
                    <SelectItem value="100k">$100K</SelectItem>
                    <SelectItem value="250k">$250K</SelectItem>
                    <SelectItem value="500k-plus">$500K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 font-medium">
                  Experience Level *
                </Label>
                <Select
                  required
                  value={formData.experienceLevel}
                  onValueChange={(value) =>
                    setFormData({ ...formData, experienceLevel: value })
                  }
                >
                  <SelectTrigger className="mt-2 h-12 rounded-xl">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="institutional">Institutional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Investment Preferences */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Investment Preferences
            </h3>

            <div>
              <Label className="text-gray-700 font-medium mb-3 block">
                Deal Types Interested In *
              </Label>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Short-Term Rentals",
                  "Land Assemblage",
                  "Development",
                  "Cash-Flow Biz w/ Real Estate",
                  "Opportunity Zones",
                  "Value-Add Multifamily",
                ].map((dealType) => (
                  <div key={dealType} className="flex items-center space-x-3">
                    <Checkbox
                      id={dealType}
                      checked={formData.dealTypes.includes(dealType)}
                      onCheckedChange={() => handleDealTypeToggle(dealType)}
                    />
                    <Label
                      htmlFor={dealType}
                      className="text-gray-700 cursor-pointer"
                    >
                      {dealType}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 font-medium">
                  Time Horizon *
                </Label>
                <Select
                  required
                  value={formData.timeHorizon}
                  onValueChange={(value) =>
                    setFormData({ ...formData, timeHorizon: value })
                  }
                >
                  <SelectTrigger className="mt-2 h-12 rounded-xl">
                    <SelectValue placeholder="Select horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2yrs">0-2 years</SelectItem>
                    <SelectItem value="3-5yrs">3-5 years</SelectItem>
                    <SelectItem value="6-10yrs">6-10 years</SelectItem>
                    <SelectItem value="10plus">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 font-medium">
                  Risk Appetite *
                </Label>
                <Select
                  required
                  value={formData.riskAppetite}
                  onValueChange={(value) =>
                    setFormData({ ...formData, riskAppetite: value })
                  }
                >
                  <SelectTrigger className="mt-2 h-12 rounded-xl">
                    <SelectValue placeholder="Select appetite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 font-medium">
                  Geography Preference *
                </Label>
                <Select
                  required
                  value={formData.geographyPreference}
                  onValueChange={(value) =>
                    setFormData({ ...formData, geographyPreference: value })
                  }
                >
                  <SelectTrigger className="mt-2 h-12 rounded-xl">
                    <SelectValue placeholder="Select geography" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local-atl">Local ATL</SelectItem>
                    <SelectItem value="southeast">Southeast</SelectItem>
                    <SelectItem value="us-national">US National</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 font-medium">
                  Liquidity Preference *
                </Label>
                <Select
                  required
                  value={formData.liquidityPreference}
                  onValueChange={(value) =>
                    setFormData({ ...formData, liquidityPreference: value })
                  }
                >
                  <SelectTrigger className="mt-2 h-12 rounded-xl">
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Liquidity</SelectItem>
                    <SelectItem value="some">Some Liquidity</SelectItem>
                    <SelectItem value="locked-ok">Locked is OK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="goals" className="text-gray-700 font-medium">
                Tell us your investment goals *
              </Label>
              <Textarea
                id="goals"
                required
                value={formData.investmentGoals}
                onChange={(e) =>
                  setFormData({ ...formData, investmentGoals: e.target.value })
                }
                placeholder="What are you looking to achieve with your investments?"
                className="mt-2 min-h-[120px] rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-gray-700 font-medium">
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={formData.notesAdditional}
                onChange={(e) =>
                  setFormData({ ...formData, notesAdditional: e.target.value })
                }
                placeholder="Any other information you'd like to share?"
                className="mt-2 min-h-[100px] rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <Button
              type="submit"
              disabled={submitIntakeMutation.isPending}
              className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitIntakeMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Your Dossier...
                </>
              ) : (
                "Submit & Get Personalized Recommendations"
              )}
            </Button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Our AI will analyze your profile and match you with suitable opportunities
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
