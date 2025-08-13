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
import CouponHeader from "@/components/admin/Coupons/CouponHeader";
import CouponTable, { Coupon } from "@/components/admin/Coupons/CouponTable";


// Mock Coupons Data
// Mock Coupons Data (typed)
const coupons: Coupon[] = [
  {
    id: "CPN-001",
    code: "WELCOME10",
    discount: "10%",
    startDate: "2025-08-01",
    endDate: "2025-08-31",
    status: "Active",
  },
  {
    id: "CPN-002",
    code: "FREESHIP",
    discount: "Free Shipping",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    status: "Expired",
  },
  {
    id: "CPN-003",
    code: "SUMMER25",
    discount: "25%",
    startDate: "2025-09-01",
    endDate: "2025-09-15",
    status: "Upcoming",
  },
  {
    id: "CPN-004",
    code: "BUY1GET1",
    discount: "Buy 1 Get 1 Free",
    startDate: "2025-08-10",
    endDate: "2025-08-20",
    status: "Active",
  },
];

export default function CouponPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.discount.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-extrabold my-6">Coupons Overview</h1>

        <CouponHeader />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Code or Discount..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />

            <Select
              onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="cursor-pointer">Create Coupon</Button>
        </div>

        {/* Coupon Table */}
        <CouponTable coupons={filteredCoupons} />
      </div>
    </div>
  );
}
