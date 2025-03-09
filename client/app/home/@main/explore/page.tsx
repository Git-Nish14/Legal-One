'use client';

import React from "react";
import { useQuery } from "@apollo/client";
import LawyerCard from "@/components/common/LawyerCard";
import { GET_ACCEPTED_LAWYERS } from "@/graphql/queries";

export default function ExplorePage() {
    const { loading, error, data } = useQuery(GET_ACCEPTED_LAWYERS);

    if (loading) return <div className="text-center text-gray-700">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Explore Lawyers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.getAcceptedLawyers.map((lawyer: any) => (
                    <LawyerCard key={lawyer.id} lawyer={lawyer} />
                ))}
            </div>
        </div>
    );
}
