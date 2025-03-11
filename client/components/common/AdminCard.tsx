"use client";

import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_LAWYER_STATUS } from "@/graphql/mutations";
import Image from "next/image";
import { Check, X } from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  image: string;
  bio: string;
  expertise: string;
  location: string;
  description: string;
  approvalStatus: "PENDING" | "ACCEPTED" | "BLOCKED";
  experience: number;
  fee: number;
  casesHandled: number;
  createdAt: string;
}

const AdminCard: React.FC<{ lawyer: Lawyer; refetch: () => void }> = ({
  lawyer,
  refetch,
}) => {
  const [updateLawyerStatus, { loading }] = useMutation(UPDATE_LAWYER_STATUS, {
    onCompleted: () => refetch(),
  });

  const handleStatusUpdate = async (status: "ACCEPTED" | "BLOCKED") => {
    try {
      await updateLawyerStatus({
        variables: { status, lawyerId: lawyer.id },
      });
    } catch (err) {
      console.error("Error updating lawyer status:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-5 flex flex-col h-[350px] w-full max-w-sm transition-all hover:shadow-xl">
      {/* Lawyer Info */}
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-900">{lawyer.name}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {lawyer.description}
        </p>

        <div className="text-gray-500 text-xs mt-2 space-y-1">
          <p>📅 Joined: {new Date(lawyer.createdAt).toLocaleDateString()}</p>
          <p>✔ Experience: {lawyer.experience} years</p>
          <p>✔ Cases Handled: {lawyer.casesHandled}</p>
          <p>💰 Fee: ${lawyer.fee}</p>
        </div>

        {/* Lawyer Image & Expertise */}
        <div className="flex items-center gap-3 mt-4">
          <Image
            src={lawyer.image || "/default-avatar.png"}
            alt={lawyer.name}
            width={90}
            height={90}
            className="rounded-full object-cover aspect-square"
          />
          <div>
            <p className="text-gray-900 font-medium">{lawyer.expertise}</p>
            <p className="text-gray-500 text-xs">{lawyer.location}</p>
          </div>
        </div>
      </div>

      {/* Buttons Section (Always at Bottom) */}
      <div className="mt-auto space-y-2">
        {lawyer.approvalStatus === "PENDING" && (
          <div className="flex gap-2">
            <button
              onClick={() => handleStatusUpdate("ACCEPTED")}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              disabled={loading}
            >
              <Check size={18} />
              {loading ? "Processing..." : "Accept"}
            </button>
            <button
              onClick={() => handleStatusUpdate("BLOCKED")}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              disabled={loading}
            >
              <X size={18} />
              {loading ? "Processing..." : "Reject"}
            </button>
          </div>
        )}
        {lawyer.approvalStatus === "ACCEPTED" && (
          <button
            onClick={() => handleStatusUpdate("BLOCKED")}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            disabled={loading}
          >
            <X size={18} />
            {loading ? "Processing..." : "Block"}
          </button>
        )}
        {lawyer.approvalStatus === "BLOCKED" && (
          <button
            onClick={() => handleStatusUpdate("ACCEPTED")}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            disabled={loading}
          >
            <Check size={18} />
            {loading ? "Processing..." : "Accept"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminCard;
