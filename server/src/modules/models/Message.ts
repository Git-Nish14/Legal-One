import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Chat } from "./Chat";
import { User } from "./User";
import { Lawyer } from "./Lawyer";

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: string;

  @Field(() => Chat)
  chat!: Chat;

  @Field(() => User, { nullable: true })
  senderUser?: User;

  @Field(() => Lawyer, { nullable: true })
  senderLawyer?: Lawyer;

  @Field()
  content!: string;

  @Field()
  sentAt!: Date;
}
