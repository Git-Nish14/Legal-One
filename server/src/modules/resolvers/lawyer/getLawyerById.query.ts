import { Resolver, Query, Arg, Ctx, Authorized } from "type-graphql";
import { Lawyer } from "../../models/Lawyer";
import { Context } from "../../../graphql/context";

@Resolver()
export class GetLawyerByIdResolver {
    @Query(() => Lawyer, { nullable: true })
    @Authorized("ADMIN", "LAWYER", "USER") // Ensure role-based access control
    async getLawyerById(
        @Arg("lawyerId") lawyerId: string,
        @Ctx() ctx: Context
    ): Promise<Lawyer | null> {
        if (!ctx.user) {
            throw new Error("Not authenticated");
        }

        const lawyer = await ctx.prisma.lawyer.findUnique({
            where: { id: lawyerId },
            include: {
                sessions: true, // Include related sessions
                chats: true, // Include related chats
                messages: true, // Include related messages
            },
        });

        if (!lawyer) {
            throw new Error("Lawyer not found");
        }

        return lawyer as any as Lawyer;
    }
}
