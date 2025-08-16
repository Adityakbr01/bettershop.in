import { ConfirmDialog } from '@/components/ConfirmDialog';
import React from 'react';
import { z } from 'zod';
import { ProductSchema } from '@/validator/ProductCreate.schema';

type ProductFormValues = z.infer<typeof ProductSchema>;

interface PriceConfirmDialogProps {
    showConfirm: boolean;
    setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    handleFinalSubmit: (data: ProductFormValues) => void;
    formData?: ProductFormValues | null;
}

function PriceConfirmDialog({
    showConfirm,
    setShowConfirm,
    handleFinalSubmit,
    formData,
}: PriceConfirmDialogProps) {
    return (
        <ConfirmDialog
            open={showConfirm}
            onOpenChange={setShowConfirm}
            title="Low Price Confirmation"
            description="The base price is less than 100. Do you still want to create this product?"
            confirmText="Yes, create"
            cancelText="No"
            onConfirm={() => {
                if (formData) handleFinalSubmit(formData);
                setShowConfirm(false);
            }}
        />
    );
}

export default PriceConfirmDialog;
