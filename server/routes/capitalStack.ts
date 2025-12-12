import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

/**
 * Capital Stack Router for financing scenario modeling
 * 
 * Provides real-time calculations for:
 * - Multiple financing structures (equity, seller note, SBA 7(a), conventional)
 * - ROI metrics (cash-on-cash return, IRR, equity multiple)
 * - Debt service coverage ratio (DSCR)
 * - Break-even analysis
 */

const capitalStackSchema = z.object({
  dealId: z.number(),
  scenarioName: z.string().optional(),
  
  // Purchase details
  purchasePrice: z.number().positive(),
  closingCosts: z.number().default(0),
  
  // Financing structure (percentages must sum to 100)
  equityPercent: z.number().min(0).max(100),
  sellerNotePercent: z.number().min(0).max(100).default(0),
  sba7aPercent: z.number().min(0).max(100).default(0),
  conventionalLoanPercent: z.number().min(0).max(100).default(0),
  
  // Loan terms
  sbaInterestRate: z.number().min(0).max(20).default(7.5), // %
  sbaTermYears: z.number().min(1).max(25).default(10),
  conventionalInterestRate: z.number().min(0).max(20).default(6.5), // %
  conventionalTermYears: z.number().min(1).max(30).default(15),
  sellerNoteInterestRate: z.number().min(0).max(20).default(5.0), // %
  sellerNoteTermYears: z.number().min(1).max(10).default(5),
  
  // Operating assumptions
  annualRevenue: z.number().positive(),
  annualCashFlow: z.number().positive(),
  revenueGrowthRate: z.number().min(-50).max(100).default(5), // %
  exitMultiple: z.number().min(0).max(20).default(4.0),
  holdPeriodYears: z.number().min(1).max(30).default(5),
});

const calculateSchema = z.object({
  purchasePrice: z.number().positive(),
  closingCosts: z.number().default(0),
  equityPercent: z.number().min(0).max(100),
  sellerNotePercent: z.number().min(0).max(100).default(0),
  sba7aPercent: z.number().min(0).max(100).default(0),
  conventionalLoanPercent: z.number().min(0).max(100).default(0),
  sbaInterestRate: z.number().min(0).max(20).default(7.5),
  sbaTermYears: z.number().min(1).max(25).default(10),
  conventionalInterestRate: z.number().min(0).max(20).default(6.5),
  conventionalTermYears: z.number().min(1).max(30).default(15),
  sellerNoteInterestRate: z.number().min(0).max(20).default(5.0),
  sellerNoteTermYears: z.number().min(1).max(10).default(5),
  annualRevenue: z.number().positive(),
  annualCashFlow: z.number().positive(),
  revenueGrowthRate: z.number().min(-50).max(100).default(5),
  exitMultiple: z.number().min(0).max(20).default(4.0),
  holdPeriodYears: z.number().min(1).max(30).default(5),
});

/**
 * Calculate monthly payment for a loan
 */
function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termYears: number
): number {
  if (principal === 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;
  
  if (monthlyRate === 0) return principal / numPayments;
  
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

/**
 * Calculate IRR using Newton's method
 */
function calculateIRR(cashFlows: number[], guess: number = 0.1): number {
  const maxIterations = 100;
  const tolerance = 0.0001;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;
    
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + guess, t);
      dnpv -= (t * cashFlows[t]) / Math.pow(1 + guess, t + 1);
    }
    
    const newGuess = guess - npv / dnpv;
    
    if (Math.abs(newGuess - guess) < tolerance) {
      return newGuess * 100; // Return as percentage
    }
    
    guess = newGuess;
  }
  
  return guess * 100; // Return as percentage
}

