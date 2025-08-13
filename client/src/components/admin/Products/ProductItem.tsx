"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Product = {
  title: string;
  sku: string;
  category: string;
  active: boolean;
  price: number;
  stock: number;
};

type ProductItemTableProps = {
  filteredProducts: Product[];
};

function getStockBadge(stock: number) {
  if (stock === 0) {
    return <Badge className="bg-red-500">Out of Stock</Badge>;
  } else if (stock <= 5) {
    return <Badge className="bg-yellow-500">Low Stock</Badge>;
  } else {
    return <Badge className="bg-green-500">In Stock</Badge>;
  }
}

export default function ProductItemTable({
  filteredProducts,
}: ProductItemTableProps) {
  return (
    <Table className="rounded-2xl overflow-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {filteredProducts.length ? (
            filteredProducts.map((p, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.sku}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>
                  {p.active ? (
                    <Badge className="bg-green-500">Active</Badge>
                  ) : (
                    <Badge className="bg-gray-400">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell>₹{p.price.toFixed(2)}</TableCell>
                <TableCell>{getStockBadge(p.stock)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-full cursor-pointer hover:bg-white/10">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                No products found
              </TableCell>
            </TableRow>
          )}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
}
