"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import OrderTable from "@/components/admin/Orders/OrderTable";
import OrderHeader from "@/components/admin/Orders/OrderHeader";


// Mock Orders Data
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2025-08-10",
    status: "Pending",
    total: 120.5,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2025-08-09",
    status: "Shipped",
    total: 89.99,
  },
  {
    id: "ORD-003",
    customer: "Michael Johnson",
    date: "2025-08-08",
    status: "Delivered",
    total: 200,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2025-08-07",
    status: "Cancelled",
    total: 59.99,
  },
];

export default function OrdersPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? o.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-extrabold my-6">Orders Overview</h1>

<OrderHeader/>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Order ID or Customer..."
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="cursor-pointer">Create Order</Button>
        </div>

        {/* Orders Table */}
        <OrderTable filteredOrders={filteredOrders} />
      </div>
    </div>
  );
}
