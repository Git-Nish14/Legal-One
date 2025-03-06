import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { authChecker } from "./authChecker";
import path from "path";
import { glob } from "glob"; // Import glob to find resolver files

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
  });
};

// import { buildSchema } from "type-graphql";
// import { authChecker } from "./authChecker";
// import { GetUsersResolver } from "../modules/resolvers/user/getUsers.query";
// import { CreateUserResolver } from "../modules/resolvers/user/createUser.mutation";
// import { SignInUserResolver } from "../modules/resolvers/user/SignInUser.mutation";
// import { GetUserResolver } from "../modules/resolvers/user/getUser.query";
// import { GetLawyersResolver } from "../modules/resolvers/lawyer/getLawyers.query";
// import { SignInLawyerResolver } from "../modules/resolvers/lawyer/SignInLawyer.mutation";
// import { CreateLawyerResolver } from "../modules/resolvers/lawyer/createLawyer.mutation";
// import { GetLawyerResolver } from "../modules/resolvers/lawyer/getLawyer.query";
// import { GetDataResolver } from "../modules/resolvers/common/getData.query";
// import { SignInResolver } from "../modules/resolvers/common/signIn.mutation";
// import { GetAdminResolver } from "../modules/resolvers/admin/getAdmin.query";
// import { CreateAdminResolver } from "../modules/resolvers/admin/createAdmin.mutation";
// import { CreateSessionResolver } from "../modules/resolvers/session/createSession.mutation";
// import { GetSessionsResolver } from "../modules/resolvers/session/getSessions.query";
// import { UpdateSessionStatusResolver } from "../modules/resolvers/session/updateSessionStatus.mutation";
// import { UpdateLawyerCompletedResolver } from "../modules/resolvers/session/updateLawyerCompleted.mutation";
// import { UpdateUserCompletedResolver } from "../modules/resolvers/session/updateUserCompleted.mutation";
// import { UpdateLawyerStatusResolver } from "../modules/resolvers/admin/updateLawyerStatus.mutation";
// import { GetAcceptedLawyersResolver } from "../modules/resolvers/lawyer/getAcceptedLawyers.query";
// import { UpdateLawyerProfileResolver } from "../modules/resolvers/lawyer/upadateLawyerProfile.mutation";

// export const resolvers = [
//   GetUsersResolver,
//   CreateUserResolver,
//   SignInUserResolver,
//   GetUserResolver,
//   GetLawyersResolver,
//   CreateLawyerResolver,
//   SignInLawyerResolver,
//   GetLawyerResolver,
//   SignInResolver,
//   GetDataResolver,
//   GetAdminResolver,
//   CreateAdminResolver,
//   CreateSessionResolver,
//   GetSessionsResolver,
//   UpdateSessionStatusResolver,
//   UpdateUserCompletedResolver,
//   UpdateLawyerCompletedResolver,
//   UpdateLawyerStatusResolver,
//   GetAcceptedLawyersResolver,
//   UpdateLawyerProfileResolver,
// ] as const;

// export const createSchema = async () => {
//   return buildSchema({
//     resolvers,
//     authChecker,
//   });
// };
