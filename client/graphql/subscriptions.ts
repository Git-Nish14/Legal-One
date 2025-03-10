import { gql } from "@apollo/client";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessage($chatId: String!) {
    newMessage(chatId: $chatId) {
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