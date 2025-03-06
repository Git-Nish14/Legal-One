import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../models/User";
import { Context } from "../../../graphql/context";

@Resolver()
export class GetLawyerResolver {
  @Query(() => User, { nullable: true })
  async getLawyer(@Ctx() ctx: Context): Promise<User | null> {
    // Check if user is authenticated
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    // Fetch user from the database
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
      include: {
        sessions: true, // Include related sessions
        chats: true, // Include related chats
        messages: true, // Include related messages
      },
    });
    if (!user) {
      return null; // Return null if user is not found
    }
    return user as any as User; // Return user data
  }
}
