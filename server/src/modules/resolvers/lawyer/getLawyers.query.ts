import { Resolver, Query, Ctx } from "type-graphql";
import { Lawyer } from "../../models/Lawyer";
import { Context } from "../../../graphql/context";

@Resolver()
export class GetLawyersResolver {
  @Query(() => [Lawyer])
  async getLawyers(@Ctx() ctx: Context): Promise<Lawyer[]> {
    return ctx.prisma.lawyer.findMany({
      include: {
        sessions: true, // Include related sessions
        chats: true, // Include related chats
        messages: true, // Include related messages
      },
    }) as any as Lawyer[];
  }
}