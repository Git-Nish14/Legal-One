"use client";

import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import Sidebar from "@/components/common/Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const { data, loading, error } = useQuery(GET_DATA);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const userRole = data?.getData?.role;

    // Define role-based sidebar navigation
    const dashboardNav =
        userRole === "USER"
            ? [
                { name: "Explore", href: "/user/explore" },
                { name: "Sessions", href: "/user/Sessions" },
                { name: "Profile", href: "/user/profile" },
            ]
            : userRole === "LAWYER"
                ? [
                    { name: "Requests", href: "/lawyer/requests" },
                    { name: "Sessions", href: "/lawyer/Sessions" },
                    { name: "Profile", href: "/lawyer/profile" },
                ]
                : userRole === "ADMIN"
                    ? [
                        { name: "Lawyers", href: "/admin/lawyers" },
                    ]
                    : [];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar dashboardNav={dashboardNav} />

            {/* Main Content */}
            <div className="flex-1 p-6">{children}</div>
        </div>
    );
};

export default RootLayout;
