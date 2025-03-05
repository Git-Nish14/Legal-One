import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Role } from "./enums/Role";
import { Session } from "./Session";
import { Chat } from "./Chat";
import { Message } from "./Message";

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  password!: string; // Not exposed in GraphQL

  @Field(() => Role)
  role!: Role;

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
