import { z } from "zod";

export const PaymentOption = z.enum(["cod", "razorpay", "stripe"]);

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use kebab-case: letters, numbers, dashes"),
  description: z.string().min(1, "Description is required"),

  // Accept "123.45" from form inputs and coerce to number
  base_price: z.preprocess(
    (v) => (typeof v === "string" ? Number(v) : v),
    z.number().nonnegative("Price must be ≥ 0").finite()
  ),

  // If you use CUID instead of UUID, swap to z.string().cuid2()
  category_id: z.number(),

  // Either a URL to a size chart OR a structured table of sizes + measurements
  size_chart: z.union([
    z.string().url("Must be a valid URL"),
    z
      .array(
        z.object({
          label: z.string().min(1, "Size label is required"), // e.g., "S", "M", "L"
          measurements: z.record(
            z
              .string()
              .min(1), // e.g., "chest", "waist"
            z.preprocess(
              (v) => (typeof v === "string" ? Number(v) : v),
              z.number().positive("Measurement must be > 0")
            )
          ),
        })
      )
      .nonempty("At least one size entry is required"),
  ]),

  payment_options: z
    .array(PaymentOption)
    .min(1, "Select at least one payment option")
    .refine((arr) => new Set(arr).size === arr.length, {
      message: "Duplicate payment options are not allowed",
    }),

  // Accept "3" from inputs, coerce to integer
  estimated_delivery_days: z.preprocess(
    (v) => (typeof v === "string" ? Number(v) : v),
    z.number().int().positive("Estimated days must be a positive integer")
  ),
  sku: z.string(),
});


export const CategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use kebab-case: letters, numbers, dashes"),
  parent_category_id: z.number().nullable().optional(), // ✅ allows null or undefined
});

