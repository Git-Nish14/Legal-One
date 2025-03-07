import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query getdata {
    getData {
      ... on User {
        id
        name
        email
        role
        createdAt
        updatedAt

        sessions {
          id
          title
          description
          status
          createdAt
          updatedAt
          lawyerCompleted
          userCompleted
          user {
            id
            name
          }
          lawyer {
            id
            name
          }
        }
      }

      ... on Lawyer {
        id
        name
        email
        role
        fee
        experience
        expertise
        casesHandled
        approvalStatus
        createdAt
        updatedAt
        location
        bio
        description
        sessions {
          id
          title
          description
          status
          createdAt
          updatedAt
          lawyerCompleted
          userCompleted
          user {
            id
            name
          }
          lawyer {
            id
            name
          }
        }
      }

      ... on Admin {
        id
        name
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`;
