"use client";

import { useState } from "react";
import { ReactNode } from "react";
import Sidebar from "@/components/common/Sidebar";
import { Menu } from "lucide-react";

export default function Layout({ main }: { main: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Responsive & Collapsible */}
      <div className={`fixed top-0 left-0 h-screen z-50 transition-transform duration-300 bg-gray-900 shadow-xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 w-64 sm:w-72`}>
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content - Scrollable & Responsive */}
      <div className="flex-1 sm:ml-72 ml-0 overflow-y-auto h-screen p-4 sm:p-6">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="sm:hidden p-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 mb-4"
        >
          <Menu size={24} />
        </button>
        {main}
      </div>
    </div>
  );
}