import bodyParser from 'body-parser';

import type { Binding, User } from './types';

import { verifyJsonWebToken } from './utils/jwt';
import { getServerStatus } from './core/server-status/get-server-status';
import { getUsers } from './core/server-status/get-users';
import { registerUser } from './core/user/register-user';
import { loginUser } from './core/user/login-user';
import { editUser } from './core/user/edit-user';
import { getCurrentUser } from './core/user/get-current-user';

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
  {
    method: 'POST',
    path: '/login',
    callback: loginUser,
    middleware: jsonParser,
  },
  {
    method: 'GET',
    path: '/user/current',
    callback: getCurrentUser,
    middleware: [jsonParser, verifyJsonWebToken],
  },
  {
    method: 'POST',
    path: '/edit',
    callback: editUser,
    middleware: [jsonParser, verifyJsonWebToken],
  },
];

export { bindings, users };
