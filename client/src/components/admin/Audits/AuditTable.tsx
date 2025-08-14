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

export type AuditLog = {
  id: string;
  action: string;
  user: string;
  role: "Admin" | "User" | "Manager";
  date: string;
  status: "Success" | "Failed";
};

export default function AuditTable({
  logs,
}: {
  logs: AuditLog[];
}) {
  const getStatusBadge = (status: "Success" | "Failed") => {
    const colors: Record<AuditLog["status"], string> = {
      Success: "bg-green-500",
      Failed: "bg-red-500",
    };
    return <Badge className={`${colors[status]} text-white`}>{status}</Badge>;
  };

  const getRoleBadge = (role: AuditLog["role"]) => {
    const colors: Record<AuditLog["role"], string> = {
      Admin: "bg-purple-500",
      User: "bg-blue-500",
      Manager: "bg-yellow-500",
    };
    return <Badge className={`${colors[role]} text-white`}>{role}</Badge>;
  };

  return (
    <Table className="rounded-2xl overflow-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>Log ID</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {logs.length ? (
            logs.map((log, idx) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <TableCell className="font-medium">{log.id}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{getRoleBadge(log.role)}</TableCell>
                <TableCell>{log.date}</TableCell>
                <TableCell>{getStatusBadge(log.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-full cursor-pointer hover:bg-white/10">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Re-run Action</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Delete Log
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                No audit logs found
              </TableCell>
            </TableRow>
          )}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
}
