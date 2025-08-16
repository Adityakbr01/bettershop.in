import { Product } from "@prisma/client";

export const sanitizeProduct = <K extends keyof Product>(
  product: Product,
  allowedFields: K[]
): Pick<Product, K> => {
  const sanitizedProduct = {} as Pick<Product, K>;

  for (const field of allowedFields) {
    sanitizedProduct[field] = product[field];
  }

  return sanitizedProduct;
};
