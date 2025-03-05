import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Session } from "./Session";
import { User } from "./User";
import { Lawyer } from "./Lawyer";
import { Message } from "./Message";

@ObjectType()
export class Chat {
  @Field(() => ID)
  id!: string;

  @Field(() => Session)
  session!: Session;

  @Field(() => User)
  user!: User;

  @Field(() => Lawyer)
  lawyer!: Lawyer;

  @Field(() => [Message], { nullable: true })
  messages!: Message[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
