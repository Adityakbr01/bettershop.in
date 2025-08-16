"use client"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { payment_options } from '@/constants';
import { useGetCategory } from '@/queries/products/mutation';
import { ProductFormValues } from '@/validator/ProductCreate.schema';
import React from 'react'
import { FieldErrors, SubmitHandler, UseFormReturn } from 'react-hook-form';

type EditProductFormProps = {
    handleSubmit: UseFormReturn<ProductFormValues>["handleSubmit"];
    onSubmit: SubmitHandler<ProductFormValues>;
    errors: FieldErrors<ProductFormValues>;
    register: UseFormReturn<ProductFormValues>["register"];
    watch: UseFormReturn<ProductFormValues>["watch"];
    setValue: UseFormReturn<ProductFormValues>["setValue"];
    isSubmitting: boolean;
    setOpen: (val: boolean) => void;
};


function EditProductForm({
    handleSubmit,
    onSubmit,
    errors,
    register,
    watch,
    setValue,
    isSubmitting,
    setOpen,
}: EditProductFormProps) {

    const { data: categoryData } = useGetCategory();
    const categories = categoryData?.data ?? []
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
                <Label>Name</Label>
                <Input placeholder="Product Name" {...register("name")} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-1">
                <Label>Slug</Label>
                <Input placeholder="unique-product-slug" {...register("slug")} />
                {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
            </div>

            {/* SKU */}
            <div className="flex flex-col gap-1">
                <Label>SKU</Label>
                <Input placeholder="Unique product code" {...register("sku")} />
                {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
                <Label>Description</Label>
                <Input placeholder="Short description" {...register("description")} />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Base Price */}
            <div className="flex flex-col gap-1">
                <Label>Base Price</Label>
                <Input type="number" {...register("base_price", { valueAsNumber: true })} />
                {errors.base_price && <p className="text-red-500 text-sm">{errors.base_price.message}</p>}
            </div>
            {/* Stock */}
            <div className="flex flex-col gap-1">
                <Label>Stock</Label>
                <Input type="number" {...register("stock", { valueAsNumber: true })} />
                {errors.base_price && <p className="text-red-500 text-sm">{errors.base_price.message}</p>}
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    checked={watch("active")}
                    onCheckedChange={(checked: boolean) => setValue("active", checked)}
                />
                <Label className="capitalize">Active</Label>
            </div>
            {/* Category */}
            <div className="flex flex-col gap-1">
                <Label>Category</Label>
                <Select
                    value={watch("category_id").toString()}
                    onValueChange={(v) => setValue("category_id", parseInt(v))}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                                {c.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Size Chart */}
            <div className="flex flex-col gap-1">
                <Label>Size Chart URL</Label>
                <Input placeholder="https://example.com/size-chart" {...register("size_chart")} />
                {errors.size_chart && <p className="text-red-500 text-sm">{errors.size_chart.message}</p>}
            </div>

            {/* Payment Options */}
            <div>
                <Label className="mb-2 block">Payment Options</Label>
                <div className="flex gap-4">
                    {payment_options.map((option) => (
                        <div key={option} className="flex items-center gap-2">
                            <Checkbox
                                checked={watch("payment_options").includes(option as any)}
                                onCheckedChange={(checked) => {
                                    const current = watch("payment_options");
                                    if (checked) {
                                        setValue("payment_options", [...current, option] as any);
                                    } else {
                                        setValue(
                                            "payment_options",
                                            current.filter((p: any) => p !== option) as any
                                        );
                                    }
                                }}
                                id={option}
                            />
                            <Label htmlFor={option} className="capitalize">
                                {option}
                            </Label>
                        </div>
                    ))}
                </div>
                {errors.payment_options && (
                    <p className="text-red-500 text-sm">{errors.payment_options.message}</p>
                )}
            </div>



            {/* Estimated Delivery Days */}
            <div className="flex flex-col gap-1">
                <Label>Estimated Delivery Days</Label>
                <Input type="number" {...register("estimated_delivery_days", { valueAsNumber: true })} />
                {errors.estimated_delivery_days && <p className="text-red-500 text-sm">{errors.estimated_delivery_days.message}</p>}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Product"}
                </Button>
            </div>
        </form>
    )
}

export default EditProductForm