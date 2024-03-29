import type { Request, Response } from 'express';

import { findUser } from '../../db/find-user';

const editUser = async (req: Request, res: Response) => {
  const {
    name,
    surname,
    bio,
    work,
    hobby,
    user: { id },
  } = req.body;

  if (!name || !surname || !bio || !work || !hobby) {
    return res
      .status(400)
      .send({ username: { message: 'Provide all information' } });
  }

  const user = await findUser({ id });

  if (!user) {
    return res
      .status(404)
      .send({ username: { message: 'Something went wrong' } });
  }

  user.info = { name, surname, bio, work, hobby };

  return res.status(200).send();
};

export { editUser };
