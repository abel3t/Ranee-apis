import path from 'path';

import { Express } from 'express';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { ApolloServer, AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';

import { resolvers } from 'Resolvers';
import { verifyAccessToken } from 'Core/Jwt';
import { ROLES } from 'Core/Constants/common';
import { INVALID_TOKEN, YOU_NEED_LOGGED_IN } from 'Core/Constants';
import logger from 'Core/Logger';

export default {
  createApolloServer: async () => {
    return new ApolloServer({
      typeDefs: await createTypeDef(),
      resolvers,
      schemaDirectives: {
        LoggedIn: LoggedInDirective,
        auth: AuthDirective
      },
      context: async ({ req }) => {
        const token: string = req.headers.authorization || '';
        if (token) {
          const user: any = await verifyAccessToken(token)
            .then(userToken => userToken)
            .catch(error => {
              logger.error(error);
              return null;
            });
          if (user) {
            return {
              userToken: {
                role: user.role,
                userId: user.userId
              }
            };
          }
          throw new AuthenticationError(INVALID_TOKEN);
        }
      }
    });
  },
  applyApolloOnExpress: (app: Express, server: ApolloServer) => {
    server.applyMiddleware({ app });
  },
};

async function createTypeDef() {
  const getTypeDefs = async () => {
    return loadFiles(path.join(__dirname, '../Schemas/*.graphql'));
  };

  return mergeTypeDefs(await getTypeDefs());
}

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { requiredRole = ROLES.GUESTS } = this.args;

    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async (...args) => {
      const { userToken = {} } = args[2];
      const isAuthorized = requiredRole && userToken.role === requiredRole;

      if (!isAuthorized) {
        throw new AuthenticationError(`You need following role: ${requiredRole}`);
      }

      return originalResolve.apply(this, args);
    };
  }
}

class LoggedInDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async (...args) => {
      const { userToken = {} } = args[2];
      const isLoggedIn = !!userToken.role;

      if (!isLoggedIn) {
        throw new AuthenticationError(YOU_NEED_LOGGED_IN);
      }

      return originalResolve.apply(this, args);
    };
  }
}