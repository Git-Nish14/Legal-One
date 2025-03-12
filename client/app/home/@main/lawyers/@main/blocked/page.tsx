"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import AdminCard from "@/components/common/AdminCard";
import { GET_BLOCKED_LAWYERS } from "@/graphql/queries";
import SessionsPageSkeleton from "@/components/loading/SessionsPageSkeleton";

const BlockedLawyersPage: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_BLOCKED_LAWYERS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <SessionsPageSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || data.getBlockedLawyers.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-700">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h8M8 11h5M8 15h3M9 21h6a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <h2 className="text-xl font-semibold">No Lawyers Available</h2>
        <p className="text-gray-500 text-center max-w-sm mt-2">
          There are currently no blocked lawyers. Once a lawyer is blocked, their
          profile will appear here.
        </p>
      </div>

    );
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Blocked Lawyers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.getBlockedLawyers.map((lawyer: any) => (
          <AdminCard key={lawyer.id} lawyer={lawyer} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default BlockedLawyersPage;
