import type { Request, Response } from 'express';

import { findUser } from '../../db/find-user';

const getCurrentUser = async (req: Request, res: Response) => {
  const {
    user: { id },
  } = req.body;

  const user = await findUser({ id });

  if (!user) {
    return res
      .status(404)
      .send({ username: { message: 'Something went wrong' } });
  }

  return res.status(200).send({ ...user });
};

export { getCurrentUser };
