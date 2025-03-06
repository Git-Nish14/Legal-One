import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Session } from "../../models/Session";
import { Context } from "../../../graphql/context";
import { SessionStatus } from "../../models/enums/SessionStatus";

@Resolver()
export class UpdateSessionStatusResolver {
  @Mutation(() => Session)
  @Authorized("LAWYER")
  async updateSessionStatus(
    @Arg("sessionId") sessionId: string,
    @Arg("status", () => SessionStatus) status: SessionStatus,
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

    // Ensure only the assigned lawyer can update the status
    if (session.lawyerId !== user.id) {
      throw new Error("You are not authorized to update this session");
    }

    // Ensure status can only be updated once
    if (session.status !== SessionStatus.PENDING) {
      throw new Error("Session status can only be updated once");
    }

    // Update session status
    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: { status },
      include: { user: true, lawyer: true, chat: true },
    });

    // If status is set to ACTIVE, create a chat and connect relations
    if (status === SessionStatus.ACTIVE) {
      await prisma.chat.create({
        data: {
          session: { connect: { id: sessionId } },
          user: { connect: { id: session.userId } },
          lawyer: { connect: { id: user.id } },
        },
      });
    }

    return updatedSession as any as Session;
  }
}
