import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { authChecker } from "./authChecker";
import path from "path";
import { glob } from "glob"; // Import glob to find resolver files
import { pubSub } from "./pubsub";

// Function to dynamically import all resolvers
const loadResolvers = async (): Promise<any[]> => {
  // Construct the resolver path pattern
  const resolverPaths = await glob(`dist/modules/resolvers/**/*.js`);
  const resolvers = await Promise.all(
    resolverPaths.map(async (resolverPath: any) => {
      const module = await import(path.resolve(resolverPath));
      return Object.values(module); // Return all exported resolvers
    })
  );
  return resolvers.flat(); // Flatten the array
};

export const createSchema = async () => {
  const resolvers = await loadResolvers();
  if (!resolvers.length) {
    throw new Error("No resolvers found");
  }
  return buildSchema({
    resolvers: resolvers as [Function, ...Function[]],
    authChecker,
    pubSub,
  });
};
