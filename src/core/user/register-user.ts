import { genSaltSync, hashSync } from 'bcrypt-nodejs';
import { v4 as uuid } from 'uuid';

import type { Request, Response } from 'express';
import type { User } from '../../types';

import { generateJsonWebToken } from '../../utils/jwt';
import { findUser } from '../../db/find-user';
import { saveUser } from '../../db/save-user';

const hashPassword = async (password: string): Promise<string> => {
  const salt = genSaltSync(10);
  const hashedPassword = await hashSync(password, salt);

  return hashedPassword;
};

const registerUser = async (req: Request, res: Response) => {
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

  if (user) {
    return res
      .status(400)
      .send({ username: { message: 'Username already taken' } });
  }

  const hashedPassword = await hashPassword(password);
  const id = uuid();

  const userData: User = {
    id,
    username,
    password: hashedPassword,
  };

  await saveUser(userData);

  const accessToken = generateJsonWebToken(userData);

  return res.status(200).send({ token: accessToken });
};

export { registerUser };
