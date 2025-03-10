"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { gql } from "@apollo/client";
import Image from "next/image";
import { GET_LAWYER_BY_ID } from "@/graphql/queries";
import Link from "next/link";

export default function Page() {
  const { id } = useParams() as { id: string };
  const { loading, error, data } = useQuery(GET_LAWYER_BY_ID, {
    variables: { lawyerId: id },
  });

  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  const lawyer = data.getLawyerById;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <Image
          src={lawyer.image}
          alt={lawyer.name}
          width={150}
          height={150}
          className="w-40 h-40 object-cover rounded-full mx-auto"
          unoptimized
        />
        <h1 className="text-2xl font-bold text-center mt-4">{lawyer.name}</h1>
        <p className="text-center text-gray-600">{lawyer.expertise}</p>
        <p className="text-gray-700 mt-4">{lawyer.bio}</p>
        <div className="mt-4">
          <p>
            <strong>Location:</strong> {lawyer.location}
          </p>
          <p>
            <strong>Description:</strong> {lawyer.description}
          </p>
          <p>
            <strong>Experience:</strong> {lawyer.experience} years
          </p>
          <p>
            <strong>Cases Handled:</strong> {lawyer.casesHandled}
          </p>
          <p>
            <strong>Fee:</strong> ${lawyer.fee}
          </p>
        </div>
      </div>
      <Link href={`/home/explore/lawyer/${id}/createSession`}>
        Book Session
      </Link>
    </div>
  );
}
