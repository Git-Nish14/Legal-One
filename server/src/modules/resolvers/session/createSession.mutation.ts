import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Session } from "../../models/Session";
import { Context } from "../../../graphql/context";
import { SessionStatus } from "../../models/enums/SessionStatus";

@Resolver()
export class CreateSessionResolver {
  @Mutation(() => Session)
  @Authorized("USER")
  async createSession(
    @Arg("lawyerId") lawyerId: string,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Ctx() { prisma, user }: Context
  ): Promise<Session> {
    if (!user) {
      throw new Error("Authentication required");
    }

    // Check if the lawyer exists
    const lawyer = await prisma.lawyer.findUnique({ where: { id: lawyerId } });
    if (!lawyer) {
      throw new Error("Lawyer not found");
    }

    // Create the session with relations
    const session = await prisma.session.create({
      data: {
        user: { connect: { id: user.id } },
        lawyer: { connect: { id: lawyerId } },
        title,
        description,
        status: SessionStatus.PENDING,
        userCompleted: false,
        lawyerCompleted: false,
      },
      include: {
        user: true,
        lawyer: true,
        chat: true,
      },
    });

    return session as any as Session;
  }
}
