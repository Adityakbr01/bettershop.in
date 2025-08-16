"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductItemRes, useDeleteProduct, useUpdateProduct } from "@/queries/products/mutation";
import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import AddProductVeriant from "./AddProductVeriantDialog";
import { getStockBadge } from "@/components/getStockBadge";
import EditProductDialog from "./EditProductDialog";

type ProductItemTableProps = {
  filteredProducts: ProductItemRes[];
};



export default function ProductItemTable({
  filteredProducts,
}: ProductItemTableProps) {
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const [selectedProduct, setSelectedProduct] = useState<ProductItemRes | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductItemRes | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = (product: ProductItemRes) => {
    setEditProduct(product);
    setEditOpen(true);
  };


  const handleAddVariant = (product: ProductItemRes) => {
    setSelectedProduct(product);
    setOpen(true);
  };


  const handleDeleteProduct =(productId:number)=>{
    deleteProduct(productId)
  }

  return (
    <>
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
                  key={p.id}
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.sku}</TableCell>
                  <TableCell>{p.category?.name}</TableCell>
                  <TableCell>
                    {p.active ? (
                      <Badge className="bg-green-500">Active</Badge>
                    ) : (
                      <Badge className="bg-gray-400">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>₹{p.base_price.toFixed(2)}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(p)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateProduct({ productId: p.id, active: !p.active })}>{p.active ? "Deactivate" : "Activate"}</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAddVariant(p)}
                        >
                          Add Variant
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={()=>handleDeleteProduct(p.id)}>
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

      {/* Variant Dialog */}
      <AddProductVeriant open={open} setOpen={setOpen} selectedProduct={selectedProduct} />

      {/* Edit Dialog */}
      <EditProductDialog
        open={editOpen}
        setOpen={setEditOpen}
        product={editProduct!}
      />

    </>
  );
}
