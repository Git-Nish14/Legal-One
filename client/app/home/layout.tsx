import { ReactNode } from "react";
import Sidebar from "@/components/common/Sidebar";

export default function Layout({ main }: { main: ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar /> {/* Sidebar Always Visible */}
            <div className="flex-1 p-6">{main}</div> {/* Main Content */}
        </div>
    );
}
