"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CustomerHeader from "@/components/admin/Customers/CustomerHeader";
import CustomerTable from "@/components/admin/Customers/CustomerTable";

type Customer = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Banned";
  orders: number;
  totalSpent: number;
};

const customers: Customer[] = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    orders: 15,
    totalSpent: 1200.5,
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Active",
    orders: 8,
    totalSpent: 560.75,
  },
  {
    id: "CUST-003",
    name: "Michael Johnson",
    email: "michael@example.com",
    status: "Banned",
    orders: 3,
    totalSpent: 89.99,
  },
  {
    id: "CUST-004",
    name: "Emily Davis",
    email: "emily@example.com",
    status: "Active",
    orders: 22,
    totalSpent: 3400.0,
  },
];



export default function CustomersPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-extrabold my-6">Customers Overview</h1>

        <CustomerHeader />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Name, Email or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />

            <Select onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="cursor-pointer">Add Customer</Button>
        </div>

        {/* Customer Table */}
        <CustomerTable customers={filteredCustomers} />

      </div>
    </div>
  );
}
