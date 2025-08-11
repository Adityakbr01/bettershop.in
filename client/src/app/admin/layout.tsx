import DashboardWithSidebar from "@/components/shadcn-dashboard"

export default function DashboardLayout({
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
                {children}
            </main>
        </div>
    )
}
