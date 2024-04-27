import type { Request, Response } from 'express';

import { findUser } from '../../db/find-user';
import { conversations, users } from '../../bindings';

const deleteUser = async (req: Request, res: Response) => {
  const {
    user: { id },
  } = req.body;

  const user = await findUser({ id });

  if (!user) {
    return res
      .status(404)
      .send({ username: { message: 'Something went wrong' } });
  }

  try {
    if (id) {
      users.forEach((user, index) => {
        if (user.id === id) {
          users.splice(index, 1);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }

  try {
    if (id) {
      conversations.forEach((conversation, index) => {
        if (conversation.person1Id === id || conversation.person2Id === id) {
          conversations.splice(index, 1);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }

  return res.status(200).send();
};

export { deleteUser };
