"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateCategory, useDeleteCategory, useGetCategory, useUpdateCategory } from "@/queries/products/mutation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface CategoryDialogProps {
    showDialog: boolean;
    setShowDialog: (val: boolean) => void;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    parent_category_id: number | null;
    subcategories?: Category[];
}

export default function CategoryDialog({ showDialog, setShowDialog }: CategoryDialogProps) {
    const { data: categories } = useGetCategory();
    const { mutateAsync: updateCategory } = useUpdateCategory();
    const { mutateAsync: createCategory } = useCreateCategory();
    const { mutateAsync: deleteCategory } = useDeleteCategory();

    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [editingCategory, setEditingCategory] = useState({
        name: "",
        slug: "",
        parent_category_id: null as number | null,
    });

    const [newCategory, setNewCategory] = useState({
        name: "",
        slug: "",
        parent_category_id: null as number | null,
    });

    const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({});

    // Build hierarchy
    const buildHierarchy = (cats: Category[]) => {
        const map = new Map<number, Category & { subcategories: Category[] }>();
        const roots: (Category & { subcategories: Category[] })[] = [];

        cats.forEach((c) => {
            map.set(c.id, { ...c, subcategories: [] });
        });

        map.forEach((c) => {
            if (c.parent_category_id && map.has(c.parent_category_id)) {
                map.get(c.parent_category_id)?.subcategories.push(c);
            } else {
                roots.push(c);
            }
        });

        return roots;
    };

    const hierarchy = categories?.data ? buildHierarchy(categories.data) : [];

    const handleEdit = (cat: Category) => {
        setEditingCategoryId(cat.id);
        setEditingCategory({
            name: cat.name,
            slug: cat.slug,
            parent_category_id: cat.parent_category_id,
        });
    };

    const handleSave = async () => {
        if (editingCategoryId !== null) {
            try {
                await updateCategory({ id: editingCategoryId, ...editingCategory });
                setEditingCategoryId(null);
                setEditingCategory({ name: "", slug: "", parent_category_id: null });
            } catch (err) {
                console.error("Failed to update category:", err);
            }
        }
    };

    const handleCreate = async () => {
        try {
            await createCategory(newCategory);
            setNewCategory({ name: "", slug: "", parent_category_id: null });
        } catch (err) {
            console.error("Failed to create category:", err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteCategory(id);
        } catch (err) {
            console.error("Failed to delete category:", err);
        }
    };

    const toggleOpen = (id: number) => {
        setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const renderCategory = (cat: Category, level = 0) => (
        <motion.div
            key={cat.id}
            layout
            className="flex flex-col border rounded-xl bg-white dark:bg-neutral-900 shadow-sm"
            style={{ marginLeft: `${level * 20}px` }}
        >
            {editingCategoryId === cat.id ? (
                <div className="flex flex-col gap-2 p-4">
                    <Input
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                        value={editingCategory.slug}
                        onChange={(e) => setEditingCategory((prev) => ({ ...prev, slug: e.target.value }))}
                    />
                    <Select
                        value={editingCategory.parent_category_id?.toString() ?? "none"}
                        onValueChange={(val) =>
                            setEditingCategory((prev) => ({
                                ...prev,
                                parent_category_id: val === "none" ? null : Number(val),
                            }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Parent Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">-- No Parent (Top Level) --</SelectItem>
                            {categories?.data
                                .filter((c) => c.parent_category_id === null && c.id !== editingCategoryId)
                                .map((c) => (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    <div className="flex gap-2 mt-2">
                        <Button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600">Save</Button>
                        <Button variant="secondary" onClick={() => setEditingCategoryId(null)} className="flex-1">Cancel</Button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-1 p-4">
                    <div className="flex justify-between items-center  p-1 relative cursor-pointer" onClick={() => toggleOpen(cat.id)}>
                        {!cat.parent_category_id && <Badge variant={"secondary"} className="absolute bg-green-500 top-1 right-1 text-black">Parent</Badge>}
                        <div>
                            <p><strong>Name:</strong> {cat.name}</p>
                            <p><strong>Slug:</strong> {cat.slug}</p>
                            <p><strong>Parent ID:</strong> {cat.parent_category_id ?? "None"}</p>
                            <p><strong>ID:</strong> {cat.id}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={(e) => { e.stopPropagation(); handleEdit(cat); }}>Edit</Button>
                            <Button variant="destructive" onClick={(e) => { e.stopPropagation(); handleDelete(cat.id); }}>Delete</Button>
                        </div>
                    </div>
                    <AnimatePresence>
                        {openCategories[cat.id] && cat.subcategories?.length ? (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="flex flex-col gap-2.5 overflow-hidden"
                            >
                                {cat.subcategories.map((sub) => renderCategory(sub, level + 1))}
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
                <Button variant="outline">Categories</Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl w-full overflow-y-auto h-[85%] scrollbar-hide">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-4">Categories</DialogTitle>
                </DialogHeader>

                <AnimatePresence>
                    <motion.div
                        layoutId="category-dialog"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Create new category */}
                        <div className="flex flex-col gap-2 p-4 rounded-xl border mb-4">
                            <Input
                                placeholder="Category Name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                            />
                            <Input
                                placeholder="Slug"
                                value={newCategory.slug}
                                onChange={(e) => setNewCategory((prev) => ({ ...prev, slug: e.target.value }))}
                            />
                            <Select
                                value={newCategory.parent_category_id?.toString() ?? "none"}
                                onValueChange={(val) =>
                                    setNewCategory((prev) => ({
                                        ...prev,
                                        parent_category_id: val === "none" ? null : Number(val),
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Parent Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">-- No Parent (Top Level) --</SelectItem>
                                    {categories?.data
                                        .filter((c) => c.parent_category_id === null)
                                        .map((c) => (
                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <Button className="mt-2" onClick={handleCreate}>Create Category</Button>
                        </div>

                        {/* Hierarchical categories */}
                        <div className="flex flex-col gap-3">
                            {hierarchy.map((cat) => renderCategory(cat))}
                        </div>

                        <DialogClose asChild>
                            <Button className="mt-4 w-full">Close</Button>
                        </DialogClose>
                    </motion.div>
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
