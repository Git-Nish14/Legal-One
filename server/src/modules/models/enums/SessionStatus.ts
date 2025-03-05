import { registerEnumType } from "type-graphql";

export enum SessionStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}

registerEnumType(SessionStatus, {
  name: "SessionStatus",
  description: "The status of a session",
});
