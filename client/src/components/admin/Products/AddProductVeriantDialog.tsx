// components/admin/AddProductVariant.tsx
"use client";

import CreateProductVeriantForm from "@/components/form/admin/products/CreateProductVeriant";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductItemRes, useAddVariant } from "@/queries/products/mutation";
import React, { useState } from "react";

type AddProductVariantProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedProduct: { id: number; name: string } | null;
};

export default function AddProductVariant({ open, setOpen, selectedProduct }: AddProductVariantProps) {
    const { mutateAsync: addVariant, isPending } = useAddVariant();
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        price: "",
        stock_level: "",
        size: "M",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;

        await addVariant({
            productId: selectedProduct.id,
            stock_level: Number(formData.stock_level),
            price: Number(formData.price),
            attributes: { name: formData.name, sku: formData.sku, size: formData.size },
        });
        setOpen(false);
        setFormData({
        name: "",
        sku: "",
        price: "",
        stock_level: "",
        size: "M",
    })
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Variant {selectedProduct ? `for ${selectedProduct.name}` : ""}</DialogTitle>
                </DialogHeader>
                <CreateProductVeriantForm handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} setFormData={setFormData} setOpen={setOpen} isPending={isPending} />
            </DialogContent>
        </Dialog>
    );
}
