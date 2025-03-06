import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Context } from "../../../graphql/context";
import { AuthPayload } from "../../models/types/AuthPayload";
import { Lawyer } from "../../models/Lawyer";
import { Role } from "../../models/enums/Role";
import { ApprovalStatus } from "../../models/enums/ApprovalStatus";

@Resolver()
export class CreateLawyerResolver {
  @Mutation(() => AuthPayload)
  async createLawyer(
    @Ctx() ctx: Context,
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("fee") fee: number, // Required parameter comes before optional ones
    @Arg("experience", () => Number) experience?: number,
    @Arg("expertise", () => String) expertise?: string,
    @Arg("location", () => String) location?: string,
    @Arg("bio", () => String) bio?: string,
    @Arg("description", () => String) description?: string
  ): Promise<AuthPayload> {
    const existingUser = await ctx.prisma.lawyer.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newLawyer = await ctx.prisma.lawyer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        fee,
        experience,
        expertise,
        location,
        bio,
        description,
        role: Role.LAWYER,
        approvalStatus: ApprovalStatus.PENDING,
        casesHandled: 0,
      },
    });

    const token = jwt.sign(
      { id: newLawyer.id, role: newLawyer.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return { token };
  }
}
