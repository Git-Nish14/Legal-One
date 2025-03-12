import "reflect-metadata";
import express from "express";
import cors from "cors";
import http from "http";
import { createApolloServer } from "./config/apollo";
import { ENV } from "./config/env";
import { errorMiddleware } from "./middleware/error.middleware";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { createSchema } from "./graphql/schema";
import { context } from "./graphql/context";

const startServer = async () => {
  const app: any = express();
  app.use(
    cors({
      origin: [ENV.FRONTEND_URL, "https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );

  app.use(express.json());

  // Apply global error middleware
  app.use(errorMiddleware);

  const httpServer = http.createServer(app);

  const schema = await createSchema();
  const apolloServer = await createApolloServer(schema);

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // WebSocket Server for GraphQL subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: apolloServer.graphqlPath,
  });

  useServer({ schema, context }, wsServer);

  httpServer.listen(ENV.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${ENV.PORT}/graphql`);
    console.log(`📡 Subscriptions ready at ws://localhost:${ENV.PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error("Server startup failed:", error);
});
