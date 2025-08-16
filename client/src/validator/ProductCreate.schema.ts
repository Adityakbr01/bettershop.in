import { z } from "zod";


// ✅ Your schema
export const PaymentOption = z.enum(["cod", "razorpay", "stripe"]);

export const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),

    slug: z
        .string()
        .min(1, "Slug is required")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use kebab-case: letters, numbers, dashes"),

    description: z.string().min(1, "Description is required"),

    base_price: z.number().nonnegative("Price must be ≥ 0"),

    category_id: z.number(),

    size_chart: z.union([
        z.string().url("Must be a valid URL"),
        z
            .array(
                z.object({
                    label: z.string().min(1, "Size label is required"),
                    measurements: z.record(
                        z.string().min(1),
                        z.number().positive("Measurement must be > 0")
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

    estimated_delivery_days: z
        .number()
        .int()
        .positive("Estimated days must be a positive integer"),

    // ✅ New Fields
    sku: z.string().min(1, "SKU is required"),
    stock: z.number().int().nonnegative("Stock must be ≥ 0").optional(),
    active: z.boolean().optional(),
});


export type ProductFormValues = z.infer<typeof ProductSchema>;
