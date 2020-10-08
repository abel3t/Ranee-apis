import { IResolvers } from 'graphql-tools';

import Auth from './Auth';
import User from './User';

export const resolvers: IResolvers = {
  Query: {
    ...Auth.Query,
    ...User.Query
  },
  Mutation: {
    ...Auth.Mutation
  },
  Subscription: {
    ...Auth.Subscription
  }
};