// components/admin/dashboard/ActiveCouponsTable.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { activeCoupons } from "./constants";

export default function ActiveCouponsTable() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Active Coupons</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Used / Limit</TableHead>
              <TableHead>Expires At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeCoupons.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell className="font-medium">{coupon.code}</TableCell>
                <TableCell>{coupon.description}</TableCell>
                <TableCell className="capitalize">{coupon.discount_type}</TableCell>
                <TableCell>
                  {coupon.discount_type === "percentage"
                    ? `${coupon.discount_value}%`
                    : `$${coupon.discount_value}`}
                </TableCell>
                <TableCell>
                  {coupon.used_count} / {coupon.usage_limit}
                </TableCell>
                <TableCell>{coupon.expires_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
