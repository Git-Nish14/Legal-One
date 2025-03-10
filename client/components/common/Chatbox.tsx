"use client";

import { useState, useEffect } from "react";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_CHAT_BY_SESSION } from "@/graphql/queries";
import { SEND_MESSAGE } from "@/graphql/mutations";
import { NEW_MESSAGE_SUBSCRIPTION } from "@/graphql/subscriptions";

interface ChatboxProps {
    sessionId: string;
}

export default function Chatbox({ sessionId }: ChatboxProps) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);

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
            }
        },
    });

    useEffect(() => {
        if (data?.getChatBySession?.messages) {
            setMessages(data.getChatBySession.messages);
        }
    }, [data]);


    if (loading) return <p>Loading chat...</p>;
    if (error) return <p>Error loading chat</p>;

    const chatId = data?.getChatBySession?.id;

    const handleSendMessage = async () => {
        if (!message.trim() || !chatId) return;
        await sendMessage({ variables: { chatId, content: message } });
        setMessage("");
    };

    return (
        <div className="p-4 border rounded-md w-96">
            <div className="h-64 overflow-y-auto border-b mb-2 p-2">
                {messages.map((msg) => (
                    <div key={msg.id || Math.random()} className="mb-1">
                        <strong>{msg.senderUser?.name || msg.senderLawyer?.name}:</strong>{" "}
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border p-1"
                    placeholder="Type a message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
