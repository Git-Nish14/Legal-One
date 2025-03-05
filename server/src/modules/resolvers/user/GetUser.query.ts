import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../models/User"; // Import the User type
import { Context } from "../../../graphql/context";

@Resolver()
export class GetUserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Ctx() ctx: Context) {
    // Check if user is authenticated
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    // Fetch user from the database
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
    });

    return user; // Return user data
  }
}
