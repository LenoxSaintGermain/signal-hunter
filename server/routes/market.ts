import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

/**
 * Market Data Router for business listings management
 * 
 * Handles:
 * - Manual listing entry
 * - CSV bulk imports
 * - Market data scraping (BizBuySell, etc.) - V2
 * - Listing normalization and deduplication
 * 
 * Note: This is a simplified implementation for Phase 2.
 * Full scraper integration and database storage will be implemented in V2.
 */

const createListingSchema = z.object({
  source: z.string(), // "BizBuySell", "Manual", "CSV Import", etc.
  sourceUrl: z.string().url().optional(),
  sourceId: z.string().optional(),

  // Business details
  businessName: z.string().min(1),
  description: z.string().optional(),
  industry: z.string().optional(),

  // Financials
  askingPrice: z.number().positive().optional(),
  revenue: z.number().positive().optional(),
  profit: z.number().optional(),
  cashFlow: z.number().optional(),
  ebitda: z.number().optional(),

  // Location
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().default("USA"),

  // Contact
  contactName: z.string().optional(),
  contactType: z.string().optional(), // "Broker", "Owner", etc.
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
});

const bulkImportSchema = z.object({
  source: z.string(),
  listings: z.array(createListingSchema),
});

const filterSchema = z.object({
  search: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  minRevenue: z.number().positive().optional(),
  industry: z.string().optional(),
  state: z.string().optional(),
  source: z.string().optional(),
  processed: z.boolean().optional(),
  sortBy: z.enum(["price", "revenue", "created_at"]).default("created_at"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
});

export const marketRouter = router({
  /**
   * List market data with filters
   */
  list: protectedProcedure
    .input(filterSchema)
    .query(async ({ input, ctx }) => {
      // TODO: Implement database queries in V2
      return {
        listings: [],
        total: 0,
        hasMore: false,
        message: "Market data will be stored in database in V2. Use create/bulkImport to add listings.",
      };
    }),

  /**
   * Get single listing by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      // TODO: Implement database queries in V2
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Market data storage will be implemented in V2.",
      });
    }),

  /**
   * Create a manual listing
   */
  create: protectedProcedure
    .input(createListingSchema)
    .mutation(async ({ input, ctx }) => {
      // TODO: Implement database storage in V2
      // TODO: Run normalization and deduplication

      return {
        success: true,
        listingId: Date.now(), // Temporary ID
        message: "Listing created (placeholder). Database storage will be implemented in V2.",
      };
    }),

  /**
   * Bulk import listings from CSV
   */
  bulkImport: protectedProcedure
    .input(bulkImportSchema)
    .mutation(async ({ input, ctx }) => {
      // TODO: Implement database storage in V2
      // TODO: Run normalization and deduplication
      // TODO: Match with existing deals

      const imported = input.listings.length;
      const duplicates = 0; // TODO: Implement deduplication
      const matched = 0; // TODO: Implement deal matching

      return {
        success: true,
        imported,
        duplicates,
        matched,
        message: `Processed ${imported} listings (placeholder). Database storage will be implemented in V2.`,
      };
    }),

  /**
   * Trigger market data scraper
   */
  /**
   * Trigger market data scraper (Deep Research Agent)
   */
  scan: protectedProcedure
    .input(z.object({
      source: z.enum(["bizbuysell", "all"]),
      filters: z.object({
        minPrice: z.number().positive().optional(),
        maxPrice: z.number().positive().optional(),
        industries: z.array(z.string()).optional(),
        states: z.array(z.string()).optional(),
        keywords: z.string().optional(),
      }).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Import the service dynamically to avoid issues if not fully set up
      const { deepResearchService } = await import("../services/deepResearch");

      // Construct a steerable prompt for the Deep Research Agent
      const sectors = input.filters?.industries?.join(", ") || "general small businesses";
      const states = input.filters?.states?.join(", ") || "United States";
      const keywords = input.filters?.keywords ? `Focus on: ${input.filters.keywords}` : "";
      const priceRange = `Price range: $${input.filters?.minPrice || 0} - $${input.filters?.maxPrice || "Any"}`;

      const prompt = `
        Conduct deep market research for business acquisition opportunities.
        TARGET SECTORS: ${sectors}
        LOCATION: ${states}
        FINANCIALS: ${priceRange}
        ${keywords}
        
        TASK:
        1. Scan major marketplaces (BizBuySell, BizQuest) and broker listings.
        2. Identify 10-20 specific active listings that match the criteria.
        3. For each listing, extract: Title, Asking Price, Cash Flow/SDE, Revenue, Location, and Broker.
        4. Analyze market trends for these sectors in these locations.
        
        OUTPUT FORMAT:
        Return a JSON object with a "listings" array containing the found opportunities, and a "market_summary" text field.
        Ensure "asking_price", "revenue", and "cash_flow" are numbers.
      `;

      // Start the async research task
      const { id, status } = await deepResearchService.startResearch(prompt);

      return {
        success: true,
        jobId: id,
        status,
        message: "Deep Research Agent started. This process uses advanced reasoning and may take 2-5 minutes.",
      };
    }),

  /**
   * Poll for Deep Research status
   */
  getScanStatus: protectedProcedure
    .input(z.object({
      jobId: z.string(),
    }))
    .query(async ({ input, ctx }) => {
      try {
        const { deepResearchService } = await import("../services/deepResearch");
        const status = await deepResearchService.getResearchStatus(input.jobId);

        return {
          jobId: input.jobId,
          ...status
        };
      } catch (error) {
        console.error("[market.getScanStatus] Error:", error);
        // Return a graceful error response instead of throwing
        return {
          jobId: input.jobId,
          status: "failed" as const,
          result: error instanceof Error ? error.message : "Unknown error occurred",
          thoughts: [],
          progress: 0
        };
      }
    }),

  /**
   * Convert market listing to deal
   */
  convertToDeal: protectedProcedure
    .input(z.object({
      listingId: z.number(),
      additionalNotes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      // TODO: Implement in V2
      // TODO: Copy data from marketData to deals table
      // TODO: Mark listing as processed

      return {
        success: true,
        dealId: Date.now(),
        message: "Listing conversion will be implemented in V2.",
      };
    }),

  /**
   * Get scraping statistics
   */
  getStats: protectedProcedure
    .query(async ({ ctx }) => {
      // TODO: Implement in V2
      return {
        totalListings: 0,
        processedListings: 0,
        convertedToDeals: 0,
        lastScrapedAt: null,
        sourceBreakdown: {},
        message: "Market data statistics will be implemented in V2.",
      };
    }),
});
