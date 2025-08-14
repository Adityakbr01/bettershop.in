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

export type Promotional = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Upcoming" | "Expired";
};

type PromotionalTableProps = {
  filteredPromotionals: Promotional[];
};

export default function PromotionalTable({
  filteredPromotionals,
}: PromotionalTableProps) {
  return (
    <Table className="rounded-2xl overflow-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {filteredPromotionals.length ? (
            filteredPromotionals.map((promo, idx) => (
              <motion.tr
                key={promo.id}
                initial={{ opacity: 0, y: 10,filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0,filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10,filter: "blur(10px)" }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <TableCell className="font-medium">{promo.name}</TableCell>
                <TableCell>{promo.description}</TableCell>
                <TableCell>
                  {promo.status === "Active" && (
                    <Badge className="bg-green-500">Active</Badge>
                  )}
                  {promo.status === "Upcoming" && (
                    <Badge className="bg-blue-500">Upcoming</Badge>
                  )}
                  {promo.status === "Expired" && (
                    <Badge className="bg-gray-400">Expired</Badge>
                  )}
                </TableCell>
                <TableCell>{promo.startDate}</TableCell>
                <TableCell>{promo.endDate}</TableCell>
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
                      {promo.status === "Active" ? (
                        <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>Activate</DropdownMenuItem>
                      )}
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
              <TableCell colSpan={6} className="text-center text-gray-500">
                No promotions found
              </TableCell>
            </TableRow>
          )}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
}
