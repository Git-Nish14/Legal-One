import { ApolloClient, InMemoryCache, split, HttpLink, ApolloLink, concat } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// Function to get the token from localStorage or cookies
const getToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token") || ""; // Adjust if using cookies
    }
    return "";
};

// Middleware to attach authorization header
const authMiddleware = new ApolloLink((operation, forward) => {
    const token = getToken();
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    }));
    return forward(operation);
});

// HTTP link for queries & mutations
const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
});

// WebSocket link for subscriptions
const wsLink = typeof window !== "undefined"
    ? new GraphQLWsLink(createClient({
        url: "ws://localhost:4000/graphql",
        connectionParams: () => ({
            Authorization: `Bearer ${getToken()}`,
        }),
    }))
    : null;

// Split communication between WebSocket and HTTP
const splitLink =
    typeof window !== "undefined" && wsLink !== null
        ? split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === "OperationDefinition" &&
                    definition.operation === "subscription"
                );
            },
            wsLink,
            concat(authMiddleware, httpLink)
        )
        : concat(authMiddleware, httpLink);

// Create Apollo Client
export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});
