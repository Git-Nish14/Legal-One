import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Role } from "./enums/Role";

@ObjectType()
export class Admin {
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

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
