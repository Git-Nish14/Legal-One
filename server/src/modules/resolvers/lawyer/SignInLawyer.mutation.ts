import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Context } from "../../../graphql/context";
import { AuthPayload } from "../../models/types/AuthPayload";
import { Lawyer } from "../../models/Lawyer";

@Resolver()
export class SignInLawyerResolver {
  @Mutation(() => AuthPayload)
  async signInLawyer(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<AuthPayload> {
    const lawyer = await ctx.prisma.lawyer.findUnique({ where: { email } });
    if (!lawyer) {
      throw new Error("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, lawyer.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: lawyer.id, role: lawyer.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return { token };
  }
}
