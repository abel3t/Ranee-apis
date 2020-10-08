import {
  refreshToken,
  register,
  signIn
} from 'Controllers/Auth';

export default {
  Query: {
    hello
  },
  Mutation: {
    hello,
    register,
    signIn,
    refreshToken
  },
  Subscription: {
    hello
  }
};

function hello() {
  return 'Hello World!';
}