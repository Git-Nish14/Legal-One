import { Resolver, Query, Arg, Subscription, Root, Ctx } from "type-graphql";
import { Chat } from "../../models/Chat";
import { pubSub } from "../../../graphql/pubsub";
import { Context } from "../../../graphql/context";

@Resolver(Chat)
export class ChatResolver {
  // Get chat by sessionId
  @Query(() => Chat, { nullable: true })
  async getChatBySession(
    @Arg("sessionId") sessionId: string,
    @Ctx() { prisma }: Context
  ): Promise<Chat | null> {
    return prisma.chat.findUnique({
      where: { sessionId },
      include: {
        messages: {
          include: {
            senderUser: { select: { id: true, name: true } }, // Include sender user
            senderLawyer: { select: { id: true, name: true } }, // Include sender lawyer
          },
        },
        user: { select: { id: true, name: true } },
        lawyer: { select: { id: true, name: true } },
      },
    }) as any as Chat;
  }

  // Subscribe to new chats
  @Subscription(() => Chat, {
    topics: "NEW_CHAT",
  })
  newChat(@Root() chat: Chat): Chat {
    return chat;
  }
}
