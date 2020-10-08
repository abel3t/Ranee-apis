import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import crypto from 'crypto';

import logger from 'Core/Logger';
import { User } from 'Database/Models';
import { generateJwt } from 'Core/Jwt';
import { WRONG_EMAIL_PASSWORD } from 'Core/Constants';

interface ISignInInput {
  email: string,
  password: string
}

export async function signIn(_: any, { email, password }: ISignInInput) {
  const existedUser = await User.signInWithEmailAndPassword(email.toLowerCase());
  const { hash, salt } = existedUser;
  if (!isEqualPassword(password, hash, salt)) {
    throw new Error(WRONG_EMAIL_PASSWORD);
  }

  const customToken = await generateJwt({
    userId: `${existedUser._id}`,
    role: existedUser.role
  });

  const { idToken: token, refreshToken } = await exchangeToken(customToken);

  return {
    name: existedUser.name,
    email: existedUser.email,
    userName: existedUser.userName,
    role: existedUser.role,
    token,
    refreshToken: refreshToken
  };
}

function isEqualPassword(password: string, hash: string, salt: string) {
  return hash === crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
}

/**
 *
 * @param {string} token
 * @returns {Promise<{}>}
 */
async function exchangeToken(token: string) {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_WEB_KEY}`,
    data: {
      returnSecureToken: true,
      token
    }
  };

  return await axios(config)
    .then((response: AxiosResponse) => {
      return response?.data;
    })
    .catch((error: AxiosError) => {
      logger.error(new Error(JSON.stringify(error.response?.data)));
      throw error;
    });
}