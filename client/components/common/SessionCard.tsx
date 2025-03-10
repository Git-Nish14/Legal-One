"use client";

import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import { UPDATE_SESSION_STATUS } from "@/graphql/mutations";
import Link from "next/link";
import Image from "next/image";

interface Session {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  lawyerCompleted: boolean;
  userCompleted: boolean;
  user: { id: string; name: string };
  lawyer: { image: string; expertise: string; id: string; name: string };
}

const SessionCard: React.FC<{ session: Session }> = ({ session }) => {
  const { data, loading, error } = useQuery(GET_DATA, {
    fetchPolicy: "network-only",
  });

  const [updateSessionStatus, { loading: updating }] = useMutation(
    UPDATE_SESSION_STATUS,
    {
      refetchQueries: [{ query: GET_DATA }],
    }
  );

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">Error loading user data</p>;

  const user = data?.getData;
  const userRole = user?.role || "GUEST";

  const handleUpdateStatus = async (status: "ACTIVE" | "REJECTED") => {
    try {
      await updateSessionStatus({
        variables: { status, sessionId: session.id },
      });
    } catch (err) {
      console.error("Error updating session status:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border p-4 max-w-sm">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{session.title}</h2>
        <p className="text-gray-600 text-sm mt-1">{session.description}</p>
        <p className="text-gray-500 text-xs mt-1">
          Created: {new Date(session.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Lawyer Completed: {session.lawyerCompleted ? "Yes" : "No"}
        </p>
        <p className="text-gray-500 text-xs">
          User Completed: {session.userCompleted ? "Yes" : "No"}
        </p>

        <div className="flex items-center mt-4">
          {userRole === "USER" ? (
            <>
              <Image
                src={session.lawyer.image || "/default-avatar.png"}
                alt={session.lawyer.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="text-gray-900 font-semibold">
                  {session.lawyer.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {session.lawyer.expertise || "Expertise not specified"}
                </p>
              </div>
            </>
          ) : userRole === "LAWYER" ? (
            <p className="text-gray-900 font-semibold">
              User: {session.user.name}
            </p>
          ) : null}
        </div>

        {/* Buttons for LAWYER if session is PENDING */}
        {userRole === "LAWYER" && session.status === "PENDING" && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleUpdateStatus("ACTIVE")}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              disabled={updating}
            >
              {updating ? "Processing..." : "Accept"}
            </button>
            <button
              onClick={() => handleUpdateStatus("REJECTED")}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              disabled={updating}
            >
              {updating ? "Processing..." : "Reject"}
            </button>
          </div>
        )}

        {/* View Details Button */}
        {(userRole === "USER" || userRole === "LAWYER") &&
          (session.status === "ACTIVE" || session.status === "COMPLETED") && (
            <Link href={`/home/session/${session.id}`} passHref>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mt-4">
                View Details
              </button>
            </Link>
          )}
      </div>
    </div>
  );
};

export default SessionCard;
