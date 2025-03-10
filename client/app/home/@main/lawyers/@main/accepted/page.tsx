"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import AdminCard from "@/components/common/AdminCard";
import { GET_ACCEPTED_LAWYERS } from "@/graphql/queries";

const AcceptedLawyersPage: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_ACCEPTED_LAWYERS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || data.getAcceptedLawyers.length === 0)
    return <p className="text-center text-gray-500">No lawyers available</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Accepted Lawyers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.getAcceptedLawyers.map((lawyer: any) => (
          <AdminCard key={lawyer.id} lawyer={lawyer} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default AcceptedLawyersPage;
