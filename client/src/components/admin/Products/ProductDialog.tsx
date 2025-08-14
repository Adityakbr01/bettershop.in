"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";


export interface DialogProps {
    showDialog: boolean;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProductDialog({ showDialog, setShowDialog }: DialogProps) {

    return (
        <>
            {/* Add Product Dialog */}
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
                            className="w-full max-w-lg rounded-xl overflow-hidden"
                        >
                            <Card className="rounded-xl overflow-hidden">
                                <CardHeader>
                                    <CardTitle>Add New Product</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Input placeholder="Product Title" />
                                    <Input placeholder="SKU" />
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Clothing">Clothing</SelectItem>
                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                            <SelectItem value="Accessories">Accessories</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input type="number" placeholder="Price" />
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            onClick={() => setShowDialog(false)}
                                            className="cursor-pointer"
                                        >
                                            Cancel
                                        </Button>
                                        <Button className="cursor-pointer">
                                            Add Product
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default ProductDialog;
