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

export const GET_ACCEPTED_LAWYERS = gql`
  query GET_ACCEPTED_LAWYERS {
    getAcceptedLawyers {
      id
      name
      image
      bio
      expertise
      location
      description
      experience
      fee
      casesHandled
      createdAt
    }
  }
`;

export const GET_LAWYER_BY_ID = gql`
  query GET_LAWYER_BY_ID($lawyerId: String!) {
    getLawyerById(lawyerId: $lawyerId) {
      id
      name
      image
      bio
      expertise
      location
      description
      experience
      fee
      casesHandled
      createdAt
    }
  }
`;

export const GET_ACTIVE_SESSIONS = gql`
  query GET_ACTIVE_SESSIONS {
    getActiveSessions {
      createdAt
      description
      id
      lawyerCompleted
      status
      title
      updatedAt
      userCompleted
      lawyer {
        name
        image
        expertise
      }
    }
  }
`;

export const GET_COMPLETED_SESSIONS = gql`
  query GET_COMPLETED_SESSIONS {
    getCompletedSessions {
      createdAt
      description
      id
      lawyerCompleted
      status
      title
      updatedAt
      userCompleted
      lawyer {
        name
        image
        expertise
      }
    }
  }
`;

export const GET_REJECTED_SESSIONS = gql`
  query GET_REJECTED_SESSIONS {
    getRejectedSessions {
      createdAt
      description
      id
      lawyerCompleted
      status
      title
      updatedAt
      userCompleted
      lawyer {
        name
        image
        expertise
      }
    }
  }
`;

export const GET_PENDING_SESSIONS = gql`
  query GET_PENDING_SESSIONS {
    getPendingSessions {
      createdAt
      description
      id
      lawyerCompleted
      status
      title
      updatedAt
      userCompleted
      lawyer {
        name
        image
        expertise
      }
    }
  }
`;
