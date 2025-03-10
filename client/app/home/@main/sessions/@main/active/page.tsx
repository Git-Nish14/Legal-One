"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import SessionCard from "@/components/common/SessionCard";
import { GET_ACTIVE_SESSIONS } from "@/graphql/queries";

export default function ActiveSessionsPage() {
  const { loading, error, data } = useQuery(GET_ACTIVE_SESSIONS);

  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

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
