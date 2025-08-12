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
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <DashboardWithSidebar />
            {/* Main content */}
            <main className="flex-1 p-6 bg-background">
                <ProtectedRoute allowedRoles={[APP_CONSTANTS.userRole.USER]}>
                    {children}
                </ProtectedRoute>
            </main>
        </div>
    )
}


export default withAuth(DashboardLayout)