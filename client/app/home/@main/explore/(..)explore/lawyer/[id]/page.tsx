"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { GET_LAWYER_BY_ID } from "@/graphql/queries";
import Image from "next/image";

export default function LawyerDetailModal() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const { loading, error, data } = useQuery(GET_LAWYER_BY_ID, { variables: { lawyerId: id } });

    if (loading) return <div className="text-center text-gray-700">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    const lawyer = data.getLawyerById;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => router.back()}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative transition-transform transform scale-100 hover:scale-105"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                    onClick={() => router.back()}
                >
                    ✖
                </button>

                <Image
                    src={lawyer.image}
                    alt={lawyer.name}
                    width={150}
                    height={150}
                    className="w-40 h-40 object-cover rounded-full mx-auto shadow-md border"
                    unoptimized
                />
                <h1 className="text-2xl font-bold text-center mt-4 text-gray-900">{lawyer.name}</h1>
                <p className="text-center text-gray-500">{lawyer.expertise}</p>
                <p className="text-gray-700 mt-4 text-center px-4">{lawyer.bio}</p>
                <div className="mt-4 text-sm text-gray-600 px-4 space-y-2">
                    <p><strong>📍 Location:</strong> {lawyer.location}</p>
                    <p><strong>📜 Description:</strong> {lawyer.description}</p>
                    <p><strong>🏆 Experience:</strong> {lawyer.experience} years</p>
                    <p><strong>⚖️ Cases Handled:</strong> {lawyer.casesHandled}</p>
                    <p><strong>💰 Fee:</strong> ${lawyer.fee}</p>
                </div>
            </div>
        </div>
    );
}