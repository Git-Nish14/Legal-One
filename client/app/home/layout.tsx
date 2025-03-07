import Sidebar from "@/components/common/Sidebar"; // Adjust the import path as needed
// Define the sidebar navigation items
const dashboardNav = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen">
            {/* Sidebar on the left */}
            <Sidebar dashboardNav={dashboardNav} />

            {/* Main content on the right */}
            <div className="flex-1 p-6">{children}</div>
        </div>
    );
}
