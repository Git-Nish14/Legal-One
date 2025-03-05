import express from "express";
import cors from "cors";
import { createApolloServer } from "./config/apollo";
import { ENV } from "./config/env";
import { errorMiddleware } from "./middleware/error.middleware";

const app: any = express();
app.use(cors());
app.use(express.json());

// Apply global error middleware
app.use(errorMiddleware);

const startServer = async () => {
  const apolloServer = await createApolloServer();
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${ENV.PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error("Server startup failed:", error);
});
