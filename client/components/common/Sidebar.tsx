"use client";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { client } from "@/lib/apollo/apollo-client";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_DATA, {
    fetchPolicy: "network-only", // Always fetch fresh data from API
  });

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">Error loading data</p>;

  const user = data?.getData;
  const userName = user?.name || "User";
  const userRole = user?.role || "GUEST";

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Logout function
  const handleLogout = () => {
    Cookies.remove("Authorization");
    client.clearStore();
    router.push("/signin");
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-full p-6 flex flex-col justify-between shadow-lg">
      <div>
        {/* User Greeting */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">{getGreeting()},</h2>
          <p className="text-xl font-bold">{userName}!</p>
          <span className="text-sm text-gray-400 capitalize">({userRole.toLowerCase()})</span>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-3">
          {user?.role === "USER" && (
            <>
              <li>
                <Link href="/home/explore" className={`block px-3 py-2 rounded-md hover:bg-gray-700 ${pathname.startsWith("/home/explore") ? "bg-gray-700" : ""}`}>
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/home/sessions" className={`block px-3 py-2 rounded-md hover:bg-gray-700 ${pathname.startsWith("/home/sessions") ? "bg-gray-700" : ""}`}>
                  My Sessions
                </Link>
              </li>
            </>
          )}

          {user?.role === "LAWYER" && (
            <>
              <li>
                <Link href="/home/requests" className={`block px-3 py-2 rounded-md hover:bg-gray-700 ${pathname.startsWith("/home/requests") ? "bg-gray-700" : ""}`}>
                  Requests
                </Link>
              </li>
              <li>
                <Link href="/home/sessions" className={`block px-3 py-2 rounded-md hover:bg-gray-700 ${pathname.startsWith("/home/sessions") ? "bg-gray-700" : ""}`}>
                  My Sessions
                </Link>
              </li>
            </>
          )}

          {user?.role === "ADMIN" && (
            <>
              <li>
                <Link href="/home/lawyers" className={`block px-3 py-2 rounded-md hover:bg-gray-700 ${pathname.startsWith("/home/lawyers") ? "bg-gray-700" : ""}`}>
                  Manage Lawyers
                </Link>
              </li>
            </>
          )}

          <li>
            <Link href="/home/profile" className={`block px-3 py-2 rounded-md hover:bg-gray-700 ${pathname.startsWith("/home/profile") ? "bg-gray-700" : ""}`}>
              Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 p-2 bg-red-600 text-white rounded-md w-full hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
