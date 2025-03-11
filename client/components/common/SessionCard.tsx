"use client";

import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import { UPDATE_SESSION_STATUS } from "@/graphql/mutations";
import Link from "next/link";
import Image from "next/image";
import { Check, X, ArrowRight } from "lucide-react";

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
    <div className="bg-white rounded-2xl shadow-lg border p-5 flex flex-col h-[280px] w-full max-w-sm transition-all hover:shadow-xl">
      {/* Session Info */}
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-900">{session.title}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {session.description}
        </p>

        <div className="text-gray-500 text-xs mt-2 space-y-1">
          <p>📅 Created: {new Date(session.createdAt).toLocaleDateString()}</p>
          <p>✔ Lawyer: {session.lawyerCompleted ? "Completed" : "Pending"}</p>
          <p>✔ User: {session.userCompleted ? "Completed" : "Pending"}</p>
        </div>

        {/* User & Lawyer Info */}
        <div className="flex items-center gap-3 mt-4">
          {userRole === "USER" ? (
            <>
              <Image
                src={session.lawyer.image || "/default-avatar.png"}
                alt={session.lawyer.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-gray-900 font-medium">
                  {session.lawyer.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {session.lawyer.expertise || "Expertise not specified"}
                </p>
              </div>
            </>
          ) : userRole === "LAWYER" ? (
            <p className="text-gray-900 font-medium">
              User: {session.user.name}
            </p>
          ) : null}
        </div>
      </div>

      {/* Buttons Section (Always at Bottom) */}
      <div className="mt-auto space-y-2">
        {userRole === "LAWYER" && session.status === "PENDING" && (
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdateStatus("ACTIVE")}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              disabled={updating}
            >
              <Check size={18} />
              {updating ? "Accepting" : "Accept"}
            </button>
            <button
              onClick={() => handleUpdateStatus("REJECTED")}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              disabled={updating}
            >
              <X size={18} />
              {updating ? "Rejecting" : "Reject"}
            </button>
          </div>
        )}

        {(userRole === "USER" || userRole === "LAWYER") &&
          (session.status === "ACTIVE" || session.status === "COMPLETED") && (
            <Link href={`/home/session/${session.id}`} passHref>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                <ArrowRight size={18} />
                View Details
              </button>
            </Link>
          )}
      </div>
    </div>
  );
};

export default SessionCard;
