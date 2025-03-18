"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import Chatbox from "@/components/common/Chatbox";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { GET_DATA, GET_SESSION_BY_ID } from "@/graphql/queries";
import {
  UPDATE_USER_COMPLETED,
  UPDATE_LAWYER_COMPLETED,
} from "@/graphql/mutations";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import ChatPageSkeleton from "@/components/loading/ChatPageSkeleton";

export default function ChatPage() {
  const { id } = useParams() as { id: string };
  const sessionId = id;
  const router = useRouter();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_DATA);
  const {
    data: sessionData,
    loading: sessionLoading,
    error: sessionError,
    refetch,
  } = useQuery(GET_SESSION_BY_ID, {
    variables: { sessionId },
    skip: !sessionId,
  });

  const [updateUserCompleted, { loading: userCompleteLoading }] = useMutation(
    UPDATE_USER_COMPLETED,
    {
      variables: { sessionId },
      onCompleted: () => refetch(),
    }
  );

  const [updateLawyerCompleted, { loading: lawyerCompleteLoading }] =
    useMutation(UPDATE_LAWYER_COMPLETED, {
      variables: { sessionId },
      onCompleted: () => refetch(),
    });

  if (!sessionId)
    return (
      <p className="text-center text-red-500 font-semibold">
        Session ID is required
      </p>
    );
  if (userLoading || sessionLoading) return <ChatPageSkeleton />;
  if (userError)
    return <p className="text-red-500 text-center">Error: {userError.message}</p>;
  if (sessionError)
    return (
      <p className="text-red-500 text-center">Error: {sessionError.message}</p>
    );

  const session = sessionData?.getSessionById;
  const currentUser = userData?.getData;
  const sessionUser = session?.user;
  const sessionLawyer = session?.lawyer;

  if (
    currentUser?.role !== "ADMIN" &&
    sessionUser?.id !== currentUser?.id &&
    sessionLawyer?.id !== currentUser?.id
  ) {
    return (
      <p className="text-red-500 text-center mt-10 text-lg font-medium">
        Access Denied: You are not part of this session.
      </p>
    );
  }

  const isLawyer = currentUser?.role === "LAWYER";
  const isUser = currentUser?.role === "USER";
  const otherParty = isLawyer ? sessionUser : sessionLawyer;

  const handleCompletion = async () => {
    const confirm = window.confirm("Are you sure? This action cannot be undone.");
    if (!confirm) return;

    if (isUser) {
      await updateUserCompleted();
    } else if (isLawyer) {
      await updateLawyerCompleted();
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 md:p-10">
      {/* Back Button */}
      <button
        className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-md w-fit mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft size={24} />
        <span className="text-lg font-semibold">Back</span>
      </button>

      {/* Session Info */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 flex-grow">
        {/* Left Section (User & Session Info) */}
        <div className="flex flex-col w-full md:w-1/2 space-y-6">
          {otherParty && (
            <div className="flex flex-col items-center text-center">
              {otherParty.image && (
                <Image
                  src={otherParty.image}
                  alt={otherParty.name}
                  width={150}
                  height={150}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-gray-300 shadow-lg object-cover"
                />
              )}
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mt-4">
                {otherParty.name}
              </h2>
              <p className="text-gray-600 text-base md:text-lg">
                {isLawyer ? "Client" : otherParty.expertise}
              </p>
            </div>
          )}

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {session?.title}
            </h3>
            <p className="text-gray-700 text-base md:text-lg mt-2">
              {session?.description}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-gray-800 flex items-center gap-2 text-lg">
              <strong>User Completed:</strong>
              {session?.userCompleted ? (
                <CheckCircle className="text-green-500" size={24} />
              ) : (
                <XCircle className="text-red-500" size={24} />
              )}
            </p>
            <p className="text-gray-800 flex items-center gap-2 text-lg">
              <strong>Lawyer Completed:</strong>
              {session?.lawyerCompleted ? (
                <CheckCircle className="text-green-500" size={24} />
              ) : (
                <XCircle className="text-red-500" size={24} />
              )}
            </p>
          </div>

          {/* Completion Button */}
          <button
            className={`mt-6 py-3 rounded-lg text-white font-semibold transition-all text-center text-lg md:text-xl ${(session?.userCompleted && isUser) ||
              (session?.lawyerCompleted && isLawyer)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-900 hover:bg-blue-500"
              }`}
            onClick={handleCompletion}
            disabled={
              (isUser && session?.userCompleted) ||
              (isLawyer && session?.lawyerCompleted) ||
              userCompleteLoading ||
              lawyerCompleteLoading
            }
          >
            {userCompleteLoading || lawyerCompleteLoading
              ? "Processing..."
              : "Mark as Completed"}
          </button>
        </div>

        {/* Right Section (Chatbox) */}
        <div className="w-full mb-4 md:w-1/2 flex justify-center items-center">
          <Chatbox sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
}