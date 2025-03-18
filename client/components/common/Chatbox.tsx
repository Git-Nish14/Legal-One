"use client";
import { useState, useEffect, useRef } from "react";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_CHAT_BY_SESSION } from "@/graphql/queries";
import { SEND_MESSAGE } from "@/graphql/mutations";
import { NEW_MESSAGE_SUBSCRIPTION } from "@/graphql/subscriptions";
import { GET_SESSION_BY_ID } from "@/graphql/queries"; // Import session query
import ChatboxSkeleton from "../loading/ChatboxSkeleton";

interface ChatboxProps {
    sessionId: string;
}

export default function Chatbox({ sessionId }: ChatboxProps) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [isSending, setIsSending] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch session status
    const { data: sessionData } = useQuery(GET_SESSION_BY_ID, {
        variables: { sessionId },
    });

    const sessionStatus = sessionData?.getSessionById?.status;
    const isSessionCompleted = sessionStatus === "COMPLETED";

    // Fetch existing chat
    const { data, loading, error } = useQuery(GET_CHAT_BY_SESSION, {
        variables: { sessionId },
        fetchPolicy: "cache-and-network",
    });

    // Send Message Mutation
    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onCompleted: (data) => {
            setMessages((prev) => {
                const isDuplicate = prev.some((msg) => msg.id === data.sendMessage.id);
                if (isDuplicate) return prev;
                return [...prev, data.sendMessage];
            });
            scrollToBottom();
        },
    });

    // Subscribe to new messages
    useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
        variables: { chatId: data?.getChatBySession?.id },
        skip: !data?.getChatBySession?.id,
        onData: ({ data }) => {
            if (data.data?.newMessage) {
                setMessages((prev) => {
                    const isDuplicate = prev.some((msg) => msg.id === data.data.newMessage.id);
                    if (isDuplicate) return prev;
                    return [...prev, data.data.newMessage];
                });
                scrollToBottom();
            }
        },
    });

    useEffect(() => {
        if (data?.getChatBySession?.messages) {
            setMessages(data.getChatBySession.messages);
        }
        scrollToBottom();
    }, [data]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    if (loading) return <ChatboxSkeleton />;
    if (error) return <p>Error loading chat</p>;

    const chatId = data?.getChatBySession?.id;


    const handleSendMessage = async () => {
        if (!message.trim() || !chatId || isSending) return;

        setIsSending(true);
        await sendMessage({ variables: { chatId, content: message } });
        setMessage("");
        setIsSending(false);
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isSending) {
            handleSendMessage();
        }
    };


    return (
        <div className="w-96 h-[500px] flex flex-col border rounded-md bg-gray-100 shadow-md">
            {/* Chat Header */}
            <div className="bg-green-600 text-white py-2 px-4 text-lg font-semibold rounded-t-md">
                Chat
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-200">
                {messages.map((msg) => (
                    <div
                        key={msg.id || Math.random()}
                        className={`p-2 rounded-lg max-w-xs text-sm break-words w-fit ${msg.senderUser ? "bg-white text-black ml-auto rounded-br-none" : "bg-green-500 text-white mr-auto rounded-bl-none"}`}
                        style={{ maxWidth: "80%" }}
                    >
                        <strong className="text-xs block mb-1">
                            {msg.senderUser?.name || msg.senderLawyer?.name}
                        </strong>
                        {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Box - Disabled if session is completed */}
            {!isSessionCompleted && (
                <div className="flex items-center gap-2 p-3 bg-white border-t rounded-b-md">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 p-2 border rounded-full text-sm focus:outline-none"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className={`bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 ${isSending ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={isSending}
                    >
                        {isSending ? "Sending..." : "Send"}
                    </button>

                </div>
            )}
        </div>
    );
}
