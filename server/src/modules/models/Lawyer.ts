import "reflect-metadata";
import { ObjectType, Field, ID, Float, Int } from "type-graphql";
import { Role } from "./enums/Role";
import { ApprovalStatus } from "./enums/ApprovalStatus";
import { Session } from "./Session";
import { Chat } from "./Chat";
import { Message } from "./Message";

@ObjectType()
export class Lawyer {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  password!: string; // Not exposed in GraphQL

  @Field(() => Role)
  role!: Role;

  @Field(() => ApprovalStatus)
  approvalStatus!: ApprovalStatus;

  @Field(() => Float)
  fee!: number;

  @Field(() => Int, { nullable: true })
  experience?: number;

  @Field({ nullable: true })
  expertise?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  casesHandled!: number;

  @Field(() => [Session])
  sessions!: Session[];

  @Field(() => [Chat])
  chats!: Chat[];

  @Field(() => [Message])
  messages!: Message[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
