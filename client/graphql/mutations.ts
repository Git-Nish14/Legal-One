import { gql } from "@apollo/client";

export const USER_SIGNUP = gql`
  mutation USER_SIGNUP($password: String!, $email: String!, $name: String!) {
    createUser(password: $password, email: $email, name: $name) {
      token
    }
  }
`;

export const LAWYER_SIGNUP = gql`
  mutation LAWYER_SIGNUP(
    $description: String!
    $bio: String!
    $location: String!
    $expertise: String!
    $experience: Float!
    $fee: Float!
    $password: String!
    $email: String!
    $name: String!
  ) {
    createLawyer(
      description: $description
      bio: $bio
      location: $location
      expertise: $expertise
      experience: $experience
      fee: $fee
      password: $password
      email: $email
      name: $name
    ) {
      token
    }
  }
`;
