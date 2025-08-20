import { prisma } from "@/db";
import productsService from "@services/products.service";
import { ApiError } from "@utils/ApiError";
import { sendSuccess } from "@utils/responseUtil";
import { wrapAsync } from "@utils/wrapAsync";
import { Request, Response } from "express";

const productsController = {
    // ---------------- Product ----------------
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
            sku
        });

        sendSuccess(res, 201, "Product created successfully", product);
    }),

    getProducts: wrapAsync(async (_req: Request, res: Response) => {
        const product = await productsService.getProducts();
        sendSuccess(res, 200, "Products fetched successfully", product);
    }),

    getProductById: wrapAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await productsService.getProductById(id)
        sendSuccess(res, 200, "Product fetched successfully", product);
    }),

    updateProduct: wrapAsync(async (req: Request, res: Response) => {
        const { productId } = req.params;
        const data = req.body;
        const product = await prisma.product.update({
            where: { id: Number(productId) },
            data
        });
        sendSuccess(res, 200, "Product updated successfully", product);
    }),

    deleteProduct: wrapAsync(async (req: Request, res: Response) => {
        const { productId } = req.params;

        const id = Number(productId);
        if (isNaN(id)) {
            throw new ApiError(400, "Invalid Product ID")
        }

        // Pehle variants delete karo
        await prisma.productVariant.deleteMany({ where: { product_id: id } });

        // Phir product delete karo
        await prisma.product.delete({ where: { id } });
        sendSuccess(res, 200, "Product and its variants deleted successfully");
    }),

    // ---------------- Variants ----------------
    createVariant: wrapAsync(async (req, res) => {
        const { productId, stock_level, price, attributes } = req.body;

        const variant = await prisma.productVariant.create({
            data: {
                product_id: productId,
                stock_level,
                price,
                attributes,
                sku: `${productId}-${Date.now()}`,
            },
        });

        // parent product ka stock recalc
        const totalStock = await prisma.productVariant.aggregate({
            where: { product_id: productId },
            _sum: { stock_level: true },
        });

        await prisma.product.update({
            where: { id: productId },
            data: { stock: totalStock._sum.stock_level ?? 0, active: true },
        });

        sendSuccess(res, 201, "Variant created successfully", variant);
    }),

    getVarintById: wrapAsync(async (req, res) => {
        const { variantId } = req.params;
        const variant = await prisma.productVariant.findUnique({
            where: { id: Number(variantId) },
        });
        sendSuccess(res, 200, "Variant fetched successfully", variant);
    }),

    getVariantsByProduct: wrapAsync(async (req, res) => {
        const { productId } = req.params;
        const variants = await prisma.productVariant.findMany({
            where: { product_id: Number(productId) },
        });
        sendSuccess(res, 200, "Variants fetched successfully", variants);
    }),

    updateVariant: wrapAsync(async (req, res) => {
        const { variantId } = req.params;
        const data = req.body;
        const variant = await prisma.productVariant.update({
            where: { id: Number(variantId) },
            data,
        });

        // parent product ka stock recalc
        const totalStock = await prisma.productVariant.aggregate({
            where: { product_id: variant.product_id },
            _sum: { stock_level: true },
        });

        await prisma.product.update({
            where: { id: variant.product_id },
            data: { stock: totalStock._sum.stock_level ?? 0 },
        });

        sendSuccess(res, 200, "Variant updated successfully", variant);
    }),

    deleteVariant: wrapAsync(async (req, res) => {
        const { variantId } = req.params;

        // variant delete karke parent product ka stock update karna
        const variant = await prisma.productVariant.delete({
            where: { id: Number(variantId) },
        });

        const totalStock = await prisma.productVariant.aggregate({
            where: { product_id: variant.product_id },
            _sum: { stock_level: true },
        });

        await prisma.product.update({
            where: { id: variant.product_id },
            data: { stock: totalStock._sum.stock_level ?? 0 },
        });

        sendSuccess(res, 200, "Variant deleted successfully");
    }),

    // ---------------- Category ----------------
    createCategory: wrapAsync(async (req: Request, res: Response) => {
        const { name, slug, parent_category_id } = req.body;
        const category = await productsService.createCategory({ name, slug, parent_category_id });
        sendSuccess(res, 201, "Category created successfully", category);
    }),

    getCategorys: wrapAsync(async (_req: Request, res: Response) => {
        const category = await productsService.getCategory();
        sendSuccess(res, 200, "Category fetched successfully", category);
    }),
    updateCategory: wrapAsync(async (req: Request, res: Response) => {
        const { categoryId } = req.params;
        const data = req.body;
        const category = await prisma.category.update({
            where: { id: Number(categoryId) },
            data
        });
        sendSuccess(res, 200, "Category updated successfully", category);
    }),

    deleteCategory: wrapAsync(async (req: Request, res: Response) => {
        const { categoryId } = req.params;
        const id = Number(categoryId);
        if (isNaN(id)) {
            throw new ApiError(400, "Invalid Category ID");
        }

        await prisma.product.updateMany({
            where: { category_id: id },
            data: { category_id: null }
        });
        await prisma.category.delete({ where: { id } });


        sendSuccess(res, 200, "Category deleted successfully");
    })

};

export default productsController;
