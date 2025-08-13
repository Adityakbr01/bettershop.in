"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  TrendingUp,
  Package,
  Users,
  DollarSign,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Mock data (schema-aligned) — swap with real DB calls later
// -----------------------------------------------------------------------------

// Orders/Revenue (monthly)
const revenueMonthly: { month: string; revenue: number; orders: number }[] = [
  { month: "Jan", revenue: 18400, orders: 320 },
  { month: "Feb", revenue: 20500, orders: 348 },
  { month: "Mar", revenue: 22350, orders: 372 },
  { month: "Apr", revenue: 26110, orders: 410 },
  { month: "May", revenue: 27980, orders: 432 },
  { month: "Jun", revenue: 30240, orders: 455 },
  { month: "Jul", revenue: 28990, orders: 441 },
  { month: "Aug", revenue: 31420, orders: 470 },
  { month: "Sep", revenue: 33670, orders: 489 },
  { month: "Oct", revenue: 35120, orders: 502 },
  { month: "Nov", revenue: 42010, orders: 580 },
  { month: "Dec", revenue: 49850, orders: 660 },
];

// Trending products (aggregated from OrderItem)
const trendingProducts: {
  productId: number;
  name: string;
  category: string;
  qtySold: number;
  revenue: number;
}[] = [
    { productId: 101, name: "Blue T-Shirt", category: "Clothing", qtySold: 820, revenue: 15980 },
    { productId: 102, name: "Denim Jacket", category: "Clothing", qtySold: 610, revenue: 24400 },
    { productId: 103, name: "Grey Hoodie", category: "Clothing", qtySold: 540, revenue: 23200 },
    { productId: 104, name: "Cargo Pants", category: "Clothing", qtySold: 505, revenue: 22690 },
    { productId: 105, name: "Summer Dress", category: "Clothing", qtySold: 470, revenue: 25830 },
  ];

// Low stock variants (InventoryStock + ProductVariant)
const lowStockVariants: {
  variantId: number;
  product: string;
  attributes: string;
  stock: number;
  threshold?: number;
}[] = [
    { variantId: 201, product: "Blue T-Shirt", attributes: "M / Blue", stock: 4, threshold: 10 },
    { variantId: 202, product: "Grey Hoodie", attributes: "L / Grey", stock: 2, threshold: 8 },
    { variantId: 203, product: "Denim Jacket", attributes: "M / Indigo", stock: 1, threshold: 6 },
    { variantId: 204, product: "Summer Dress", attributes: "S / Yellow", stock: 5, threshold: 10 },
  ];

// User behavior feed (UserBehaviorLog)
const behaviorFeed: {
  id: number;
  user: string;
  type:
  | "view_product"
  | "add_to_cart"
  | "remove_from_cart"
  | "add_to_wishlist"
  | "remove_from_wishlist"
  | "search"
  | "purchase"
  | "click_banner"
  | "share_product"
  | "oauth_login"
  | "manual_login"
  | "logout";
  meta?: string;
  time: string;
}[] = [
    { id: 1, user: "John D.", type: "purchase", meta: "Order #12034 ($129.99)", time: "2m ago" },
    { id: 2, user: "Amelia K.", type: "add_to_cart", meta: "Denim Jacket (M)", time: "6m ago" },
    { id: 3, user: "Maria S.", type: "search", meta: `"hoodie"`, time: "11m ago" },
    { id: 4, user: "David P.", type: "view_product", meta: "Cargo Pants", time: "15m ago" },
    { id: 5, user: "Jessie L.", type: "oauth_login", meta: "Google", time: "20m ago" },
    { id: 6, user: "Ravi N.", type: "add_to_wishlist", meta: "Summer Dress", time: "22m ago" },
  ];

// Returns breakdown (ReturnRequest)
const returnsBreakdown: {
  name: string; value: number; status:
    "pending" | "approved" | "rejected" | "completed";
}[] = [
    { name: "Pending", value: 18, status: "pending" },
    { name: "Approved", value: 42, status: "approved" },
    { name: "Rejected", value: 7, status: "rejected" },
    { name: "Completed", value: 35, status: "completed" },
  ];

// Active coupons
const activeCoupons: {
  code: string;
  description?: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  expires_at?: string;
  used_count: number;
  usage_limit?: number;
}[] = [
    { code: "WELCOME10", description: "New user discount", discount_type: "percentage", discount_value: 10, used_count: 184, usage_limit: 1000, expires_at: "2025-12-31" },
    { code: "FREESHIP", description: "Free shipping over $50", discount_type: "fixed", discount_value: 5, used_count: 92, usage_limit: 800, expires_at: "2025-06-30" },
    { code: "HOLIDAY25", description: "Holiday sale", discount_type: "percentage", discount_value: 25, used_count: 310, usage_limit: 1500, expires_at: "2025-12-25" },
  ];

// Quick KPI aggregates
const totalRevenue = revenueMonthly.reduce((s, r) => s + r.revenue, 0);
const totalOrders = revenueMonthly.reduce((s, r) => s + r.orders, 0);
const salesToday = 2640; // mock “today”
const activeCustomers = 980; // mock from users table

// Color palette (from your global classes)
const PALETTE = {
  cbg1: "#c4b7ec",
  cbg2: "#eeb0db",
  cbg3: "#9d80f6",
  cbg4: "#129d78",
  cbg5: "#ff7300",
  cbg6: "#f5fc35",
};

// Recharts pie colors matching statuses
const RETURN_COLORS: Record<typeof returnsBreakdown[number]["status"], string> = {
  pending: PALETTE.cbg5,
  approved: PALETTE.cbg4,
  rejected: "#ef4444",
  completed: PALETTE.cbg3,
};

