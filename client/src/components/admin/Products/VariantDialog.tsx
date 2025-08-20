"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SIZE_OPTIONS } from "@/constants";
import {
    useDeleteVariant,
    useGetVarients,
    useUpdateVariant
} from "@/queries/products/mutation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

interface VariantDialogProps {
    showDialog: boolean;
    setShowDialog: (val: boolean) => void;
    productId: number;
}

interface Variant {
    id: number;
    product_id: number;
    stock_level: number;
    price: number;
    sku: string;
    attributes: { name: string; sku: string; size: string };
}

export default function VariantDialog({
    showDialog,
    setShowDialog,
    productId,
}: VariantDialogProps) {
    const { data: variants, refetch } = useGetVarients(productId);
    const { mutateAsync: updateVariant } = useUpdateVariant();
    const { mutateAsync: deleteVariant } = useDeleteVariant();

    const [editingVariantId, setEditingVariantId] = useState<number | null>(null);
    const [editingVariant, setEditingVariant] = useState({
        stock_level: 0,
        price: 0,
        sku: "",
        attributes: { name: "", sku: "", size: "M" },
    });
    const [newVariant, setNewVariant] = useState({
        stock_level: 0,
        price: 0,
        sku: "",
        attributes: { name: "", sku: "", size: "M" },
    });

    const [loading, setLoading] = useState(false);

    const handleEdit = (variant: Variant) => {
        setEditingVariantId(variant.id);
        setEditingVariant({
            stock_level: variant.stock_level,
            price: variant.price,
            sku: variant.sku,
            attributes: variant.attributes,
        });
    };

    const handleSave = async () => {
        if (editingVariantId !== null) {
            // Validation
            const { stock_level, price, attributes } = editingVariant;
            if (
                stock_level <= 0 ||
                price <= 0 ||
                !attributes.name.trim() ||
                !attributes.sku.trim() ||
                !attributes.size.trim()
            ) {
                toast.error("Please fill all fields correctly before saving.");
                return;
            }

            setLoading(true);
            try {
                await updateVariant({ variantId: editingVariantId, data: editingVariant });
                toast.success("Variant updated successfully!");
                setEditingVariantId(null);
                setEditingVariant({ stock_level: 0, price: 0, sku: "", attributes: { name: "", sku: "", size: "M" } });
                refetch()
            } catch (err) {
                console.error(err);
                toast.error("Failed to update variant!");
            } finally {
                setLoading(false);
            }
        }
    };


    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            await deleteVariant(id);
            toast.success("Variant deleted successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete variant!");
        } finally {
            setLoading(false);
        }
    };

    const renderVariant = (variant: Variant) => (
        <motion.div
            key={variant.id}
            layout
            className="flex flex-col border rounded-xl bg-white dark:bg-neutral-900 shadow-sm p-4"
        >
            {editingVariantId === variant.id ? (
                <form className="flex flex-col gap-3">
                    {/* Inputs */}
                    <div>
                        <label className="block mb-1 font-medium">Stock Level</label>
                        <Input
                            type="number"
                            value={editingVariant.stock_level}
                            onChange={(e) => setEditingVariant(prev => ({ ...prev, stock_level: Number(e.target.value) }))}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Price</label>
                        <Input
                            type="number"
                            value={editingVariant.price}
                            onChange={(e) => setEditingVariant(prev => ({ ...prev, price: Number(e.target.value) }))}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">SKU</label>
                        <Input
                            value={editingVariant.sku}
                            onChange={(e) => setEditingVariant(prev => ({ ...prev, sku: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Variant Name</label>
                        <Input
                            value={editingVariant.attributes.name}
                            onChange={(e) => setEditingVariant(prev => ({ ...prev, attributes: { ...prev.attributes, name: e.target.value } }))}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Attribute SKU</label>
                        <Input
                            value={editingVariant.attributes.sku}
                            onChange={(e) => setEditingVariant(prev => ({ ...prev, attributes: { ...prev.attributes, sku: e.target.value } }))}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Size</label>
                        <Select
                            value={editingVariant.attributes.size}
                            onValueChange={(value) => setEditingVariant(prev => ({ ...prev, attributes: { ...prev.attributes, size: value } }))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                {SIZE_OPTIONS.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2 mt-2">
                        <Button
                            type="button"
                            onClick={handleSave}
                            className="flex-1 bg-green-500 hover:bg-green-600"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setEditingVariantId(null)}
                            className="flex-1"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="flex justify-between items-center gap-2">
                    <div>
                        <p><strong>Name:</strong> {variant.attributes.name}</p>
                        <p><strong>SKU:</strong> {variant.sku}</p>
                        <p><strong>Price:</strong> {variant.price}</p>
                        <p><strong>Stock:</strong> {variant.stock_level}</p>
                        <p><strong>Size:</strong> {variant.attributes.size}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => handleEdit(variant)} disabled={loading}>Edit</Button>
                        <Button variant="destructive" onClick={() => handleDelete(variant.id)} disabled={loading}>Delete</Button>
                    </div>
                </div>
            )}
        </motion.div>
    );

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="max-w-2xl w-full overflow-y-auto h-[85%] scrollbar-hide">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-4">Variants</DialogTitle>
                </DialogHeader>

                <AnimatePresence>
                    <motion.div layoutId="variant-dialog" className="flex flex-col gap-4">
                        {/* List variants */}
                        <div className="flex flex-col gap-3">
                            {variants?.data?.map((v: Variant) => renderVariant(v))}
                        </div>

                        <DialogClose asChild>
                            <Button className="mt-4 w-full" disabled={loading}>Close</Button>
                        </DialogClose>
                    </motion.div>
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
