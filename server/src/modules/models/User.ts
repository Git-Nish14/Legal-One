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

  @Field()
  password!: string;

  @Field(() => Role)
  role!: Role;

  @Field(() => [Session], { nullable: true })
  sessions?: Session[];

  @Field(() => [Chat], { nullable: true })
  chats?: Chat[];

  @Field(() => [Message], { nullable: true })
  messages?: Message[];

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
