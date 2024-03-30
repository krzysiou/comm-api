import type { NextFunction, Request, Response } from 'express';

type RequestMethod = 'GET' | 'POST';

type expressCallback = (req: Request, res: Response) => void;

type expressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

interface Binding {
  method: RequestMethod;
  path: string;
  callback: expressCallback;
  middleware?: expressMiddleware | expressMiddleware[];
}

type UserInfo = {
  name: string;
  surname: string;
  bio: string;
  work: string;
  hobby: string;
};

interface User {
  id: string;
  username: string;
  password: string;
  info?: UserInfo;
}

interface MessagePayload {
  senderId: string;
  recieverId: string;
  message: string;
}

interface Conversation {
  person1Id: string;
  person2Id: string;
  messages: MessagePayload[];
}

export type {
  RequestMethod,
  expressCallback,
  expressMiddleware,
  Binding,
  User,
  Conversation,
  MessagePayload,
};
