import { buildSchema } from "type-graphql";
import UsersResolver from "../modules/resolvers/user/users.query";
import { authChecker } from "./authChecker";

export const resolvers = [UsersResolver] as const;

export const createSchema = async () => {
  return buildSchema({
    resolvers,
    authChecker,
  });
};
