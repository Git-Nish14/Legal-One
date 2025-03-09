import { Resolver, Query, Ctx } from "type-graphql";
import { Lawyer } from "../../models/Lawyer";
import { Context } from "../../../graphql/context";
import { ApprovalStatus } from "../../models/enums/ApprovalStatus";

@Resolver()
export class GetBlockedLawyersResolver {
    @Query(() => [Lawyer])
    async getBlockedLawyers(@Ctx() ctx: Context): Promise<Lawyer[]> {
        return ctx.prisma.lawyer.findMany({
            where: { approvalStatus: ApprovalStatus.BLOCKED },
            include: {
                sessions: true, // Include related sessions
                chats: true, // Include related chats
                messages: true, // Include related messages
            },
        }) as any as Lawyer[];
    }
}
