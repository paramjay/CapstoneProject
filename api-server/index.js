import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import resolvers from "./graphql/resolvers/resolvers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "graphql/schemas/schema.graphql"),
  "utf-8",
);

const server = new ApolloServer({ typeDefs: gql(typeDefs), resolvers,  cors: true // Enable CORS
});

server.start().then(function () {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});

const port = process.env.PORT || 3002;
// Start listening
app.listen(port, () => {
  console.log(`Api-Server is ready to use at http://localhost:${port} `);
});
