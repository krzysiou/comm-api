import bodyParser from 'body-parser';

import type { Binding, User } from './types';

import { verifyJsonWebToken } from './utils/jwt';
import { getServerStatus } from './core/server-status/get-server-status';
import { getUsers } from './core/server-status/get-users';
import { registerUser } from './core/user/register-user';

// temporary implementation
const users: User[] = [];

const jsonParser = bodyParser.json();

const bindings: Binding[] = [
  {
    method: 'GET',
    path: '/status',
    callback: getServerStatus,
    middleware: jsonParser,
  },
  {
    method: 'GET',
    path: '/users',
    callback: getUsers,
    middleware: [jsonParser, verifyJsonWebToken],
  },
  {
    method: 'POST',
    path: '/register',
    callback: registerUser,
    middleware: jsonParser,
  },
];

export { bindings, users };
