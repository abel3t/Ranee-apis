import http from 'http';

import dotenv from 'dotenv';
import 'module-alias/register';

import logger from 'Core/Logger';
import { expressServer, apolloServer } from 'Servers';

import { connectMongoDB } from 'Database/connection';
import status from 'Controllers/status';

dotenv.config();

apolloServer.createApolloServer().then(server => {
  const app = expressServer.createExpressServer();
  connectMongoDB();

  app.get('/', status);

  apolloServer.applyApolloOnExpress(app, server);

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);
  httpServer.listen({ port: process.env.PORT || process.env.APP_PORT }, () => {
    if (process.env.NODE_ENV !== 'production') {
      logger.info(`Server is running at: http://localhost:${process.env.PORT}/graphql`);
    }
  });
});
