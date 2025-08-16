import { prisma } from "@/db";
import { CreateProductType } from "@services/products.service";

export const productsRepository = {
    findProductBySlug: async (slug: string) => {
        return prisma.product.findUnique({
            where: { slug }
        });
    },

    createProduct: async (data: CreateProductType) => {
        return prisma.product.create({
            data
        });
    },
    findProducts: async () => {
        const products = await prisma.product.findMany({
            include: {
                category: true, // 👈 category relation laa raha hai
            },
        });
        return products;
    },
    createCategory: async (data: {
        name: string;
        slug: string;
        parent_category_id?: number;
    }) => {
        return prisma.category.create({
            data
        });
    }
    ,
    getCategory: async () => {
        return prisma.category.findMany();
    }
};
