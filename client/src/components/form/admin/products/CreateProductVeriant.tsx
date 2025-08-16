import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SIZE_OPTIONS } from '@/constants';
import React from 'react';

interface FormDataType {
  name: string;
  sku: string;
  price: string;
  stock_level: string;
  size: string;
}

interface CreateProductVariantFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  formData: FormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  setOpen: (open: boolean) => void;
  isPending: boolean;
}

function CreateProductVeriantForm({
  handleSubmit,
  formData,
  handleChange,
  setFormData,
  setOpen,
  isPending,
}: CreateProductVariantFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Variant Name (e.g. Red)"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
        required
      />
      <Input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <Input
        name="stock_level"
        type="number"
        placeholder="Stock Quantity"
        value={formData.stock_level}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block mb-1 font-medium">Size</label>
        <Select
          name="size"
          value={formData.size}
          onValueChange={(value) => setFormData({ ...formData, size: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DialogFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default CreateProductVeriantForm;
