"use client";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();
    const { data, loading, error } = useQuery(GET_DATA);

    useEffect(() => {
        if (!loading && data) {
            const user = data?.getData;
            if (user?.role === "USER") {
                router.replace("/home/explore");
            } else if (user?.role === "LAWYER") {
                router.replace("/home/requests");
            } else if (user?.role === "ADMIN") {
                router.replace("/home/lawyers");
            }
        }
    }, [data, loading, router]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    return null; // Since we are redirecting, no UI is needed
}
