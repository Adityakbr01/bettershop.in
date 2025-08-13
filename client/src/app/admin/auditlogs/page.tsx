"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import AuditTable, { AuditLog } from "@/components/admin/Audits/AuditTable";
import AuditHeader from "@/components/admin/Audits/AuditHeader";

// Sample Audit Logs
const initialLogs: AuditLog[] = [
  {
    id: "A-1001",
    action: "User Login",
    user: "John Doe",
    role: "Admin",
    date: "2025-08-12 10:32 AM",
    status: "Success",
  },
  {
    id: "A-1002",
    action: "Data Export",
    user: "Jane Smith",
    role: "Manager",
    date: "2025-08-12 09:14 AM",
    status: "Failed",
  },
  {
    id: "A-1003",
    action: "Settings Update",
    user: "Michael Brown",
    role: "User",
    date: "2025-08-11 05:50 PM",
    status: "Success",
  },
];

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = initialLogs.filter(
    (log) =>
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Audit Logs
      </motion.h1>

      {/* Header Stats */}
      <AuditHeader />

      {/* Search Bar */}
      <motion.div
        className="max-w-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Input
          placeholder="Search audits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
        />
      </motion.div>

      {/* Audit Table */}
      <AuditTable logs={filteredLogs} />
    </div>
  );
}
