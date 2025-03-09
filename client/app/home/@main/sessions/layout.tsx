import { ReactNode } from "react";
import Navbar from "@/components/common/Navbar";

export default function Layout({ main }: { main: ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Navbar /> {/* Navbar Always Visible */}
            <div className="flex-1 p-6">{main}</div> {/* Main Content */}
        </div>
    );
}
