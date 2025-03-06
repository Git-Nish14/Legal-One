import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Context } from "../../../graphql/context";
import { AuthPayload } from "../../models/types/AuthPayload";

@Resolver()
export class SignInResolver {
  @Mutation(() => AuthPayload)
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<AuthPayload> {
    // Check across all three roles
    const user = await ctx.prisma.user.findUnique({ where: { email } });
    const lawyer = await ctx.prisma.lawyer.findUnique({ where: { email } });
    const admin = await ctx.prisma.admin.findUnique({ where: { email } });

    const account = user || lawyer || admin; // Find which role the email belongs to

    if (!account) {
      throw new Error("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, account.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: account.id, role: account.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return { token };
  }
}
