import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { authChecker } from "./authChecker";
import path from "path";
import { glob } from "glob"; // Import glob to find resolver files
import { pubSub } from "./pubsub";

// Function to dynamically import all resolvers
const loadResolvers = async (): Promise<any[]> => {
  const resolverPaths = await glob("src/modules/resolvers/**/*.ts"); // Adjust path as needed
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
