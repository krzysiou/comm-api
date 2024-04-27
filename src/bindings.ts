import bodyParser from 'body-parser';

import type { Binding, User, Conversation } from './types';

import { verifyJsonWebToken } from './utils/jwt';
import { getServerStatus } from './core/server-status/get-server-status';
import { getUsers } from './core/user/get-users';
import { registerUser } from './core/user/register-user';
import { loginUser } from './core/user/login-user';
import { editUser } from './core/user/edit-user';
import { getCurrentUser } from './core/user/get-current-user';
import { getUser } from './core/user/get-user';
import { getConversation } from './core/messages/get-conversation';
import { deleteUser } from './core/user/delete-user';

// temporary implementation
const users: User[] = [];
const conversations: Conversation[] = [];

const jsonParser = bodyParser.json();

const bindings: Binding[] = [
  {
    method: 'GET',
    path: '/status',
    callback: getServerStatus,
    middleware: jsonParser,
  },
  {
    method: 'POST',
    path: '/register',
    callback: registerUser,
    middleware: jsonParser,
  },
  {
    method: 'POST',
    path: '/login',
    callback: loginUser,
    middleware: jsonParser,
  },
  {
    method: 'GET',
    path: '/users',
    callback: getUsers,
    middleware: [jsonParser, verifyJsonWebToken],
  },
  {
    method: 'GET',
    path: '/user/current',
    callback: getCurrentUser,
    middleware: [jsonParser, verifyJsonWebToken],
  },
  {
    method: 'POST',
    path: '/user/other',
    callback: getUser,
    middleware: [jsonParser, verifyJsonWebToken],
  },
  {
    method: 'POST',
    path: '/edit',
    callback: editUser,
    middleware: [jsonParser, verifyJsonWebToken],
  },
  {
    method: 'POST',
    path: '/conversation',
    callback: getConversation,
    middleware: [jsonParser, verifyJsonWebToken],
  },
  {
    method: 'POST',
    path: '/delete',
    callback: deleteUser,
    middleware: [jsonParser, verifyJsonWebToken],
  },
];

export { bindings, users, conversations };
