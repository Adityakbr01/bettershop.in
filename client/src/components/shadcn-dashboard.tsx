// shadcn-dashboard.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Menu,
    Home,
    Users,
    ShoppingCart,
    Settings,
    LogOut,
    BarChart2,
    PieChart,
    Search,
} from "lucide-react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    BarChart,
    Bar,
} from "recharts";
import { AdminDashboardSidebar } from "./AdminDashboardSidebar";
import { SidebarTrigger } from "./ui/sidebar";

// --- sample data for charts ---
const lineData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4000 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 7000 },
];

const barData = [
    { name: "Electronics", value: 2400 },
    { name: "Apparel", value: 1398 },
    { name: "Home", value: 9800 },
    { name: "Toys", value: 3908 },
];

const recentOrders = [
    { id: "#1001", customer: "Amit", total: "$120.00", status: "shipped" },
    { id: "#1002", customer: "Sara", total: "$89.50", status: "processing" },
    { id: "#1003", customer: "Rahul", total: "$45.00", status: "delivered" },
    { id: "#1004", customer: "Priya", total: "$230.00", status: "processing" },
];

const NAV_ITEMS = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "sales", label: "Sales", icon: BarChart2 },
    { id: "customers", label: "Customers", icon: Users },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "analytics", label: "Analytics", icon: PieChart },
    { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardWithSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("overview");

    // persist collapse state
    useEffect(() => {
        const saved = localStorage.getItem("dashboard-sidebar-collapsed");
        if (saved !== null) setCollapsed(saved === "true");
    }, []);

    useEffect(() => {
        localStorage.setItem("dashboard-sidebar-collapsed", String(collapsed));
    }, [collapsed]);

    return (
        <div className="min-h-screen flex  text-white">
            <AdminDashboardSidebar />
            <SidebarTrigger />
        </div>
    );
}
