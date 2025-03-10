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
    $casesHandled: Float!
    $description: String!
    $bio: String!
    $location: String!
    $expertise: String!
    $experience: Float!
    $fee: Float!
    $password: String!
    $email: String!
    $name: String!
    $image: String!
  ) {
    createLawyer(
      casesHandled: $casesHandled
      description: $description
      bio: $bio
      location: $location
      expertise: $expertise
      experience: $experience
      fee: $fee
      password: $password
      email: $email
      name: $name
      image: $image
    ) {
      token
    }
  }
`;

export const SIGNIN = gql`
  mutation signIn($password: String!, $email: String!) {
    signIn(password: $password, email: $email) {
      token
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation CREATE_SESSION(
    $description: String!
    $title: String!
    $lawyerId: String!
  ) {
    createSession(
      description: $description
      title: $title
      lawyerId: $lawyerId
    ) {
      title
      description
      id
    }
  }
`;
