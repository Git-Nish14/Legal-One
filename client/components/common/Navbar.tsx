"use client";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const pathname = usePathname();
    const { data, loading, error } = useQuery(GET_DATA, {
        fetchPolicy: "network-only", // Always fetch fresh data from API
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    const user = data?.getData;

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-around">
            {/* User & Lawyer Navigation */}
            {(user?.role === "USER" || user?.role === "LAWYER") && (
                <>
                    <Link
                        href="/home/sessions/active"
                        className={`p-2 ${pathname === "/home/sessions/active" ? "font-bold" : ""}`}
                    >
                        Active
                    </Link>
                    <Link
                        href="/home/sessions/completed"
                        className={`p-2 ${pathname === "/home/sessions/completed" ? "font-bold" : ""}`}
                    >
                        Completed
                    </Link>
                    <Link
                        href="/home/sessions/rejected"
                        className={`p-2 ${pathname === "/home/sessions/rejected" ? "font-bold" : ""}`}
                    >
                        Rejected
                    </Link>
                </>
            )}

            {/* Admin Navigation */}
            {user?.role === "ADMIN" && (
                <>
                    <Link
                        href="/home/lawyers/pending"
                        className={`p-2 ${pathname === "/home/lawyers/pending" ? "font-bold" : ""}`}
                    >
                        Pending
                    </Link>
                    <Link
                        href="/home/lawyers/accepted"
                        className={`p-2 ${pathname === "/home/lawyers/accepted" ? "font-bold" : ""}`}
                    >
                        Accepted
                    </Link>
                    <Link
                        href="/home/lawyers/blocked"
                        className={`p-2 ${pathname === "/home/lawyers/blocked" ? "font-bold" : ""}`}
                    >
                        Blocked
                    </Link>
                </>
            )}
        </nav>
    );
}
