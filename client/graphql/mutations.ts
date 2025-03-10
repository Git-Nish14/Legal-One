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

export const UPDATE_SESSION_STATUS = gql`
  mutation UPDATE_SESSION_STATUS($status: SessionStatus!, $sessionId: String!) {
    updateSessionStatus(status: $status, sessionId: $sessionId) {
      id
    }
  }
`;

export const UPDATE_LAWYER_STATUS = gql`
  mutation UPDATE_LAWYER_STATUS($status: ApprovalStatus!, $lawyerId: String!) {
    updateLawyerStatus(status: $status, lawyerId: $lawyerId) {
      id
    }
  }
`;

export const UPDATE_LAWYER_PROFILE = gql`
  mutation UPDATE_LAWYER_PROFILE(
    $fee: Float
    $experience: Float
    $expertise: String
    $location: String
    $bio: String
    $description: String
    $casesHandled: Float
  ) {
    updateLawyerProfile(
      fee: $fee
      experience: $experience
      expertise: $expertise
      location: $location
      bio: $bio
      description: $description
      casesHandled: $casesHandled
    ) {
      id
      name
      fee
      experience
      expertise
      location
      bio
      description
      casesHandled
      updatedAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: String!, $content: String!) {
    sendMessage(chatId: $chatId, content: $content) {
      id
      content
      senderUser {
        id
        name
      }
      senderLawyer {
        id
        name
      }
      sentAt
    }
  }
`;