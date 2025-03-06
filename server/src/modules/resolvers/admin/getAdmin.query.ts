import { Resolver, Query, Ctx } from "type-graphql";
import { Admin } from "../../models/Admin";
import { Context } from "../../../graphql/context";

@Resolver()
export class GetAdminResolver {
  @Query(() => Admin, { nullable: true })
  async getAdmin(@Ctx() ctx: Context): Promise<Admin | null> {
    // Check if user is authenticated
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    // Check if the authenticated user is an admin
    if (ctx.user.role !== "ADMIN") {
      throw new Error("Unauthorized access");
    }

    // Fetch admin from the database
    const admin = await ctx.prisma.admin.findUnique({
      where: { id: ctx.user.id },
    });

    if (!admin) {
      return null; // Return null if admin is not found
    }

    return admin as any as Admin; // Return admin data
  }
}
