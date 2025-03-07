"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface NavItem {
  name: string;
  href: string;
}

interface SidebarProps {
  dashboardNav: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ dashboardNav }) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("Authorization");
    router.push("/");
  };

  return (
    <div className="w-64 h-screen bg-blue-700 text-white flex flex-col p-4">
      {dashboardNav.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="text-xl font-bold mb-4 hover:text-gray-300 transition"
        >
          {item.name}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="text-xl font-bold text-red-500 mt-auto hover:text-red-300 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
