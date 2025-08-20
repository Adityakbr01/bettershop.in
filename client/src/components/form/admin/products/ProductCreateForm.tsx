"use client";

import React from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import IsCreatingLoader from "@/components/isCreatingLoader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductFormValues } from "@/validator/ProductCreate.schema";
import { payment_options } from "@/constants";

interface ProductCreateFormProps {
  handleSubmit: (cb: (data: ProductFormValues) => void) => (e?: React.BaseSyntheticEvent) => void;
  onSubmit: (data: ProductFormValues) => void;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  isProductCreating: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  CategorysData?: { data: { id: number; name: string; parent_category_id: number | null }[] };
}

// Helper types
interface CategoryType {
  id: number;
  name: string;
  parent_category_id: number | null;
  subcategories?: CategoryType[];
}

// Build hierarchy
const buildHierarchy = (categories: CategoryType[]) => {
  const map = new Map<number, CategoryType & { subcategories: CategoryType[] }>();
  const roots: (CategoryType & { subcategories: CategoryType[] })[] = [];

  categories.forEach((c) => map.set(c.id, { ...c, subcategories: [] }));

  map.forEach((c) => {
    if (c.parent_category_id && map.has(c.parent_category_id)) {
      map.get(c.parent_category_id)?.subcategories!.push(c);
    } else {
      roots.push(c);
    }
  });

  return roots;
};

// Recursive SelectItem for hierarchy
const CategoryOption = ({ category, level }: { category: CategoryType; level: number }) => {
  const hasChildren = category.subcategories && category.subcategories.length > 0;

  return (
    <>
      <SelectItem value={String(category.id)} disabled={hasChildren}>
        {`${"— ".repeat(level)}${category.name}${hasChildren ? " (Parent)" : ""}`}
      </SelectItem>
      {category.subcategories?.map((sub) => (
        <CategoryOption key={sub.id} category={sub} level={level + 1} />
      ))}
    </>
  );
};


function ProductCreateForm({
  handleSubmit,
  onSubmit,
  register,
  errors,
  watch,
  setValue,
  isProductCreating,
  setShowDialog,
  CategorysData,
}: ProductCreateFormProps) {
  const hierarchicalCategories = CategorysData?.data ? buildHierarchy(CategorysData.data) : [];

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

      {/* Category */}
      <div className="flex flex-col gap-1">
        <Label>Category</Label>
        <Select onValueChange={(value) => setValue("category_id", Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {hierarchicalCategories.map((cat) => (
              <CategoryOption key={cat.id} category={cat} level={0} />
            ))}
          </SelectContent>
        </Select>
        {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
      </div>

      {/* Size Chart */}
      <div className="flex flex-col gap-1">
        <Label>Size Chart URL</Label>
        <Input placeholder="https://example.com/size-chart" {...register("size_chart")} />
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
                      current.filter((p) => p !== option) as any
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
      </div>

      {/* Estimated Delivery Days */}
      <div className="flex flex-col gap-1">
        <Label>Estimated Delivery Days</Label>
        <Input type="number" {...register("estimated_delivery_days", { valueAsNumber: true })} />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <Button
          disabled={isProductCreating}
          variant="outline"
          type="button"
          onClick={() => setShowDialog(false)}
        >
          Cancel
        </Button>

        <Button
          disabled={isProductCreating}
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
        >
          {isProductCreating ? <IsCreatingLoader /> : "Save Product"}
        </Button>
      </div>
    </form>
  );
}

export default ProductCreateForm;
