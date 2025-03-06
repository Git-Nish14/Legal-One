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

  @Field()
  password!: string;

  @Field(() => Role)
  role!: Role;

  @Field(() => ApprovalStatus)
  approvalStatus!: ApprovalStatus;

  @Field(() => Float)
  fee!: number;

  @Field(() => Int)
  experience!: number;

  @Field()
  expertise!: string;

  @Field()
  location!: string;

  @Field()
  bio!: string;

  @Field()
  description!: string;

  @Field(() => Int)
  casesHandled!: number;

  @Field(() => [Session], { nullable: true })
  sessions!: Session[];

  @Field(() => [Chat], { nullable: true })
  chats!: Chat[];

  @Field(() => [Message], { nullable: true })
  messages!: Message[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
