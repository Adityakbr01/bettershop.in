"use client";

import EditProductForm from "@/components/form/admin/products/EditProductForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductItemRes, useUpdateProduct } from "@/queries/products/mutation";
import { ProductFormValues, ProductSchema } from "@/validator/ProductCreate.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type EditProductDialogProps = {
    open: boolean;
    setOpen: (val: boolean) => void;
    product: ProductItemRes;
};

export default function EditProductDialog({ open, setOpen, product }: EditProductDialogProps) {
  const {mutateAsync:updateProduct,isPending:isSubmitting} = useUpdateProduct();

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<ProductFormValues>({
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
      sku: "",
      stock: 0,
      active: false,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        slug: product.slug || "",
        sku: product.sku || "",
        description: product.description || "",
        base_price: product.base_price || 0,
        category_id: product.category_id || 0,
        size_chart: product.size_chart || "",
        payment_options: product.payment_options,
        estimated_delivery_days: product.estimated_delivery_days || 3,
        stock: product.stock,
        active: product.active,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await updateProduct({ productId: product.id, ...data });
      toast.success("Product updated successfully!");
      setOpen(false);
    } catch (err:any) {
      toast.error(err.message);
    } 
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl h-[90%] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <EditProductForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          register={register}
          watch={watch}
          setValue={setValue}
          isSubmitting={isSubmitting}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

