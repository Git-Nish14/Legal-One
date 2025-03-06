import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Lawyer } from "../../models/Lawyer";
import { Context } from "../../../graphql/context";
import { ApprovalStatus } from "../../models/enums/ApprovalStatus";

@Resolver()
export class UpdateLawyerStatusResolver {
  @Mutation(() => Lawyer)
  @Authorized("ADMIN")
  async updateLawyerStatus(
    @Arg("lawyerId") lawyerId: string,
    @Arg("status", () => ApprovalStatus) status: ApprovalStatus,
    @Ctx() { prisma, user }: Context
  ): Promise<Lawyer> {
    if (!user) {
      throw new Error("Authentication required");
    }

    // Fetch the lawyer
    const lawyer = await prisma.lawyer.findUnique({ where: { id: lawyerId } });
    if (!lawyer) {
      throw new Error("Lawyer not found");
    }

    // Update lawyer's approval status
    const updatedLawyer = await prisma.lawyer.update({
      where: { id: lawyerId },
      data: { approvalStatus: status },
    });

    return updatedLawyer as any as Lawyer;
  }
}
