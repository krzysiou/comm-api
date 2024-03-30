import type { Request, Response } from 'express';

import { findConversation } from '../../db/find-conversation';

const getConversation = async (req: Request, res: Response) => {
  const { senderId, recieverId } = req.body;

  const conversation = await findConversation(senderId, recieverId);

  if (conversation === null) {
    return res
      .status(404)
      .send({ username: { message: 'Something went wrong' } });
  }

  if (conversation === undefined) {
    return res.status(200).send([]);
  }

  return res.status(200).send(conversation.messages);
};

export { getConversation };
