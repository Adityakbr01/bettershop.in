"use client";

import ProductDialog from "@/components/admin/Products/ProductDialog";
import ProductHeader from "@/components/admin/Products/ProductHeader";
import ProductItemTable from "@/components/admin/Products/ProductItem";
import { MotionButton } from "@/components/motion-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProducts } from "@/queries/products/mutation";
import { motion } from "framer-motion";
import React from "react";

export default function Page() {
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);

  // API call
  const { data } = useGetProducts();
  const products = data?.data ?? []; 


  const categories = Array.from(
    new Set(products.map((p) => p.category?.name).filter(Boolean))
  );


  const filteredProducts = products?.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter
      ? p.category?.name === categoryFilter
      : true;

    const matchesActive = activeFilter
      ? activeFilter === "true"
        ? p.active
        : !p.active
      : true;

    return matchesSearch && matchesCategory && matchesActive;
  });

    // header stats
  const total = products.length;
  const active = products.filter((p) => p.active).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length; 
  const outOfStock = products.filter((p) => p.stock === 0).length;


  return (
    <motion.div layout className="w-full min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-extrabold my-6">Products Overview</h1>
       <ProductHeader 
          total={total}
          active={active}
          lowStock={lowStock}
          outOfStock={outOfStock}
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <Input
              placeholder="Search by Name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />

            {/* Category filter */}
            <Select
              value={categoryFilter || "all"}
              onValueChange={(v) => setCategoryFilter(v === "all" ? "" : v)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c!}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Active filter */}
            <Select
              value={activeFilter || "all"}
              onValueChange={(v) => setActiveFilter(v === "all" ? "" : v)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Morphing button */}
          {!showDialog && (
            <MotionButton
              layoutId="add-product-dialog"
              onClick={() => setShowDialog(true)}
            >
              Add Product
            </MotionButton>
          )}
        </div>

        {/* Products Table */}
        <ProductItemTable filteredProducts={filteredProducts} />

        {/* Add Product Dialog */}
        <ProductDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      </div>
    </motion.div>
  );
}
