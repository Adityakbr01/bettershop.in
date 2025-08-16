import productsService from "@services/products.service";
import { sendSuccess } from "@utils/responseUtil";
import { wrapAsync } from "@utils/wrapAsync";
import { Request, Response } from "express";

const productsController = {
    createProduct: wrapAsync(async (req: Request, res: Response) => {
        const {
            name,
            slug,
            description,
            base_price,
            category_id,
            size_chart,
            payment_options,
            estimated_delivery_days,
            active,
            stock,
            sku
        } = req.body;

        const product = await productsService.createProduct({
            name,
            slug,
            description,
            base_price,
            category_id,
            size_chart,
            payment_options,
            estimated_delivery_days,
            active,
            stock,
            sku
        });

        sendSuccess(res, 201, "Product created successfully", product);
    }),
    getProducts: wrapAsync(async (_req: Request, res: Response) => {
        const product = await productsService.getProducts();
        sendSuccess(res, 200, "Product fetched successfully", product);
    }),
    createCategory: wrapAsync(async (req: Request, res: Response) => {
        const { name, slug, parent_category_id } = req.body;
        const category = await productsService.createCategory({ name, slug, parent_category_id });
        sendSuccess(res, 201, "Category created successfully", category);
    }),
    getCategorys: wrapAsync(async (_req: Request, res: Response) => {
        const category = await productsService.getCategory();
        sendSuccess(res, 200, "Category fetched successfully", category);
    }),
};

export default productsController;
