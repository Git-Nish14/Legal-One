"use client";

import { gql, useQuery } from "@apollo/client";
import Chatbox from "@/components/common/Chatbox";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { GET_DATA, GET_SESSION_BY_ID } from "@/graphql/queries";

export default function ChatPage() {
    const { id } = useParams() as { id: string };
    const sessionId = id;
    const router = useRouter();

    // Fetch Current User Data
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_DATA);

    // Fetch Session Data
    const { data: sessionData, loading: sessionLoading, error: sessionError } = useQuery(GET_SESSION_BY_ID, {
        variables: { sessionId },
        skip: !sessionId,
    });

    if (!sessionId) return <p>Session ID is required</p>;
    if (userLoading || sessionLoading) return <p>Loading...</p>;
    if (userError) return <p>Error loading user: {userError.message}</p>;
    if (sessionError) return <p>Error loading session: {sessionError.message}</p>;

    const session = sessionData?.getSessionById;
    const currentUser = userData?.getData;

    // Extract session participants
    const sessionUser = session?.user;
    const sessionLawyer = session?.lawyer;

    // Restrict Access - Only Allow Users & Lawyers in the Session
    if (
        currentUser?.role !== "ADMIN" && // Admins shouldn't have access
        sessionUser?.id !== currentUser?.id &&
        sessionLawyer?.id !== currentUser?.id
    ) {
        return <p className="text-red-500 text-center mt-10">Access Denied: You are not part of this session.</p>;
    }

    // Determine which details to show based on role
    const isLawyer = currentUser?.role === "LAWYER";
    const isUser = currentUser?.role === "USER";
    const otherParty = isLawyer ? sessionUser : sessionLawyer;

    return (
        <div className="flex h-screen">
            {/* Left Panel */}
            <div className="w-1/2 p-6 border-r border-gray-300">
                {/* Other Party Details */}
                {otherParty && (
                    <div className="flex items-center space-x-4 mb-6">
                        {otherParty.image && (
                            <Image
                                src={otherParty.image}
                                alt={otherParty.name}
                                width={60}
                                height={60}
                                className="rounded-full"
                            />
                        )}
                        <div>
                            <h2 className="text-lg font-semibold">{otherParty.name}</h2>
                            {isLawyer && <p className="text-gray-600">Client</p>}
                            {isUser && <p className="text-gray-600">{otherParty.expertise}</p>}
                        </div>
                    </div>
                )}

                {/* Session Details */}
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">{session?.title}</h3>
                    <p className="text-gray-700">{session?.description}</p>
                </div>

                {/* Completion Status */}
                <div className="mb-4">
                    <p className="text-gray-800">
                        <strong>User Completed:</strong> {session?.userCompleted ? "Yes" : "No"}
                    </p>
                    <p className="text-gray-800">
                        <strong>Lawyer Completed:</strong> {session?.lawyerCompleted ? "Yes" : "No"}
                    </p>
                </div>

                {/* Complete Button */}
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Mark as Completed
                </button>
            </div>

            {/* Right Panel (Chatbox) */}
            <div className="w-1/2 flex justify-center items-center">
                <Chatbox sessionId={sessionId} />
            </div>
        </div>
    );
}
