"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ProductCreateForm from "@/components/form/admin/ProductCreateForm";
import { useCreateProduct, useGetCategory } from "@/queries/products/mutation";
import { ProductFormValues, ProductSchema } from "@/validator/ProductCreate.schema";
import { useState } from "react";
import toast from "react-hot-toast";
import PriceConfirmDialog from "./PriceConfirmDialog";


export interface DialogProps {
    showDialog: boolean;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductDialog({ showDialog, setShowDialog }: DialogProps) {
    const { data: CategorysData, isLoading } = useGetCategory();
    const { mutate: createProduct, isPending: isProductCreating, isSuccess: isProductCreateSuccess, error } = useCreateProduct();
    const [showConfirm, setShowConfirm] = useState(false);
    const [formData, setFormData] = useState<ProductFormValues | null>(null);


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<ProductFormValues>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            base_price: 0,
            category_id: 0,
            size_chart: "",
            payment_options: [],
            estimated_delivery_days: 3,
            active: true,
            stock: 0,
            sku: "",
        },
    });

    const handleFinalSubmit = (data: ProductFormValues) => {
        createProduct(data, {
            onSuccess: (res) => {
                setShowDialog(false);
                toast.success(res.message || "Product created successfully!");
                reset();
            },
        });
    };

    const onSubmit = (data: ProductFormValues) => {
        if (data.base_price < 100) {
            setFormData(data);
            setShowConfirm(true);
        } else {
            handleFinalSubmit(data);
        }
    };



    return (
        <AnimatePresence>
            {showDialog && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}

                >
                    <motion.div
                        layoutId="add-product-dialog"
                        className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-lg overflow-y-scroll h-[89%] scrollbar-hide"
                    >
                        <h2 className="text-xl font-bold mb-4">Create New Product</h2>

                        <ProductCreateForm handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} errors={errors} watch={watch} setValue={setValue} isProductCreating={isProductCreating} setShowDialog={setShowDialog} CategorysData={CategorysData} />
                    </motion.div>
                    {/* Confirmation Dialog */}
                    <PriceConfirmDialog showConfirm={showConfirm} setShowConfirm={setShowConfirm} handleFinalSubmit={handleFinalSubmit} formData={formData} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
