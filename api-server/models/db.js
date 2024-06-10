import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

console.log(MONGO_CONNECTION_STRING);
mongoose.connect(MONGO_CONNECTION_STRING);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected Successfully!");
});


// import { ApolloServer } from 'apollo-server';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// import typeDefs from './schema.graphql'; // Assuming your schema is in a file named schema.graphql
// import resolvers from './resolvers'; // Assuming your resolvers are in a file named resolvers.js

// dotenv.config();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB Connected Successfully!');
//     return server.listen({ port: process.env.PORT || 4000 });
//   })
//   .then(({ url }) => {
//     console.log(`Server running at ${url}`);
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });
