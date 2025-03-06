import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Lawyer } from "../../models/Lawyer";
import { Context } from "../../../graphql/context";

@Resolver()
export class UpdateLawyerProfileResolver {
  @Mutation(() => Lawyer)
  @Authorized("LAWYER")
  async updateLawyerProfile(
    @Ctx() { prisma, user }: Context,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("fee", { nullable: true }) fee?: number,
    @Arg("experience", { nullable: true }) experience?: number,
    @Arg("expertise", { nullable: true }) expertise?: string,
    @Arg("location", { nullable: true }) location?: string,
    @Arg("bio", { nullable: true }) bio?: string,
    @Arg("description", { nullable: true }) description?: string,
    @Arg("casesHandled", { nullable: true }) casesHandled?: number
  ): Promise<Lawyer> {
    if (!user) {
      throw new Error("Authentication required");
    }

    // Ensure the user is a lawyer
    if (user.role !== "LAWYER") {
      throw new Error("You are not authorized to update this profile");
    }

    // Prepare update data dynamically
    const updateData: Record<string, any> = {};
    if (name !== undefined) updateData.name = name;
    if (fee !== undefined) updateData.fee = fee;
    if (experience !== undefined) updateData.experience = experience;
    if (expertise !== undefined) updateData.expertise = expertise;
    if (location !== undefined) updateData.location = location;
    if (bio !== undefined) updateData.bio = bio;
    if (description !== undefined) updateData.description = description;
    if (casesHandled !== undefined) updateData.casesHandled = casesHandled;

    // Update timestamp only if at least one field is changed
    if (Object.keys(updateData).length > 0) {
      updateData.updatedAt = new Date();
    }

    // Update the lawyer's profile
    const updatedLawyer = await prisma.lawyer.update({
      where: { id: user.id },
      data: updateData,
    });

    return updatedLawyer as any as Lawyer;
  }
}
