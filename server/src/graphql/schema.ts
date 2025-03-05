import { buildSchema } from "type-graphql";
import UsersResolver from "../modules/resolvers/user/users.query";
import { authChecker } from "./authChecker";
import { CreateUserResolver } from "../modules/resolvers/user/createUser.mutation";
import { SignInResolver } from "../modules/resolvers/user/SignIn.mutation";
import { GetUserResolver } from "../modules/resolvers/user/GetUser.query";

export const resolvers = [
  UsersResolver,
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
