"use client"

import DashboardWithSidebar from "@/components/shadcn-dashboard"

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