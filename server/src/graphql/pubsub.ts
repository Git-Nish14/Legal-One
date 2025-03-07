import { createPubSub } from "graphql-yoga";
import { Message } from "../modules/models/Message";
import { Chat } from "../modules/models/Chat";

export const pubSub = createPubSub<{
    NEW_MESSAGE: [Message];
    NEW_CHAT: [Chat];
}>();
