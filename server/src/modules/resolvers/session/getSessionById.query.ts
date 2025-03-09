import { Resolver, Query, Ctx, Arg, Authorized } from "type-graphql";
import { Session } from "../../models/Session";
import { Context } from "../../../graphql/context";

@Resolver()
export class GetSessionByIdResolver {
  @Query(() => Session, { nullable: true })
  @Authorized("USER", "LAWYER", "ADMIN")
  async getSessionById(
    @Arg("sessionId") sessionId: string,
    @Ctx() { prisma, user }: Context
  ): Promise<Session | null> {
    if (!user) {
      throw new Error("Authentication required");
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true, lawyer: true, chat: true },
    });

    if (!session) {
      throw new Error("Session not found");
    }

    // Role-based access control
    if (
      user.role === "USER" && session.userId !== user.id ||
      user.role === "LAWYER" && session.lawyerId !== user.id
    ) {
      throw new Error("Unauthorized access");
    }

    return session as any as Session;
  }
}
