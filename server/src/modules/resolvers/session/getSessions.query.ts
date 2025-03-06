import { Resolver, Query, Ctx, Authorized } from "type-graphql";
import { Session } from "../../models/Session";
import { Context } from "../../../graphql/context";

@Resolver()
export class GetSessionsResolver {
  @Query(() => [Session])
  @Authorized("USER", "LAWYER", "ADMIN")
  async getSessions(@Ctx() { prisma, user }: Context): Promise<Session[]> {
    if (!user) {
      throw new Error("Authentication required");
    }

    let sessions;
    if (user.role === "USER") {
      sessions = await prisma.session.findMany({
        where: { userId: user.id },
        include: { user: true, lawyer: true, chat: true },
      });
    } else if (user.role === "LAWYER") {
      sessions = await prisma.session.findMany({
        where: { lawyerId: user.id },
        include: { user: true, lawyer: true, chat: true },
      });
    } else {
      sessions = await prisma.session.findMany({
        include: { user: true, lawyer: true, chat: true },
      });
    }

    return sessions as any as Session[];
  }
}
