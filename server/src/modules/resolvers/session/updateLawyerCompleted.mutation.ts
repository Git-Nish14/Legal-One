import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Session } from "../../models/Session";
import { Context } from "../../../graphql/context";
import { SessionStatus } from "../../models/enums/SessionStatus";

@Resolver()
export class UpdateLawyerCompletedResolver {
  @Mutation(() => Session)
  @Authorized("LAWYER")
  async updateLawyerCompleted(
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

    // Ensure only the assigned lawyer can update lawyerCompleted
    if (session.lawyerId !== user.id) {
      throw new Error("You are not authorized to update this session");
    }

    // Ensure lawyerCompleted can only be updated once
    if (session.lawyerCompleted) {
      throw new Error("Lawyer completion status can only be updated once");
    }

    // Update lawyerCompleted to true
    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: {
        lawyerCompleted: true,
        status: session.userCompleted
          ? SessionStatus.COMPLETED
          : session.status, // If userCompleted is also true, set status to COMPLETED
      },
      include: { user: true, lawyer: true, chat: true },
    });

    return updatedSession as any as Session;
  }
}
