"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import SessionCard from "@/components/common/SessionCard";
import { GET_REJECTED_SESSIONS } from "@/graphql/queries";

export default function RejectedSessionsPage() {
  const { loading, error, data } = useQuery(GET_REJECTED_SESSIONS, {
    fetchPolicy: "network-only",
  });

  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  if (!data || data.getRejectedSessions.length === 0) {
    return (
      <div className="text-center text-gray-700">No sessions available</div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Rejected Sessions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.getRejectedSessions.map((session: any) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
