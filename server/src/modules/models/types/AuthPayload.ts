import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AuthPayload {
  @Field()
  token!: string;
}
