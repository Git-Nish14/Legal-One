import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { SessionStatus } from "./enums/SessionStatus";
import { User } from "./User";
import { Lawyer } from "./Lawyer";
import { Chat } from "./Chat";

@ObjectType()
export class Session {
  @Field(() => ID)
  id!: string;

  @Field(() => User)
  user!: User;

  @Field(() => Lawyer)
  lawyer!: Lawyer;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => Chat, { nullable: true })
  chat?: Chat;

  @Field(() => SessionStatus)
  status!: SessionStatus;

  @Field(() => Boolean)
  userCompleted!: boolean;

  @Field(() => Boolean)
  lawyerCompleted!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
