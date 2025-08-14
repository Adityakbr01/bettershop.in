"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Order = {
  id: string;
  customer: string;
  date: string;
  status: string;
  total: number;
};

export default function OrderTable({
  filteredOrders,
}: {
  filteredOrders: Order[];
}) {
  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-yellow-500",
      Shipped: "bg-blue-500",
      Delivered: "bg-green-500",
      Cancelled: "bg-red-500",
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  return (
    <Table className="rounded-2xl overflow-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {filteredOrders.length ? (
            filteredOrders.map((order, idx) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10,filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0,filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10,filter: "blur(10px)" }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-full cursor-pointer hover:bg-white/10">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Cancel</DropdownMenuItem>
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
              <TableCell
                colSpan={6}
                className="text-center text-gray-500"
              >
                No orders found
              </TableCell>
            </TableRow>
          )}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
}
