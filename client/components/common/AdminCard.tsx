"use client";

import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_LAWYER_STATUS } from "@/graphql/mutations";
import Image from "next/image";

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
    onCompleted: () => refetch(), // Refresh list after mutation
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
    <div className="bg-white rounded-2xl shadow-lg p-4 border max-w-sm">
      <div className="flex flex-col items-center">
        <Image
          src={lawyer.image || "/default-avatar.png"}
          alt={lawyer.name}
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <h2 className="text-lg font-bold text-gray-900 mt-2">{lawyer.name}</h2>
        <p className="text-gray-600 text-sm">{lawyer.expertise}</p>
        <p className="text-gray-500 text-xs">Location: {lawyer.location}</p>
        <p className="text-gray-500 text-xs">
          Experience: {lawyer.experience} years
        </p>
        <p className="text-gray-500 text-xs">
          Cases Handled: {lawyer.casesHandled}
        </p>
        <p className="text-gray-500 text-xs">Fee: ${lawyer.fee}</p>
      </div>

      {/* Action Buttons based on approvalStatus */}
      <div className="mt-4 flex gap-2">
        {lawyer.approvalStatus === "PENDING" && (
          <>
            <button
              onClick={() => handleStatusUpdate("ACCEPTED")}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "Accept"}
            </button>
            <button
              onClick={() => handleStatusUpdate("BLOCKED")}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "Reject"}
            </button>
          </>
        )}
        {lawyer.approvalStatus === "ACCEPTED" && (
          <button
            onClick={() => handleStatusUpdate("BLOCKED")}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Block"}
          </button>
        )}
        {lawyer.approvalStatus === "BLOCKED" && (
          <button
            onClick={() => handleStatusUpdate("ACCEPTED")}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Accept"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminCard;
