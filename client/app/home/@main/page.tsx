"use client";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_DATA, {
    fetchPolicy: "network-only", // Always fetch fresh data from API
  });

  useEffect(() => {
    if (!loading && data) {
      const user = data?.getData;
      if (user?.role === "USER") {
        router.replace("/home/explore");
      } else if (user?.role === "LAWYER") {
        router.replace("/home/sessions");
      } else if (user?.role === "ADMIN") {
        router.replace("/home/lawyers");
      }
    }
  }, [data, loading, router]);

  if (loading) return (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="text-4xl font-extrabold text-gray-900 tracking-wide relative">
      <span className="animate-pulse">LEGAL-ONE</span>
    </div>
    <p className="text-gray-500 text-lg mt-2 animate-pulse">Loading...</p>
  </div>
  );
  if (error) return <p>Error loading data</p>;

  return null; // Since we are redirecting, no UI is needed
}
