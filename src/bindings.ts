import bodyParser from 'body-parser';

import type { Binding } from './types';

import { getServerStatus } from './core/server-status/get-server-status';

const jsonParser = bodyParser.json();

const bindings: Binding[] = [
  {
    method: 'GET',
    path: '/status',
    callback: getServerStatus,
    middleware: [jsonParser],
  },
];

export { bindings };
