import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Subscription,
  Root,
  Authorized,
} from "type-graphql";
import { Message } from "../../models/Message";
import { pubSub } from "../../../graphql/pubsub";
import { Context } from "../../../graphql/context";

@Resolver(Message)
export class MessageResolver {
  // Mutation to send a new message (User or Lawyer)
  @Mutation(() => Message)
  @Authorized(["USER", "LAWYER"]) // Ensures only users and lawyers can send messages
  async sendMessage(
    @Arg("chatId") chatId: string,
    @Arg("content") content: string,
    @Ctx() { prisma, user }: Context
  ): Promise<Message> {
    if (!user) {
      throw new Error("Authentication required");
    }

    // Validate chat existence
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { user: true, lawyer: true },
    });

    if (!chat) {
      throw new Error("Chat not found");
    }

    // Ensure only participants (user or lawyer in chat) can send messages
    if (chat.user.id !== user.id && chat.lawyer.id !== user.id) {
      throw new Error("You are not authorized to send messages in this chat");
    }

    // Determine sender type and connect accordingly
    const messageData: any = {
      chat: { connect: { id: chatId } },
      content,
    };

    if (user.role === "USER") {
      messageData.senderUser = { connect: { id: user.id } };
    } else if (user.role === "LAWYER") {
      messageData.senderLawyer = { connect: { id: user.id } };
    }

    const message = await prisma.message.create({
      data: messageData,
      include: { chat: true, senderUser: true, senderLawyer: true },
    });
    console.log("Publishing message to subscription:", message);

    // Publish the new message event for real-time updates
    await pubSub.publish("NEW_MESSAGE", message as any as Message);

    return message as any as Message;
  }

  // Subscription to listen for new messages in a chat (for both users and lawyers)
  @Subscription(() => Message, {
    topics: "NEW_MESSAGE",
    filter: ({ payload, args }) => payload.chatId === args.chatId,
  })
  newMessage(@Root() message: Message, @Arg("chatId") chatId: string): Message {
    console.log("New message received in subscription:", message);
    return message;
  }
}
