import { ReactNode } from "react";
import Sidebar from "@/components/common/Sidebar";

export default function Layout({ main }: { main: ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed on all screens */}
      <div className="w-64 h-screen flex-shrink-0 fixed top-0 left-0">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 ml-64 overflow-y-auto h-screen">{main}</div>
    </div>
  );
}
