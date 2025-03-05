import { registerEnumType } from "type-graphql";

export enum Role {
  USER = "USER",
  LAWYER = "LAWYER",
  ADMIN = "ADMIN",
}

registerEnumType(Role, {
  name: "Role",
  description: "User roles in the system",
});
