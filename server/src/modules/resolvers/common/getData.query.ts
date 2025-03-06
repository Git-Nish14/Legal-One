import { Resolver, Query, Ctx, createUnionType } from "type-graphql";
import { User } from "../../models/User";
import { Lawyer } from "../../models/Lawyer";
import { Admin } from "../../models/Admin";
import { Context } from "../../../graphql/context";

const UserLawyerAdminUnion = createUnionType({
  name: "UserLawyerAdminUnion",
  types: () => [User, Lawyer, Admin] as const,
  resolveType: (value) => {
    if ("sessions" in value && "fee" in value) return Lawyer;
    if ("sessions" in value) return User;
    return Admin;
  },
});

@Resolver()
export class GetDataResolver {
  @Query(() => UserLawyerAdminUnion, { nullable: true })
  async getData(@Ctx() ctx: Context): Promise<User | Lawyer | Admin | null> {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    const { id, role } = ctx.user;

    if (role === "USER") {
      return (await ctx.prisma.user.findUnique({
        where: { id },
        include: { sessions: true, chats: true, messages: true },
      })) as any as User;
    }

    if (role === "LAWYER") {
      return (await ctx.prisma.lawyer.findUnique({
        where: { id },
        include: {
          sessions: true,
          chats: true,
          messages: true,
        },
      })) as any as Lawyer;
    }

    if (role === "ADMIN") {
      return (await ctx.prisma.admin.findUnique({
        where: { id },
      })) as any as Admin;
    }

    return null;
  }
}
