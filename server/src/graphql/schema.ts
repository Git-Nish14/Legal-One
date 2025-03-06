import { buildSchema } from "type-graphql";
import GetUsersResolver from "../modules/resolvers/user/getUsers.query";
import { authChecker } from "./authChecker";
import { CreateUserResolver } from "../modules/resolvers/user/createUser.mutation";
import { SignInResolver } from "../modules/resolvers/user/SignIn.mutation";
import { GetUserResolver } from "../modules/resolvers/user/GetUser.query";

export const resolvers = [
  GetUsersResolver,
  CreateUserResolver,
  SignInResolver,
  GetUserResolver,
] as const;

export const createSchema = async () => {
  return buildSchema({
    resolvers,
    authChecker,
  });
};
