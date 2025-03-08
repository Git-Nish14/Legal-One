"use client";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const user = data?.getData;

  // Logout function to remove the Authorization cookie and redirect to login
  const handleLogout = () => {
    Cookies.remove("Authorization"); // Remove the cookie
    router.push("/signin"); // Redirect to login page
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul>

          {/* User-Specific Sidebar */}
          {user?.role === "USER" && (
            <>
              <li className={`mb-2 ${pathname === "/home/explore" ? "font-bold" : ""}`}>
                <Link href="/home/explore">Explore</Link>
              </li>
              <li className={`mb-2 ${pathname === "/home/sessions" ? "font-bold" : ""}`}>
                <Link href="/home/sessions">My Sessions</Link>
              </li>
            </>
          )}

          {/* Lawyer-Specific Sidebar */}
          {user?.role === "LAWYER" && (
            <>
              <li className={`mb-2 ${pathname === "/home/requests" ? "font-bold" : ""}`}>
                <Link href="/home/requests">Requests</Link>
              </li>
              <li className={`mb-2 ${pathname === "/home/sessions" ? "font-bold" : ""}`}>
                <Link href="/home/sessions">My Sessions</Link>
              </li>
            </>
          )}

          {/* Admin-Specific Sidebar */}
          {user?.role === "ADMIN" && (
            <>
              <li className={`mb-2 ${pathname === "/home/lawyers" ? "font-bold" : ""}`}>
                <Link href="/home/lawyers">Manage Lawyers</Link>
              </li>
            </>
          )}

          {/* Common for all users */}
          <li className={`mb-2 ${pathname === "/home/profile" ? "font-bold" : ""}`}>
            <Link href="/home/profile">Profile</Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-4 p-2 bg-red-600 text-white rounded w-full hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
