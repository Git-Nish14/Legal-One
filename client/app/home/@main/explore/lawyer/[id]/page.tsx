"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Briefcase, Scale, DollarSign, ArrowLeft } from "lucide-react";
import { GET_LAWYER_BY_ID } from "@/graphql/queries";
import Link from "next/link";
import ProfilePageSkeleton from "@/components/loading/ProfilePageSkeleton";

export default function ProfilePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_LAWYER_BY_ID, {
    variables: { lawyerId: id },
  });

  if (loading)
    return <ProfilePageSkeleton />
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  const lawyer = data.getLawyerById;

  return (
    <div className="min-h-screen flex bg-gray-100 ml-10 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 right-10 flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md shadow hover:bg-gray-300 transition duration-200"
      >
        <ArrowLeft size={20} className="text-gray-700" />
        <span className="text-gray-700 font-medium">Back</span>
      </button>

      {/* Left Section - Lawyer Image */}
      <div className="w-1/3 bg-yellow-400 flex justify-center items-center p-10 rounded-2xl">
        <Image
          src={lawyer.image}
          alt={lawyer.name}
          width={300}
          height={300}
          className="rounded-full object-cover w-64 h-64 border-8 border-white shadow-lg"
          unoptimized
        />
      </div>

      {/* Right Section - Lawyer Details */}
      <div className="w-2/3 p-16 bg-white shadow-md flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold text-gray-900">{lawyer.name}</h1>
        <p className="text-xl text-gray-600 font-medium">{lawyer.expertise}</p>

        {/* Lawyer Information with Icons */}
        <div className="mt-6 space-y-4 text-lg text-gray-700">
          <p className="flex items-center gap-3">
            <MapPin className="text-blue-600" size={22} />
            <strong>Location:</strong>{" "}
            <span className="text-gray-800">{lawyer.location}</span>
          </p>
          <p className="flex items-center gap-3">
            <Briefcase className="text-green-600" size={22} />
            <strong>Experience:</strong>{" "}
            <span className="text-gray-800">{lawyer.experience} years</span>
          </p>
          <p className="flex items-center gap-3">
            <Scale className="text-purple-600" size={22} />
            <strong>Cases Handled:</strong>{" "}
            <span className="text-gray-800">{lawyer.casesHandled}</span>
          </p>
          <p className="flex items-center gap-3">
            <DollarSign className="text-yellow-600" size={22} />
            <strong>Fee:</strong>{" "}
            <span className="text-gray-800">${lawyer.fee}</span>
          </p>
        </div>

        {/* Description */}
        <p className="mt-6 text-lg text-gray-800 leading-relaxed">
          <strong>Description:</strong> {lawyer.description}
        </p>

        {/* Book Session Button */}
        <Link
          href={`/home/explore/lawyer/${id}/createSession`}
          className="mt-10 inline-block text-center bg-gray-900 text-white px-8 py-4 rounded-md text-xl font-semibold hover:bg-blue-500 transition duration-200 shadow-md"
        >
          Book Session
        </Link>
      </div>
    </div>
  );
}
