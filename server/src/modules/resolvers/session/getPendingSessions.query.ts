import { Resolver, Query, Ctx, Authorized } from "type-graphql";
import { Session } from "../../models/Session";
import { Context } from "../../../graphql/context";

@Resolver()
export class GetPendingSessionsResolver {
  @Query(() => [Session])
  @Authorized("USER", "LAWYER")
  async getPendingSessions(
    @Ctx() { prisma, user }: Context
  ): Promise<Session[]> {
    if (!user) {
      throw new Error("Authentication required");
    }

    let activeSessions;
    if (user.role === "USER") {
      activeSessions = await prisma.session.findMany({
        where: { userId: user.id, status: "PENDING" },
        include: { user: true, lawyer: true, chat: true },
      });
    } else if (user.role === "LAWYER") {
      activeSessions = await prisma.session.findMany({
        where: { lawyerId: user.id, status: "PENDING" },
        include: { user: true, lawyer: true, chat: true },
      });
    } else {
      activeSessions = await prisma.session.findMany({
        where: { status: "PENDING" },
        include: { user: true, lawyer: true, chat: true },
      });
    }

    return activeSessions as any as Session[];
  }
}
