import User from 'Database/Models/User';

export async function me(_r: any, _a: any, context: any) {
  const { userId } = context.userToken;
  const existedUser = await User.getUserById(userId);
  return {
    _id: existedUser._id,
    name: existedUser.name,
    email: existedUser.email,
    userName: existedUser.userName,
    role: existedUser.role,
  };
}