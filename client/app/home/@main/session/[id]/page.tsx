"use client";

import Chatbox from "@/components/common/Chatbox";
import { useParams, useSearchParams } from "next/navigation";

export default function ChatPage() {
    const { id } = useParams() as { id: string };
    const sessionId = id

    if (!sessionId) return <p>Session ID is required</p>;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Chatbox sessionId={sessionId} />
        </div>
    );
}
