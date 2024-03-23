import { sign, verify } from 'jsonwebtoken';

import type { NextFunction, Request, Response } from 'express';
import type { User } from '../types';

const generateJsonWebToken = (user: User) => {
  const tokenSecret = process.env.TOKEN_SECRET as string;

  return sign(user, tokenSecret);
};

const verifyJsonWebToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenSecret = process.env.TOKEN_SECRET as string;

    const token = req.headers.authorization?.split(' ')[1] as string;
    const user = verify(token, tokenSecret) as User;

    req.body.user = user;

    next();
  } catch {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

export { generateJsonWebToken, verifyJsonWebToken };
