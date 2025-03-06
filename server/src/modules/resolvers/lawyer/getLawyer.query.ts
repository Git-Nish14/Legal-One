import { Resolver, Query, Ctx } from "type-graphql";
import { Lawyer } from "../../models/Lawyer";
import { Context } from "../../../graphql/context";

@Resolver()
export class GetLawyerResolver {
  @Query(() => Lawyer, { nullable: true })
  async getLawyer(@Ctx() ctx: Context): Promise<Lawyer | null> {
    // Check if user is authenticated
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    // Fetch lawyer from the database
    const lawyer = await ctx.prisma.lawyer.findUnique({
      where: { id: ctx.user.id },
      include: {
        sessions: true, // Include related sessions
        chats: true, // Include related chats
        messages: true, // Include related messages
      },
    });
    if (!lawyer) {
      return null; // Return null if lawyer is not found
    }
    return lawyer as any as Lawyer;
  }
}
