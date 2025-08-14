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
import { products } from "@/constants/mockData/products";
import { motion } from "framer-motion";
import React from "react";

export default function Page() {
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);

  const filteredProducts = products?.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter
      ? p.category === categoryFilter
      : true;
    const matchesActive = activeFilter
      ? activeFilter === "true"
        ? p.active
        : !p.active
      : true;
    return matchesSearch && matchesCategory && matchesActive;
  });

  return (
    <motion.div layout className="w-full min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-extrabold my-6">Products Overview</h1>
        <ProductHeader />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Title or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Select
              onValueChange={(v) => setCategoryFilter(v === "all" ? "" : v)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>

            <Select
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

        <ProductItemTable filteredProducts={filteredProducts} />

        {/* Add Product Dialog */}
        <ProductDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      </div>
    </motion.div>
  );
}
