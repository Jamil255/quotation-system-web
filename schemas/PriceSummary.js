import { z } from "zod";

export const PriceSummarySchema = z.object({
  subtotal: z
    .string()
    .min(1, "Subtotal is required")
    .regex(/^[0-9]+(\.[0-9]+)?$/, "Subtotal must be a valid number"),

  totalDiscountApplied: z
    .string()
    .min(1, "Total Discount is required")
    .regex(/^[0-9]+(\.[0-9]+)?$/, "Discount must be a valid number"),

  totalTaxApplied: z
    .string()
    .min(1, "Total Tax is required")
    .regex(/^[0-9]+(\.[0-9]+)?$/, "Tax must be a valid number"),

  grandTotal: z
    .string()
    .min(1, "Grand Total is required")
    .regex(/^[0-9]+(\.[0-9]+)?$/, "Grand Total must be a valid number"),
});