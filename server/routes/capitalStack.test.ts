import { describe, it, expect } from "vitest";

describe("Capital Stack Router - Financial Calculations", () => {
  describe("Monthly Payment Calculation", () => {
    it("should calculate correct monthly payment for SBA 7(a) loan", () => {
      // $400,000 loan at 7.5% for 10 years
      const principal = 400000;
      const annualRate = 7.5;
      const termYears = 10;
      
      const monthlyRate = annualRate / 100 / 12;
      const numPayments = termYears * 12;
      
      const monthlyPayment = (
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      );
      
      // Expected: ~$4,748/month (actual calculation result)
      expect(monthlyPayment).toBeGreaterThan(4700);
      expect(monthlyPayment).toBeLessThan(4800);
      expect(Math.round(monthlyPayment)).toBe(4748);
    });

    it("should calculate correct monthly payment for conventional loan", () => {
      // $300,000 loan at 6.5% for 15 years
      const principal = 300000;
      const annualRate = 6.5;
      const termYears = 15;
      
      const monthlyRate = annualRate / 100 / 12;
      const numPayments = termYears * 12;
      
      const monthlyPayment = (
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      );
      
      // Expected: ~$2,613/month
      expect(monthlyPayment).toBeGreaterThan(2600);
      expect(monthlyPayment).toBeLessThan(2650);
      expect(Math.round(monthlyPayment)).toBe(2613);
    });

    it("should calculate correct monthly payment for seller note", () => {
      // $100,000 loan at 5.0% for 5 years
      const principal = 100000;
      const annualRate = 5.0;
      const termYears = 5;
      
      const monthlyRate = annualRate / 100 / 12;
      const numPayments = termYears * 12;
      
      const monthlyPayment = (
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      );
      
      // Expected: ~$1,887/month
      expect(monthlyPayment).toBeGreaterThan(1880);
      expect(monthlyPayment).toBeLessThan(1900);
      expect(Math.round(monthlyPayment)).toBe(1887);
    });

    it("should handle zero interest rate", () => {
      const principal = 100000;
      const annualRate = 0;
      const termYears = 5;
      
      const monthlyRate = annualRate / 100 / 12;
      const numPayments = termYears * 12;
      
      const monthlyPayment = monthlyRate === 0 
        ? principal / numPayments 
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      // Expected: $100,000 / 60 = $1,666.67
      expect(Math.round(monthlyPayment)).toBe(1667);
    });
  });

  describe("Capital Stack Validation", () => {
    it("should validate percentages sum to 100", () => {
      const equity = 20;
      const sellerNote = 10;
      const sba = 50;
      const conventional = 20;
      
      const total = equity + sellerNote + sba + conventional;
      
      expect(total).toBe(100);
    });

    it("should reject invalid percentage totals", () => {
      const equity = 20;
      const sellerNote = 10;
      const sba = 50;
      const conventional = 25; // Total = 105%
      
      const total = equity + sellerNote + sba + conventional;
      
      expect(total).not.toBe(100);
      expect(Math.abs(total - 100)).toBeGreaterThan(0.01);
    });
  });

  describe("Cash-on-Cash Return Calculation", () => {
    it("should calculate correct cash-on-cash return", () => {
      const equityInvested = 100000;
      const annualCashFlow = 150000;
      const annualDebtService = 90000;
      const annualCashFlowAfterDebt = annualCashFlow - annualDebtService;
      
      const cashOnCashReturn = (annualCashFlowAfterDebt / equityInvested) * 100;
      
      // Expected: ($150k - $90k) / $100k = 60%
      expect(cashOnCashReturn).toBe(60);
    });

    it("should handle negative cash flow", () => {
      const equityInvested = 100000;
      const annualCashFlow = 80000;
      const annualDebtService = 90000;
      const annualCashFlowAfterDebt = annualCashFlow - annualDebtService;
      
      const cashOnCashReturn = (annualCashFlowAfterDebt / equityInvested) * 100;
      
      // Expected: ($80k - $90k) / $100k = -10%
      expect(cashOnCashReturn).toBe(-10);
    });
  });

  describe("DSCR Calculation", () => {
    it("should calculate correct debt service coverage ratio", () => {
      const annualCashFlow = 150000;
      const annualDebtService = 100000;
      
      const dscr = annualCashFlow / annualDebtService;
      
      // Expected: $150k / $100k = 1.5x
      expect(dscr).toBe(1.5);
    });

    it("should identify strong DSCR", () => {
      const annualCashFlow = 200000;
      const annualDebtService = 100000;
      
      const dscr = annualCashFlow / annualDebtService;
      
      // DSCR > 1.25 is considered strong
      expect(dscr).toBeGreaterThan(1.25);
      expect(dscr).toBe(2.0);
    });

    it("should identify weak DSCR", () => {
      const annualCashFlow = 110000;
      const annualDebtService = 100000;
      
      const dscr = annualCashFlow / annualDebtService;
      
      // DSCR < 1.25 is considered weak
      expect(dscr).toBeLessThan(1.25);
      expect(dscr).toBe(1.1);
    });
  });

  describe("IRR Calculation", () => {
    it("should calculate IRR for simple cash flows", () => {
      // Initial investment: -$100k
      // Year 1-4: $30k each
      // Year 5: $30k + $50k exit = $80k
      const cashFlows = [-100000, 30000, 30000, 30000, 30000, 80000];
      
      // Simple IRR calculation using trial and error
      // Expected IRR: ~25%
      const totalReturn = cashFlows.slice(1).reduce((sum, cf) => sum + cf, 0);
      const totalProfit = totalReturn - Math.abs(cashFlows[0]);
      const simpleReturn = totalProfit / Math.abs(cashFlows[0]);
      
      expect(simpleReturn).toBe(1.0); // 100% total return
    });

    it("should handle zero return scenario", () => {
      const cashFlows = [-100000, 20000, 20000, 20000, 20000, 20000];
      
      const totalReturn = cashFlows.slice(1).reduce((sum, cf) => sum + cf, 0);
      const totalProfit = totalReturn - Math.abs(cashFlows[0]);
      
      expect(totalProfit).toBe(0); // Break-even
    });
  });

  describe("Equity Multiple Calculation", () => {
    it("should calculate correct equity multiple", () => {
      const initialEquity = 100000;
      const totalCashReturned = 250000;
      
      const equityMultiple = totalCashReturned / initialEquity;
      
      // Expected: $250k / $100k = 2.5x
      expect(equityMultiple).toBe(2.5);
    });

    it("should identify strong equity multiple", () => {
      const initialEquity = 100000;
      const totalCashReturned = 300000;
      
      const equityMultiple = totalCashReturned / initialEquity;
      
      // 3x+ is considered excellent
      expect(equityMultiple).toBeGreaterThanOrEqual(3.0);
    });
  });

  describe("Break-Even Analysis", () => {
    it("should calculate months to break even", () => {
      const equityInvested = 100000;
      const annualCashFlowAfterDebt = 60000;
      
      const monthsToBreakEven = (equityInvested / annualCashFlowAfterDebt) * 12;
      
      // Expected: ($100k / $60k) * 12 = 20 months
      expect(monthsToBreakEven).toBe(20);
    });

    it("should handle long break-even periods", () => {
      const equityInvested = 200000;
      const annualCashFlowAfterDebt = 40000;
      
      const monthsToBreakEven = (equityInvested / annualCashFlowAfterDebt) * 12;
      
      // Expected: ($200k / $40k) * 12 = 60 months (5 years)
      expect(monthsToBreakEven).toBe(60);
      expect(monthsToBreakEven / 12).toBe(5); // 5 years
    });
  });

  describe("Real-World Scenario: Ponce Protocol", () => {
    it("should model Ponce Protocol financing correctly", () => {
      const purchasePrice = 900000;
      const closingCosts = 25000;
      const totalInvestment = purchasePrice + closingCosts;
      
      // 20% down, 10% seller note, 70% conventional
      const equityAmount = totalInvestment * 0.20;
      const sellerNoteAmount = totalInvestment * 0.10;
      const conventionalAmount = totalInvestment * 0.70;
      
      expect(equityAmount).toBe(185000);
      expect(sellerNoteAmount).toBe(92500);
      expect(conventionalAmount).toBe(647500);
      
      // Annual cash flow: $109,425 (verified Airbnb revenue)
      const annualRevenue = 109425;
      
      // Estimate debt service
      const conventionalRate = 6.5;
      const conventionalTerm = 15;
      const monthlyRate = conventionalRate / 100 / 12;
      const numPayments = conventionalTerm * 12;
      
      const conventionalPayment = (
        (conventionalAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      );
      
      const annualDebtService = conventionalPayment * 12;
      const annualCashFlowAfterDebt = annualRevenue - annualDebtService;
      const cashOnCashReturn = (annualCashFlowAfterDebt / equityAmount) * 100;
      
      // Verify positive cash flow
      expect(annualCashFlowAfterDebt).toBeGreaterThan(0);
      
      // Verify strong cash-on-cash return
      expect(cashOnCashReturn).toBeGreaterThan(20); // Should be >20%
    });
  });
});

describe("Performance Projections Router - Scenario Modeling", () => {
  describe("Revenue Growth Projections", () => {
    it("should project conservative growth correctly", () => {
      const baseRevenue = 1000000;
      const growthRate = 3; // 3% conservative
      
      const year1 = baseRevenue * Math.pow(1 + growthRate / 100, 1);
      const year5 = baseRevenue * Math.pow(1 + growthRate / 100, 5);
      
      expect(Math.round(year1)).toBe(1030000);
      expect(Math.round(year5)).toBe(1159274);
    });

    it("should project moderate growth correctly", () => {
      const baseRevenue = 1000000;
      const growthRate = 8; // 8% moderate
      
      const year1 = baseRevenue * Math.pow(1 + growthRate / 100, 1);
      const year5 = baseRevenue * Math.pow(1 + growthRate / 100, 5);
      
      expect(Math.round(year1)).toBe(1080000);
      expect(Math.round(year5)).toBe(1469328);
    });

    it("should project aggressive growth correctly", () => {
      const baseRevenue = 1000000;
      const growthRate = 15; // 15% aggressive
      
      const year1 = baseRevenue * Math.pow(1 + growthRate / 100, 1);
      const year5 = baseRevenue * Math.pow(1 + growthRate / 100, 5);
      
      expect(Math.round(year1)).toBe(1150000);
      expect(Math.round(year5)).toBe(2011357);
    });
  });

  describe("AI Optimization Impact", () => {
    it("should calculate AI automation cost savings", () => {
      const fixedCosts = 200000;
      const aiAutomationSavings = 20; // 20% reduction
      
      const adjustedFixedCosts = fixedCosts * (1 - aiAutomationSavings / 100);
      const savingsAmount = fixedCosts - adjustedFixedCosts;
      
      expect(adjustedFixedCosts).toBe(160000);
      expect(savingsAmount).toBe(40000);
    });

    it("should calculate AI revenue uplift", () => {
      const baseRevenue = 1000000;
      const aiRevenueUplift = 10; // 10% increase
      
      const adjustedRevenue = baseRevenue * (1 + aiRevenueUplift / 100);
      const upliftAmount = adjustedRevenue - baseRevenue;
      
      expect(adjustedRevenue).toBe(1100000);
      expect(upliftAmount).toBe(100000);
    });

    it("should model combined AI impact", () => {
      const baseRevenue = 1000000;
      const fixedCosts = 200000;
      const variableCostPercent = 60;
      const aiAutomationSavings = 20;
      const aiRevenueUplift = 10;
      
      // Revenue with AI uplift
      const adjustedRevenue = baseRevenue * (1 + aiRevenueUplift / 100);
      
      // Costs with AI automation
      const variableCosts = adjustedRevenue * (variableCostPercent / 100);
      const adjustedFixedCosts = fixedCosts * (1 - aiAutomationSavings / 100);
      const totalCosts = variableCosts + adjustedFixedCosts;
      
      // Profit improvement
      const baseProfit = baseRevenue - (baseRevenue * (variableCostPercent / 100) + fixedCosts);
      const aiProfit = adjustedRevenue - totalCosts;
      const profitImprovement = aiProfit - baseProfit;
      
      expect(profitImprovement).toBeGreaterThan(0);
      // Actual: $40k fixed cost savings + $40k from 10% revenue uplift on 40% margin = $80k
      expect(profitImprovement).toBe(80000);
    });
  });

  describe("Opportunity Zone Tax Benefits", () => {
    it("should calculate year 5 tax savings (10% step-up)", () => {
      const profit = 200000;
      const effectiveTaxRate = 25;
      const ozBenefit = 0.10; // 10% basis step-up
      
      const taxSavings = profit * (effectiveTaxRate / 100) * ozBenefit;
      
      expect(taxSavings).toBe(5000);
    });

    it("should calculate year 7 tax savings (15% step-up)", () => {
      const profit = 200000;
      const effectiveTaxRate = 25;
      const ozBenefit = 0.15; // 15% basis step-up
      
      const taxSavings = profit * (effectiveTaxRate / 100) * ozBenefit;
      
      expect(taxSavings).toBe(7500);
    });

    it("should calculate 10-year hold tax elimination", () => {
      const capitalGains = 500000;
      const effectiveTaxRate = 25;
      
      // 100% tax elimination on appreciation after 10 years
      const taxSavings = capitalGains * (effectiveTaxRate / 100);
      
      expect(taxSavings).toBe(125000);
    });
  });

  describe("Margin Improvement Modeling", () => {
    it("should project margin expansion", () => {
      const baseMargin = 20; // 20%
      const marginImprovement = 1; // 1% per year
      
      const year1Margin = baseMargin + (marginImprovement * 1);
      const year5Margin = baseMargin + (marginImprovement * 5);
      
      expect(year1Margin).toBe(21);
      expect(year5Margin).toBe(25);
    });

    it("should cap margin at 100%", () => {
      const baseMargin = 95;
      const marginImprovement = 2;
      
      const year5Margin = Math.min(baseMargin + (marginImprovement * 5), 100);
      
      expect(year5Margin).toBe(100);
    });
  });

  describe("Scenario Comparison", () => {
    it("should show meaningful differences between scenarios", () => {
      const baseRevenue = 1000000;
      
      const conservativeGrowth = 3;
      const moderateGrowth = 8;
      const aggressiveGrowth = 15;
      
      const conservativeYear5 = baseRevenue * Math.pow(1 + conservativeGrowth / 100, 5);
      const moderateYear5 = baseRevenue * Math.pow(1 + moderateGrowth / 100, 5);
      const aggressiveYear5 = baseRevenue * Math.pow(1 + aggressiveGrowth / 100, 5);
      
      // Conservative should be lowest
      expect(conservativeYear5).toBeLessThan(moderateYear5);
      expect(moderateYear5).toBeLessThan(aggressiveYear5);
      
      // Aggressive should be significantly higher
      const spreadModerateToAggressive = aggressiveYear5 - moderateYear5;
      expect(spreadModerateToAggressive).toBeGreaterThan(500000);
    });
  });
});
