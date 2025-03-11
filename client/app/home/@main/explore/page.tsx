"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import LawyerCard from "@/components/common/LawyerCard";
import { GET_ACCEPTED_LAWYERS } from "@/graphql/queries";

export default function ExplorePage() {
  const { loading, error, data } = useQuery(GET_ACCEPTED_LAWYERS);
  const [searchQuery, setSearchQuery] = useState("");

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 text-lg">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        Error: {error.message}
      </div>
    );

  // Filter lawyers based on search input
  const filteredLawyers = data.getAcceptedLawyers.filter((lawyer: any) =>
    `${lawyer.name} ${lawyer.expertise}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 ml-10">
      {/* Header Section with Search Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Explore Lawyers</h1>
        <input
          type="text"
          placeholder="Search by name or expertise..."
          className="w-80 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Lawyer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredLawyers.length > 0 ? (
          filteredLawyers.map((lawyer: any) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg col-span-full">
            No lawyers found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
