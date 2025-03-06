import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Session } from "../../models/Session";
import { Context } from "../../../graphql/context";
import { SessionStatus } from "../../models/enums/SessionStatus";

@Resolver()
export class UpdateUserCompletedResolver {
  @Mutation(() => Session)
  @Authorized("USER")
  async updateUserCompleted(
    @Arg("sessionId") sessionId: string,
    @Ctx() { prisma, user }: Context
  ): Promise<Session> {
    if (!user) {
      throw new Error("Authentication required");
    }

    // Fetch the session
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      throw new Error("Session not found");
    }

    // Ensure only the assigned user can update userCompleted
    if (session.userId !== user.id) {
      throw new Error("You are not authorized to update this session");
    }

    // Ensure userCompleted can only be updated once
    if (session.userCompleted) {
      throw new Error("User completion status can only be updated once");
    }

    // Update userCompleted to true
    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: {
        userCompleted: true,
        status: session.lawyerCompleted
          ? SessionStatus.COMPLETED
          : session.status, // If lawyerCompleted is also true, set status to COMPLETED
      },
      include: { user: true, lawyer: true, chat: true },
    });

    return updatedSession as any as Session;
  }
}
