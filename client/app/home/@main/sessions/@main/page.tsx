"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/home/sessions/active");
    }, [router]);

    return null; // Since we are redirecting, no UI is needed
}
