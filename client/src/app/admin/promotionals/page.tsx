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

import PromotionalHeader from "@/components/admin/Promotionals/PromotionalHeader";
import PromotionalTable, { Promotional } from "@/components/admin/Promotionals/PromotionalTable";
import PromotionalDialog from "@/components/admin/Promotionals/PromotionalDialog";
import { MotionButton } from "@/components/motion-button";

// Mock Promotionals Data
const promotionals: Promotional[] = [
  {
    id: "PRM-001",
    name: "Summer Sale",
    description: "Get 30% off on all summer wear.",
    startDate: "2025-08-01",
    endDate: "2025-08-15",
    status: "Active",
  },
  {
    id: "PRM-002",
    name: "New Year Blast",
    description: "Flat 50% discount storewide.",
    startDate: "2025-12-25",
    endDate: "2026-01-01",
    status: "Upcoming",
  },
  {
    id: "PRM-003",
    name: "Monsoon Mania",
    description: "Free shipping + 20% off on orders above $50.",
    startDate: "2025-07-01",
    endDate: "2025-07-10",
    status: "Expired",
  },
  {
    id: "PRM-004",
    name: "Back to School",
    description: "Special discounts on school supplies.",
    startDate: "2025-08-20",
    endDate: "2025-08-30",
    status: "Upcoming",
  },
];


export default function PromotionalsPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);


  const filteredPromotionals = promotionals.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full min-h-screen p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-extrabold my-6">Promotionals Overview</h1>

        <PromotionalHeader />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Name or Description..."
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

          <MotionButton
            layoutId="add-Promotional-dialog"
            onClick={() => setShowDialog(true)}
            className="cursor-pointer">Create Promotional</MotionButton>
        </div>

        {/* Promotionals Table */}
        <PromotionalTable filteredPromotionals={filteredPromotionals} />


        <PromotionalDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      </div>
    </div>
  );
}
