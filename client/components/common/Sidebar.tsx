"use client";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { client } from "@/lib/apollo/apollo-client";
import { LogOut, User, Briefcase, Search, Users } from "lucide-react";

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogout = () => {
    Cookies.remove("Authorization");
    client.clearStore();
    router.push("/signin");
  };

  return (
    <div className="w-72 h-full bg-gray-900 bg-opacity-75 backdrop-blur-lg text-white p-6 flex flex-col justify-between shadow-xl rounded-r-2xl">
      <div>
        {/* User Greeting */}
        <div className="mb-6 text-center">
          <h2 className="text-lg font-medium">{getGreeting()},</h2>
          <p className="text-2xl font-bold">{userName}!</p>
          <span className="text-sm text-gray-400 capitalize">
            ({userRole.toLowerCase()})
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-3">
          {user?.role === "USER" && (
            <>
              <SidebarLink
                href="/home/explore"
                icon={<Search size={20} />}
                label="Explore"
              />
              <SidebarLink
                href="/home/sessions"
                icon={<Briefcase size={20} />}
                label="My Sessions"
              />
            </>
          )}

          {user?.role === "LAWYER" && (
            <>
              <SidebarLink
                href="/home/sessions"
                icon={<Briefcase size={20} />}
                label="My Sessions"
              />
            </>
          )}

          {user?.role === "ADMIN" && (
            <>
              <SidebarLink
                href="/home/lawyers"
                icon={<Users size={20} />}
                label="Manage Lawyers"
              />
            </>
          )}

          <SidebarLink
            href="/home/profile"
            icon={<User size={20} />}
            label="Profile"
          />
        </ul>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-lg w-full hover:bg-red-700 transition-all"
      >
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
}
interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}
const SidebarLink = ({ href, icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-gray-700 
        ${pathname.startsWith(href) ? "bg-gray-700" : "bg-transparent"}`}
      >
        {icon} <span className="text-base font-medium">{label}</span>
      </Link>
    </li>
  );
};
