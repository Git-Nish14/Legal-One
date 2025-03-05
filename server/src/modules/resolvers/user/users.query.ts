import { Resolver, Query } from "type-graphql";
import { User } from "../../models/User";
import { Context } from "../../../graphql/context";
import { Ctx } from "type-graphql";

@Resolver()
export default class UsersResolver {
  @Query(() => [User])
  async users(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }
}
