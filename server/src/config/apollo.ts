import { ApolloServer } from "apollo-server-express";
import { context } from "../graphql/context";

export const createApolloServer = async (schema: any) => {
  return new ApolloServer({
    schema,
    context,
    introspection: true,
  });
};
