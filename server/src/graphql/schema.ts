import { buildSchema } from "type-graphql";
import { authChecker } from "./authChecker";
import { GetUsersResolver } from "../modules/resolvers/user/getUsers.query";
import { CreateUserResolver } from "../modules/resolvers/user/createUser.mutation";
import { SignInUserResolver } from "../modules/resolvers/user/SignInUser.mutation";
import { GetUserResolver } from "../modules/resolvers/user/getUser.query";
import { GetLawyersResolver } from "../modules/resolvers/lawyer/getLawyers.query";
import { SignInLawyerResolver } from "../modules/resolvers/lawyer/SignInLawyer.mutation";
import { CreateLawyerResolver } from "../modules/resolvers/lawyer/createLawyer.mutation";
import { GetLawyerResolver } from "../modules/resolvers/lawyer/getLawyer.query";
import { GetDataResolver } from "../modules/resolvers/common/getData.query";
import { SignInResolver } from "../modules/resolvers/common/signIn.mutation";

export const resolvers = [
  GetUsersResolver,
  CreateUserResolver,
  SignInUserResolver,
  GetUserResolver,
  GetLawyersResolver,
  CreateLawyerResolver,
  SignInLawyerResolver,
  GetLawyerResolver,
  SignInResolver,
  GetDataResolver,
] as const;

export const createSchema = async () => {
  return buildSchema({
    resolvers,
    authChecker,
  });
};
