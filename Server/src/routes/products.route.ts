import { protect } from "@/middleware/authMiddleware";
import { validateRequest } from "@/middleware/validateRequest";
import productsController from "@controllers/products.controller";
import { CategorySchema, ProductSchema } from "@validator/ProductCreate.schema";
import express, { Router } from "express";

const productsRouter: Router = express.Router();


// ================== Product Done ==================
productsRouter.post(
    "/create",
    validateRequest(ProductSchema),
    protect,
    productsController.createProduct
);
productsRouter.get("/", productsController.getProducts);
productsRouter.put("/:productId", productsController.updateProduct);
productsRouter.delete("/:productId", productsController.deleteProduct);

// ================== Product Variants ==================
// Add variant
productsRouter.post(
    "/variant/add",
    protect,
    productsController.createVariant
);

// Get all variants of a product
productsRouter.get(
    "/:productId/variants",
    productsController.getVariantsByProduct
);

// Get single variant
productsRouter.get(
    "/variant/:variantId",
    productsController.getVarintById
);

// Update variant
productsRouter.put(
    "/variant/:variantId",
    protect,
    productsController.updateVariant
);

// Delete variant
productsRouter.delete(
    "/variant/:variantId",
    protect,
    productsController.deleteVariant
);


// ================== Category ==================
productsRouter.post(
    "/category/create",
    validateRequest(CategorySchema),
    protect,
    productsController.createCategory
);
productsRouter.get("/category", productsController.getCategorys);
productsRouter.put("/category/:categoryId", productsController.updateCategory);
productsRouter.delete("/category/:categoryId", productsController.deleteCategory);


export default productsRouter;
