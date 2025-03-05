import { registerEnumType } from "type-graphql";

export enum ApprovalStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  BLOCKED = "BLOCKED",
}

registerEnumType(ApprovalStatus, {
  name: "ApprovalStatus",
  description: "Approval status of a lawyer",
});
