"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import SessionCard from "@/components/common/SessionCard";
import { GET_ACTIVE_SESSIONS } from "@/graphql/queries";
import SessionsPageSkeleton from "@/components/loading/SessionsPageSkeleton";

export default function ActiveSessionsPage() {
  const { loading, error, data } = useQuery(GET_ACTIVE_SESSIONS, {
    fetchPolicy: "network-only",
  });

  if (loading)
    return <SessionsPageSkeleton />;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  if (!data || data.getActiveSessions.length === 0) {
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
            d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-7-8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2h-4l-2-2H9L7 5H3a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h2 className="text-xl font-semibold">No Active Sessions</h2>
        <p className="text-gray-500 text-center max-w-sm mt-2">
          You currently have no active sessions. Once a session is Activate, it will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Active Sessions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.getActiveSessions.map((session: any) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
