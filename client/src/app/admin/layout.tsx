"use client"

import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { withAuth } from "@/components/auth/withAuth"
import DashboardWithSidebar from "@/components/shadcn-dashboard"
import { APP_CONSTANTS } from "@/constants"

function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full">
            <DashboardWithSidebar />
            <div className="flex-1">

                {children}
            </div>
        </div>

    )
}


export default (DashboardLayout)