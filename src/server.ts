// Express

import { createServer } from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// GraphQL

import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import typeDefs from './resolvers/schema';
import resolvers from './resolvers';

// Constant

const url = process.env.DATABASE_LINK || 'YOUR_DATABASE_LINK';
const PORT = 8080;

// DataBase

import mongoose from 'mongoose';

//App

(async () => {
  const app = express();
  const httpServer = createServer(app);
  app.use(cors());
  app.use(express.static('public'));
  app.get('/', (req, res) => {
    res.send(
      "Welcome Graphql API, Please click link for Api <a href='/graphql'>GraphQL API</a> "
    );
  });
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('Connect is succesfull');
  } catch {
    console.log('Connect is failed');
  }
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    introspection: true,
  });
  await server.start();
  server.applyMiddleware({ app });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
