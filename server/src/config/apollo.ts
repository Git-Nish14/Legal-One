import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { resolvers } from "../graphql/schema";
import { context } from "../graphql/context";

export const createApolloServer = async () => {
  const schema = await buildSchema({
    resolvers,
    authChecker: require("../graphql/authChecker").authChecker,
  });

  return new ApolloServer({
    schema,
    context,
    introspection: true,
  });
};
