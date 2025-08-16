import { protect } from "@/middleware/authMiddleware";
import { validateRequest } from "@/middleware/validateRequest";
import productsController from "@controllers/products.controller";
import { CategorySchema, ProductSchema } from "@validator/ProductCreate.schema";
import express, { Router } from "express";

const productsRouter: Router = express.Router();

//Product
productsRouter.post(
    "/create",
    validateRequest(ProductSchema),
    protect,
    productsController.createProduct
);
productsRouter.get("/",productsController.getProducts)


//Category
productsRouter.post("/category/create", validateRequest(CategorySchema), productsController.createCategory);
productsRouter.get("/category", productsController.getCategorys);




export default productsRouter;
