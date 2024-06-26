import { compareSync } from 'bcrypt-nodejs';

import type { Request, Response } from 'express';

import { generateJsonWebToken } from '../../utils/jwt';
import { findUser } from '../../db/find-user';

const validatePassword = async (
  password: string,
  validPassword: string
): Promise<boolean> => {
  const passwordMatching = await compareSync(password, validPassword);

  return passwordMatching;
};

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .send({ username: { message: 'Username must be provided' } });
  }

  if (!password) {
    return res
      .status(400)
      .send({ password: { message: 'Password must be provided' } });
  }

  const user = await findUser({ username });

  if (!user) {
    return res.status(404).send({ username: { message: 'User not found' } });
  }

  const passwordMatching = await validatePassword(password, user.password);

  if (!passwordMatching) {
    return res.status(401).send({ password: { message: 'Invalid password' } });
  }

  const accessToken = generateJsonWebToken(user);

  return res.status(200).send({ token: accessToken });
};

export { loginUser };
