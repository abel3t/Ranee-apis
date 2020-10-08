import crypto from 'crypto';

import { IUser, IUserSignUp } from 'Database/Interfaces';
import { User } from 'Database/Models';
import { ROLES } from 'Core/Constants/common';

interface IRegisterInput {
  name: string,
  userName: string
  email: string
  password: string
  role: string
}

export async function register(_: any, { name, userName, email, password, role = ROLES.GUESTS }: IRegisterInput): Promise<IUser | null> {

  const salt: string = crypto.randomBytes(16).toString('hex');
  const hash: string = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  const user: IUserSignUp = {
    name,
    userName,
    email: email.toLowerCase(),
    role,
    hash,
    salt
  };

  return await User.createUser(user);
}