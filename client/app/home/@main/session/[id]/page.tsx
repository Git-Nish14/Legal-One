"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import Chatbox from "@/components/common/Chatbox";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { GET_DATA, GET_SESSION_BY_ID } from "@/graphql/queries";

// Import Mutations
import { UPDATE_USER_COMPLETED, UPDATE_LAWYER_COMPLETED } from "@/graphql/mutations";

export default function ChatPage() {
    const { id } = useParams() as { id: string };
    const sessionId = id;
    const router = useRouter();

    // Fetch Current User Data
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_DATA);

    // Fetch Session Data
    const { data: sessionData, loading: sessionLoading, error: sessionError, refetch } = useQuery(GET_SESSION_BY_ID, {
        variables: { sessionId },
        skip: !sessionId,
    });

    // Mutations for updating completion status
    const [updateUserCompleted, { loading: userCompleteLoading }] = useMutation(UPDATE_USER_COMPLETED, {
        variables: { sessionId },
        onCompleted: () => refetch(),
    });

    const [updateLawyerCompleted, { loading: lawyerCompleteLoading }] = useMutation(UPDATE_LAWYER_COMPLETED, {
        variables: { sessionId },
        onCompleted: () => refetch(),
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

    // Determine role-based details
    const isLawyer = currentUser?.role === "LAWYER";
    const isUser = currentUser?.role === "USER";
    const otherParty = isLawyer ? sessionUser : sessionLawyer;

    // Handle completion button click
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
                <button
                    className={`mt-4 px-4 py-2 rounded text-white ${session?.userCompleted && isUser || session?.lawyerCompleted && isLawyer
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    onClick={handleCompletion}
                    disabled={
                        (isUser && session?.userCompleted) || (isLawyer && session?.lawyerCompleted) || userCompleteLoading || lawyerCompleteLoading
                    }
                >
                    {userCompleteLoading || lawyerCompleteLoading ? "Processing..." : "Mark as Completed"}
                </button>
            </div>

            {/* Right Panel (Chatbox) */}
            <div className="w-1/2 flex justify-center items-center">
                <Chatbox sessionId={sessionId} />
            </div>
        </div>
    );
}
