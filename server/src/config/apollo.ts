import { ApolloServer } from "apollo-server-express";
import { context } from "../graphql/context";
import { createSchema } from "../graphql/schema";

export const createApolloServer = async () => {
  const schema = await createSchema();

  return new ApolloServer({
    schema,
    context,
    introspection: true,
  });
};
