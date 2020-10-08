import jwt from 'jsonwebtoken';

import firebase from './Firebase';
import { unixTime } from './DateTime';

interface IUserToken {
  userId: string,
  role: string
}

export function generateJwt({ userId, role }: IUserToken) {
  return jwt.sign(
    {
      uid: userId,
      iss: process.env.FIREBASE_CLIENT_EMAIL,
      sub: process.env.FIREBASE_CLIENT_EMAIL,
      aud: process.env.FIREBASE_AUD,
      iat: unixTime(),
      exp: unixTime() + 5 * 60,
      claims: {
        userId,
        role
      }
    },
    (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    {
      algorithm: 'RS256'
    }
  );
}

export function verifyAccessToken(token: string) {
  return new Promise((resolve, reject) => {
    firebase().auth().verifyIdToken(token)
      .then(payload => {
        resolve(payload);
      })
      .catch(error => reject(error));
  });
}