export const capitalStackRouter = router({
  /**
   * Calculate financing metrics in real-time
   */
  calculate: protectedProcedure
    .input(calculateSchema)
    .mutation(async ({ input, ctx }) => {
      // Validate percentages sum to 100
      const totalPercent =
        input.equityPercent +
        input.sellerNotePercent +
        input.sba7aPercent +
        input.conventionalLoanPercent;
      
      if (Math.abs(totalPercent - 100) > 0.01) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Financing percentages must sum to 100% (current: ${totalPercent.toFixed(2)}%)`,
        });
      }

      const totalInvestment = input.purchasePrice + input.closingCosts;

      // Calculate capital amounts
      const equityAmount = (totalInvestment * input.equityPercent) / 100;
      const sellerNoteAmount = (totalInvestment * input.sellerNotePercent) / 100;
      const sba7aAmount = (totalInvestment * input.sba7aPercent) / 100;
      const conventionalAmount = (totalInvestment * input.conventionalLoanPercent) / 100;

      // Calculate monthly debt service
      const sbaPayment = calculateMonthlyPayment(
        sba7aAmount,
        input.sbaInterestRate,
        input.sbaTermYears
      );
      const conventionalPayment = calculateMonthlyPayment(
        conventionalAmount,
        input.conventionalInterestRate,
        input.conventionalTermYears
      );
      const sellerNotePayment = calculateMonthlyPayment(
        sellerNoteAmount,
        input.sellerNoteInterestRate,
        input.sellerNoteTermYears
      );

      const totalMonthlyDebtService = sbaPayment + conventionalPayment + sellerNotePayment;
      const annualDebtService = totalMonthlyDebtService * 12;

      // Calculate cash flow metrics
      const annualCashFlowAfterDebt = input.annualCashFlow - annualDebtService;
      const cashOnCashReturn = equityAmount > 0 ? (annualCashFlowAfterDebt / equityAmount) * 100 : 0;
      const dscr = annualDebtService > 0 ? input.annualCashFlow / annualDebtService : 0;

      // Project cash flows for IRR calculation
      const cashFlows = [-equityAmount]; // Initial investment (negative)
      
      for (let year = 1; year <= input.holdPeriodYears; year++) {
        const projectedRevenue = input.annualRevenue * Math.pow(1 + input.revenueGrowthRate / 100, year);
        const projectedCashFlow = input.annualCashFlow * Math.pow(1 + input.revenueGrowthRate / 100, year);
        const yearCashFlow = projectedCashFlow - annualDebtService;
        
        // Add exit value in final year
        if (year === input.holdPeriodYears) {
          const exitValue = projectedRevenue * input.exitMultiple;
          const remainingDebt = 0; // Simplified - assume debt paid down
          const exitProceeds = exitValue - remainingDebt;
          cashFlows.push(yearCashFlow + exitProceeds);
        } else {
          cashFlows.push(yearCashFlow);
        }
      }

      const irr = calculateIRR(cashFlows);
      
      // Calculate equity multiple
      const totalCashReturned = cashFlows.slice(1).reduce((sum, cf) => sum + cf, 0);
      const equityMultiple = equityAmount > 0 ? totalCashReturned / equityAmount : 0;

      // Calculate break-even metrics
      const monthsToBreakEven = annualCashFlowAfterDebt > 0
        ? (equityAmount / annualCashFlowAfterDebt) * 12
        : 0;

      return {
        success: true,
        capitalStack: {
          totalInvestment,
          equity: equityAmount,
          sellerNote: sellerNoteAmount,
          sba7a: sba7aAmount,
          conventional: conventionalAmount,
        },
        debtService: {
          sbaMonthly: sbaPayment,
          conventionalMonthly: conventionalPayment,
          sellerNoteMonthly: sellerNotePayment,
          totalMonthly: totalMonthlyDebtService,
          totalAnnual: annualDebtService,
        },
        returns: {
          cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
          irr: Math.round(irr * 100) / 100,
          equityMultiple: Math.round(equityMultiple * 100) / 100,
          dscr: Math.round(dscr * 100) / 100,
        },
        cashFlow: {
          annualCashFlow: input.annualCashFlow,
          annualDebtService,
          annualCashFlowAfterDebt,
          monthsToBreakEven: Math.round(monthsToBreakEven),
        },
        projections: cashFlows.map((cf, idx) => ({
          year: idx,
          cashFlow: Math.round(cf),
        })),
      };
    }),

  /**
   * Get saved capital stack scenarios for a deal
   */
  listByDeal: protectedProcedure
    .input(z.object({ dealId: z.number() }))
    .query(async ({ input, ctx }) => {
      // TODO: Implement database storage in V2
      return {
        scenarios: [],
        message: "Saved scenarios will be implemented in V2. Use calculate endpoint for real-time calculations.",
      };
    }),

  /**
   * Save a capital stack scenario
   */
  save: protectedProcedure
    .input(capitalStackSchema)
    .mutation(async ({ input, ctx }) => {
      // TODO: Implement database storage in V2
      return {
        success: true,
        message: "Scenario saved (placeholder). Database storage will be implemented in V2.",
      };
    }),
});
