import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../models/User";
import { Context } from "../../../graphql/context";

@Resolver()
export class GetLawyersResolver {
  @Query(() => [User])
  async getLawyers(@Ctx() ctx: Context): Promise<User[]> {
    return ctx.prisma.user.findMany({
      include: {
        sessions: true, // Include related sessions
        chats: true, // Include related chats
        messages: true, // Include related messages
      },
    }) as any as User[];
  }
}
