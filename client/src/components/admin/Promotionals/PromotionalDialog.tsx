
"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from '@/components/ui/button';
import { DialogProps } from '../Products/ProductDialog';

function PromotionalDialog({ showDialog, setShowDialog }: DialogProps) {
  return (
    <AnimatePresence>
      {showDialog && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            layoutId="add-Promotional-dialog"
            className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-lg"
          >
            <h2 className="text-xl font-bold mb-4">Create New Order</h2>
            <Input placeholder="Customer Name" className="mb-3" />
            <Input placeholder="Order ID" className="mb-3" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex justify-end gap-3 mt-4">
              <Button onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600">
                Save Order
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PromotionalDialog