// Formatters
const currency = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const shortCurrency = (n: number) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${n}`;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function AdminDashboardPage() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          A high-level overview of sales, inventory, users, returns, and marketing.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Sales Today",
            value: currency(salesToday),
            icon: <DollarSign className="w-6 h-6 text-white" />,
            bg: "cbg4",
            sub: "+8% vs yesterday",
          },
          {
            label: "Total Revenue (YTD)",
            value: currency(totalRevenue),
            icon: <TrendingUp className="w-6 h-6 text-white" />,
            bg: "cbg3",
            sub: "+16% YoY",
          },
          {
            label: "Total Orders",
            value: totalOrders.toLocaleString(),
            icon: <ShoppingBag className="w-6 h-6 text-white" />,
            bg: "cbg5",
            sub: "+4.2% MoM",
          },
          {
            label: "Active Customers",
            value: activeCustomers.toLocaleString(),
            icon: <Users className="w-6 h-6 text-white" />,
            bg: "cbg1",
            sub: "last 30 days",
          },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className="p-0"
          >
            <Card className={`overflow-hidden p-0`}>
              <CardContent className="p-0">
                <div className={`flex items-center gap-4 ${c.bg} p-5`}>
                  <div className="p-3 rounded-xl bg-white/20">{c.icon}</div>
                  <div className="flex-1">
                    <p className="text-white/80 text-sm">{c.label}</p>
                    <p className="text-2xl font-semibold text-white">{c.value}</p>
                    <p className="text-white/80 text-xs mt-1">{c.sub}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Revenue Trend */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="h-[340px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Revenue Trend (Monthly)</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueMonthly} margin={{ left: -10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    fontSize={12}
                    tickFormatter={shortCurrency}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(v: any, n: any) => (n === "revenue" ? currency(v) : v)}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={PALETTE.cbg3}
                    strokeWidth={2.4}
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orders Trend */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
          <Card className="h-[340px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Orders Trend (Monthly)</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueMonthly} margin={{ left: -10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip labelStyle={{ color: "var(--foreground)" }} />
                  <Bar dataKey="orders" fill={PALETTE.cbg5} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Returns Breakdown */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <Card className="h-[340px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Returns Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px] grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="col-span-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={returnsBreakdown}
                      outerRadius={90}
                      innerRadius={50}
                      paddingAngle={3}
                    >
                      {returnsBreakdown.map((entry) => (
                        <Cell key={entry.name} fill={RETURN_COLORS[entry.status]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: any, n: any) => [v, n]}
                      labelStyle={{ color: "var(--foreground)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-2 flex flex-col justify-center gap-2">
                {returnsBreakdown.map((r) => (
                  <div key={r.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ background: RETURN_COLORS[r.status] }}
                      />
                      <span className="text-sm">{r.name}</span>
                    </div>
                    <Badge variant="secondary">{r.value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Data Row: Trending Products & Low Stock */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Trending Products */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Trending Products</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="text-right">Qty Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trendingProducts.map((p, idx) => (
                    <motion.tr
                      key={p.productId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.25 }}
                      className="border-b last:border-0"
                    >
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className="bg-black/10 text-foreground">{p.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{p.qtySold.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{currency(p.revenue)}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Low Stock Alerts */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Low Stock Alerts</CardTitle>
                <Badge className="cbg5 text-white">{lowStockVariants.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockVariants.map((v, idx) => (
                  <motion.div
                    key={v.variantId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.25 }}
                    className="flex items-center justify-between rounded-xl border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl cbg2">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{v.product}</div>
                        <div className="text-xs text-muted-foreground">{v.attributes}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        Stock: <span className="font-semibold">{v.stock}</span>
                      </div>
                      {typeof v.threshold === "number" && (
                        <div className="text-xs text-muted-foreground">
                          Threshold: {v.threshold}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Activity */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Live User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {behaviorFeed.map((b, idx) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.25 }}
                    className="flex items-center justify-between rounded-xl border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl cbg1">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{b.user}</div>
                        <div className="text-xs text-muted-foreground">
                          {b.type.replace(/_/g, " ")}
                          {b.meta ? ` • ${b.meta}` : ""}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{b.time}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Coupons / Marketing Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Coupons Table */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Active Coupons</CardTitle>
                <Button size="sm" className="cbg4 hover:opacity-90 text-white">
                  Create Coupon
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="hidden lg:table-cell">Expires</TableHead>
                    <TableHead className="text-right">Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeCoupons.map((c, idx) => (
                    <motion.tr
                      key={c.code}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.25 }}
                      className="border-b last:border-0"
                    >
                      <TableCell className="font-medium">{c.code}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className={c.discount_type === "percentage" ? "cbg3 text-white" : "cbg2 text-white"}>
                          {c.discount_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {c.discount_type === "percentage" ? `${c.discount_value}%` : currency(c.discount_value)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{c.expires_at ?? "—"}</TableCell>
                      <TableCell className="text-right">{c.used_count.toLocaleString()}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions / Shortcuts */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Add Product", icon: <Package className="w-5 h-5" />, bg: "cbg3" },
                  { label: "Create Order", icon: <ShoppingBag className="w-5 h-5" />, bg: "cbg5" },
                  { label: "View Customers", icon: <Users className="w-5 h-5" />, bg: "cbg1" },
                  { label: "Sales Report", icon: <TrendingUp className="w-5 h-5" />, bg: "cbg4" },
                ].map((qa, i) => (
                  <motion.button
                    key={qa.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between rounded-2xl ${qa.bg} text-white px-4 py-3 shadow`}
                  >
                    <span className="flex items-center gap-2">{qa.icon} {qa.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
