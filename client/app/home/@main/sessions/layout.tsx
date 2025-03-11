import { ReactNode } from "react";
import Navbar from "@/components/common/Navbar";

export default function Layout({ main }: { main: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar /> {/* Navbar Always Visible */}
      <div className="flex-1  ml-10">{main}</div> {/* Main Content */}
    </div>
  );
}
