import type { Request, Response } from 'express';

import { users } from '../../bindings';

const getUsers = async (req: Request, res: Response) => {
  res.status(200).send([...users]);
};

export { getUsers };
