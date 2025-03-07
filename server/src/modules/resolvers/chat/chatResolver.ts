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
      include: { messages: true, user: true, lawyer: true },
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
