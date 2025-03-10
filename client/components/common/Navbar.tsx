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

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">Error loading data</p>;

  const user = data?.getData;

  return (
    <nav className="bg-gray-900 text-white p-5 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-center items-center space-x-8">
        {/* User & Lawyer Navigation */}
        {(user?.role === "USER" || user?.role === "LAWYER") && (
          <>
            <NavLink href="/home/sessions/active" pathname={pathname}>
              Active
            </NavLink>
            <NavLink href="/home/sessions/completed" pathname={pathname}>
              Completed
            </NavLink>
            <NavLink href="/home/sessions/rejected" pathname={pathname}>
              Rejected
            </NavLink>
            <NavLink href="/home/sessions/pending" pathname={pathname}>
              Pending
            </NavLink>
          </>
        )}

        {/* Admin Navigation */}
        {user?.role === "ADMIN" && (
          <>
            <NavLink href="/home/lawyers/pending" pathname={pathname}>
              Pending
            </NavLink>
            <NavLink href="/home/lawyers/accepted" pathname={pathname}>
              Accepted
            </NavLink>
            <NavLink href="/home/lawyers/blocked" pathname={pathname}>
              Blocked
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  pathname: string;
  children: React.ReactNode;
}

function NavLink({ href, pathname, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`px-6 py-3 rounded-lg transition duration-300 text-lg font-medium ${
        pathname.startsWith(href)
          ? "bg-blue-600 text-white shadow-lg"
          : "hover:bg-gray-700 hover:text-gray-300"
      }`}
    >
      {children}
    </Link>
  );
}
