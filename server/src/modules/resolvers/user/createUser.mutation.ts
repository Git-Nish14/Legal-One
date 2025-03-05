import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Context } from "../../../graphql/context";
import { AuthPayload } from "../../models/types/AuthPayload"; // Import shared type

@Resolver()
export class CreateUserResolver {
  @Mutation(() => AuthPayload)
  async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ) {
    const existingUser = await ctx.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await ctx.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: newUser.id, role: "USER" },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return { token };
  }
}
