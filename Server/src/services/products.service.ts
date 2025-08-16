// src/services/productsService.ts
import { productsRepository } from "@/repository/products.repository";
import { ApiError } from "@utils/ApiError";


// types/product.types.ts
export interface CreateProductType {
  name: string;
  slug: string;
  description: string;
  base_price: number;
  category_id: number;
  size_chart?: string;
  payment_options?: string[];
  estimated_delivery_days?: number;
  active: boolean;
  stock: number;
  sku: string;
}
const productsService = {
createProduct: async (data: CreateProductType) => {
    // Check if slug already exists
    const existingProduct = await productsRepository.findProductBySlug(data.slug);
    if (existingProduct) {
      throw new ApiError(400, "Product slug already exists");
    }

    // Create new product
    const product = await productsRepository.createProduct(data);

    // Optional: sanitize fields if needed
    return product;
  },
  getProducts: async () => {
    const product = await productsRepository.findProducts();
    return product;
  },
  createCategory: async (data: {
    name: string;
    slug: string;
    parent_category_id?: number;
  }) => {
    // Create new category
    const category = await productsRepository.createCategory(data);
    return category;
  },
  getCategory: async () => {
    const category = await productsRepository.getCategory();
    return category;
  }
};

export default productsService;
