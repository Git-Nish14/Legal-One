import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Context } from "../../../graphql/context";
import { AuthPayload } from "../../models/types/AuthPayload";
import { Admin } from "../../models/Admin";

@Resolver()
export class CreateAdminResolver {
  @Mutation(() => AuthPayload)
  async createAdmin(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<AuthPayload> {
    // Check if an admin with the given email already exists
    const existingAdmin = await ctx.prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new admin in the database
    const newAdmin = await ctx.prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN", // Ensure the role is set as ADMIN
      },
    });

    // Generate a JWT token for authentication
    const token = jwt.sign(
      { id: newAdmin.id, role: newAdmin.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return { token };
  }
}
