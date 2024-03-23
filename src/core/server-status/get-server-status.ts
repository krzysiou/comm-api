import type { Request, Response } from 'express';

const getServerStatus = async (req: Request, res: Response) => {
  res.status(200).send({ msg: 'Alive' });
};

export { getServerStatus };
